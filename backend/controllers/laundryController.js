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
    distance,
    googleMapLink,
    ownerName,
  } = req.body;

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
    image,
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
  } = req.body;

  const laundry = new Laundry({
    name,
    description,
    address,
    phone,
    timings,
    pricing,
    deliveryAvailable,
    deliveryCharges,
    image,
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
    rating,
  } = req.body;

  const laundry = await Laundry.findById(req.params.id);

  if (laundry) {
    // Check if user is owner
    if (laundry.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    laundry.name = name || laundry.name;
    laundry.description = description || laundry.description;
    laundry.address = address || laundry.address;
    laundry.phone = phone || laundry.phone;
    laundry.timings = timings || laundry.timings;
    laundry.pricing = pricing || laundry.pricing;
    laundry.deliveryAvailable = deliveryAvailable || laundry.deliveryAvailable;
    laundry.deliveryCharges = deliveryCharges || laundry.deliveryCharges;
    laundry.image = image || laundry.image;
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