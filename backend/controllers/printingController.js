const Printing = require('../models/Printing');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all printing services
// @route   GET /api/printing
// @access  Public
const getPrintingServices = asyncHandler(async (req, res) => {
  const printingServices = await Printing.find({});
  res.json(printingServices);
});

// @desc    Get printing service by ID
// @route   GET /api/printing/:id
// @access  Public
const getPrintingServiceById = asyncHandler(async (req, res) => {
  const printing = await Printing.findById(req.params.id);

  if (printing) {
    res.json(printing);
  } else {
    res.status(404);
    throw new Error('Printing service not found');
  }
});

// @desc    Create a printing service (public submission)
// @route   POST /api/printing/public
// @access  Public
const createPrintingServicePublic = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    image,
    photos, // Handle photos array from frontend
    distance,
    googleMapLink,
    ownerName,
  } = req.body;

  // Use photos array if available, otherwise use single image
  let printingImage = image;
  if (photos && Array.isArray(photos) && photos.length > 0) {
    printingImage = photos[0]; // Use first photo as main image
  }

  // Create a default owner for public submissions
  const defaultOwner = await User.findOne({ email: 'public@roomeze.com' });
  
  const printing = new Printing({
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    image: printingImage,
    distance,
    googleMapLink,
    ownerName,
    owner: defaultOwner ? defaultOwner._id : null,
  });

  const createdPrinting = await printing.save();
  res.status(201).json(createdPrinting);
});

// @desc    Create a printing service
// @route   POST /api/printing
// @access  Private/Owner
const createPrintingService = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    image,
    photos, // Handle photos array from frontend
  } = req.body;

  // Use photos array if available, otherwise use single image
  let printingImage = image;
  if (photos && Array.isArray(photos) && photos.length > 0) {
    printingImage = photos[0]; // Use first photo as main image
  }

  const printing = new Printing({
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    image: printingImage,
    owner: req.user._id,
  });

  const createdPrinting = await printing.save();
  res.status(201).json(createdPrinting);
});

// @desc    Update a printing service
// @route   PUT /api/printing/:id
// @access  Private/Owner
const updatePrintingService = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    image,
    photos, // Handle photos array from frontend
    rating,
  } = req.body;

  const printing = await Printing.findById(req.params.id);

  if (printing) {
    // Check if user is owner
    if (printing.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    // Use photos array if available, otherwise use single image
    let printingImage = image || printing.image;
    if (photos && Array.isArray(photos) && photos.length > 0) {
      printingImage = photos[0]; // Use first photo as main image
    }

    printing.name = name || printing.name;
    printing.description = description || printing.description;
    printing.address = address || printing.address;
    printing.phone = phone || printing.phone;
    printing.timings = timings || printing.timings;
    printing.pricing = pricing || printing.pricing;
    printing.image = printingImage;
    printing.rating = rating || printing.rating;

    const updatedPrinting = await printing.save();
    res.json(updatedPrinting);
  } else {
    res.status(404);
    throw new Error('Printing service not found');
  }
});

// @desc    Delete a printing service
// @route   DELETE /api/printing/:id
// @access  Private/Owner
const deletePrintingService = asyncHandler(async (req, res) => {
  const printing = await Printing.findById(req.params.id);

  if (printing) {
    // Check if user is owner
    if (printing.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await printing.remove();
    res.json({ message: 'Printing service removed' });
  } else {
    res.status(404);
    throw new Error('Printing service not found');
  }
});

module.exports = {
  getPrintingServices,
  getPrintingServiceById,
  createPrintingService,
  updatePrintingService,
  deletePrintingService,
  createPrintingServicePublic,
};