const Property = require('../models/Property');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Property.countDocuments({ ...keyword });
  const properties = await Property.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ properties, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get properties within 2km of Atharva College
// @route   GET /api/properties/nearby
// @access  Public
const getNearbyProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({ distanceFromCollege: { $lte: 2 } })
    .sort({ distanceFromCollege: 1 });

  res.json(properties);
});

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    res.json(property);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc    Create a property (public submission)
// @route   POST /api/properties/public
// @access  Public
const createPropertyPublic = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    description,
    address,
    distanceFromCollege,
    roomSize,
    rent,
    deposit,
    sharingType,
    amenities,
    totalSeats,
    images,
    photos, // Handle photos array from frontend
    image,  // Handle single image from frontend
    phone,
    googleMapLink,
    ownerName,
  } = req.body;

  // Create a default owner for public submissions
  const defaultOwner = await User.findOne({ email: 'public@roomeze.com' });
  
  // Use photos array if available, otherwise use images array, otherwise use single image
  let propertyImages = [];
  if (photos && Array.isArray(photos) && photos.length > 0) {
    propertyImages = photos;
  } else if (images && Array.isArray(images) && images.length > 0) {
    propertyImages = images;
  } else if (image) {
    propertyImages = [image];
  }

  const property = new Property({
    name,
    type,
    description,
    address,
    distanceFromCollege,
    roomSize,
    rent,
    deposit,
    sharingType,
    amenities,
    totalSeats,
    images: propertyImages,
    phone,
    googleMapLink,
    ownerName,
    owner: defaultOwner ? defaultOwner._id : null,
  });

  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
});

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Owner
const createProperty = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    description,
    address,
    distanceFromCollege,
    roomSize,
    rent,
    deposit,
    sharingType,
    amenities,
    totalSeats,
    images,
    photos, // Handle photos array from frontend
    image,  // Handle single image from frontend
  } = req.body;

  // Use photos array if available, otherwise use images array, otherwise use single image
  let propertyImages = [];
  if (photos && Array.isArray(photos) && photos.length > 0) {
    propertyImages = photos;
  } else if (images && Array.isArray(images) && images.length > 0) {
    propertyImages = images;
  } else if (image) {
    propertyImages = [image];
  }

  const property = new Property({
    name,
    type,
    description,
    address,
    distanceFromCollege,
    roomSize,
    rent,
    deposit,
    sharingType,
    amenities,
    totalSeats,
    images: propertyImages,
    owner: req.user._id,
  });

  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
});

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Owner
const updateProperty = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    description,
    address,
    distanceFromCollege,
    roomSize,
    rent,
    deposit,
    sharingType,
    amenities,
    totalSeats,
    images,
    photos, // Handle photos array from frontend
    image,  // Handle single image from frontend
    availability,
  } = req.body;

  const property = await Property.findById(req.params.id);

  if (property) {
    // Check if user is owner
    if (property.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    // Use photos array if available, otherwise use images array, otherwise use single image
    let propertyImages = property.images;
    if (photos && Array.isArray(photos) && photos.length > 0) {
      propertyImages = photos;
    } else if (images && Array.isArray(images) && images.length > 0) {
      propertyImages = images;
    } else if (image) {
      propertyImages = [image];
    }

    property.name = name || property.name;
    property.type = type || property.type;
    property.description = description || property.description;
    property.address = address || property.address;
    property.distanceFromCollege = distanceFromCollege || property.distanceFromCollege;
    property.roomSize = roomSize || property.roomSize;
    property.rent = rent || property.rent;
    property.deposit = deposit || property.deposit;
    property.sharingType = sharingType || property.sharingType;
    property.amenities = amenities || property.amenities;
    property.totalSeats = totalSeats || property.totalSeats;
    property.images = propertyImages;
    property.availability = availability || property.availability;

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Owner
const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    // Check if user is owner
    if (property.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await property.remove();
    res.json({ message: 'Property removed' });
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

module.exports = {
  getProperties,
  getNearbyProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  createPropertyPublic,
};