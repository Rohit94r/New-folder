const Laundry = require('../models/Laundry');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all laundry services
// @route   GET /api/laundry
// @access  Public
const getLaundryServices = asyncHandler(async (req, res) => {
  const laundryServices = await Laundry.find({});
  res.json(laundryServices);
});

// @desc    Get laundry service by ID
// @route   GET /api/laundry/:id
// @access  Public
const getLaundryServiceById = asyncHandler(async (req, res) => {
  const laundry = await Laundry.findById(req.params.id);

  if (laundry) {
    res.json(laundry);
  } else {
    res.status(404);
    throw new Error('Laundry service not found');
  }
});

// @desc    Create a laundry service (public submission)
// @route   POST /api/laundry/public
// @access  Public
const createLaundryServicePublic = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    deliveryAvailable,
    deliveryCharges,
    image,
    photos, // Handle photos array from frontend
    distance,
    googleMapLink,
    ownerName,
  } = req.body;

  // Use photos array if available, otherwise use single image
  let laundryImage = image;
  if (photos && Array.isArray(photos) && photos.length > 0) {
    laundryImage = photos[0]; // Use first photo as main image
  }

  // Create a default owner for public submissions
  const defaultOwner = await User.findOne({ email: 'public@roomeze.com' });
  
  const laundry = new Laundry({
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    deliveryAvailable,
    deliveryCharges,
    image: laundryImage,
    distance,
    googleMapLink,
    ownerName,
    owner: defaultOwner ? defaultOwner._id : null,
  });

  const createdLaundry = await laundry.save();
  res.status(201).json(createdLaundry);
});

// @desc    Create a laundry service
// @route   POST /api/laundry
// @access  Private/Owner
const createLaundryService = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    deliveryAvailable,
    deliveryCharges,
    image,
    photos, // Handle photos array from frontend
  } = req.body;

  // Use photos array if available, otherwise use single image
  let laundryImage = image;
  if (photos && Array.isArray(photos) && photos.length > 0) {
    laundryImage = photos[0]; // Use first photo as main image
  }

  const laundry = new Laundry({
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    deliveryAvailable,
    deliveryCharges,
    image: laundryImage,
    owner: req.user._id,
  });

  const createdLaundry = await laundry.save();
  res.status(201).json(createdLaundry);
});

// @desc    Update a laundry service
// @route   PUT /api/laundry/:id
// @access  Private/Owner
const updateLaundryService = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    deliveryAvailable,
    deliveryCharges,
    image,
    photos, // Handle photos array from frontend
    rating,
  } = req.body;

  const laundry = await Laundry.findById(req.params.id);

  if (laundry) {
    // Check if user is owner
    if (laundry.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    // Use photos array if available, otherwise use single image
    let laundryImage = image || laundry.image;
    if (photos && Array.isArray(photos) && photos.length > 0) {
      laundryImage = photos[0]; // Use first photo as main image
    }

    laundry.name = name || laundry.name;
    laundry.description = description || laundry.description;
    laundry.address = address || laundry.address;
    laundry.phone = phone || laundry.phone;
    laundry.timings = timings || laundry.timings;
    laundry.pricing = pricing || laundry.pricing;
    laundry.deliveryAvailable = deliveryAvailable || laundry.deliveryAvailable;
    laundry.deliveryCharges = deliveryCharges || laundry.deliveryCharges;
    laundry.image = laundryImage;
    laundry.rating = rating || laundry.rating;

    const updatedLaundry = await laundry.save();
    res.json(updatedLaundry);
  } else {
    res.status(404);
    throw new Error('Laundry service not found');
  }
});

// @desc    Delete a laundry service
// @route   DELETE /api/laundry/:id
// @access  Private/Owner
const deleteLaundryService = asyncHandler(async (req, res) => {
  const laundry = await Laundry.findById(req.params.id);

  if (laundry) {
    // Check if user is owner
    if (laundry.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await laundry.remove();
    res.json({ message: 'Laundry service removed' });
  } else {
    res.status(404);
    throw new Error('Laundry service not found');
  }
});

module.exports = {
  getLaundryServices,
  getLaundryServiceById,
  createLaundryService,
  updateLaundryService,
  deleteLaundryService,
  createLaundryServicePublic,
};