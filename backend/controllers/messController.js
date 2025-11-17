const Mess = require('../models/Mess');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all mess partners
// @route   GET /api/mess
// @access  Public
const getMessPartners = asyncHandler(async (req, res) => {
  const messPartners = await Mess.find({});
  res.json(messPartners);
});

// @desc    Get mess partner by ID
// @route   GET /api/mess/:id
// @access  Public
const getMessPartnerById = asyncHandler(async (req, res) => {
  const mess = await Mess.findById(req.params.id);

  if (mess) {
    res.json(mess);
  } else {
    res.status(404);
    throw new Error('Mess partner not found');
  }
});

// @desc    Create a mess partner (public submission)
// @route   POST /api/mess/public
// @access  Public
const createMessPartnerPublic = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    cuisine,
    address,
    phone,
    timings,
    isOfficial,
    menu,
    image,
    distance,
    googleMapLink,
    ownerName,
    pricing,
    priceRange,
    mealsIncluded,
    totalSeats
  } = req.body;

  // For public submissions, always set isOfficial to false
  const mess = new Mess({
    name,
    description,
    cuisine,
    address,
    phone,
    timings,
    isOfficial: false, // Always false for public submissions
    menu: Array.isArray(menu) && menu.length > 0 ? menu.filter(item => item && item.trim()).map(item => ({
      items: typeof item === 'string' ? item.trim() : String(item),
      name: '',
      price: 0
    })) : [],
    image,
    distance,
    googleMapLink,
    ownerName,
    pricing,
    priceRange,
    mealsIncluded,
    totalSeats
  });

  const createdMess = await mess.save();
  res.status(201).json(createdMess);
});

// @desc    Create a mess partner
// @route   POST /api/mess
// @access  Private/Owner
const createMessPartner = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    cuisine,
    address,
    phone,
    timings,
    isOfficial,
    menu,
    image,
    distance,
    googleMapLink,
    ownerName,
    pricing,
    priceRange,
    mealsIncluded,
    totalSeats
  } = req.body;

  const mess = new Mess({
    name,
    description,
    cuisine,
    address,
    phone,
    timings,
    isOfficial,
    menu: Array.isArray(menu) && menu.length > 0 ? menu.filter(item => item && item.trim()).map(item => ({
      items: typeof item === 'string' ? item.trim() : String(item),
      name: '',
      price: 0
    })) : [],
    image,
    distance,
    googleMapLink,
    ownerName,
    pricing,
    priceRange,
    mealsIncluded,
    totalSeats,
    owner: req.user._id,
  });

  const createdMess = await mess.save();
  res.status(201).json(createdMess);
});

// @desc    Update a mess partner
// @route   PUT /api/mess/:id
// @access  Private/Owner
const updateMessPartner = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    cuisine,
    address,
    phone,
    timings,
    isOfficial,
    menu,
    image,
    rating,
    distance,
    googleMapLink,
    ownerName,
    pricing,
    priceRange,
    mealsIncluded,
    totalSeats
  } = req.body;

  const mess = await Mess.findById(req.params.id);

  if (mess) {
    // Check if user is owner
    if (mess.owner && mess.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    mess.name = name || mess.name;
    mess.description = description || mess.description;
    mess.cuisine = cuisine || mess.cuisine;
    mess.address = address || mess.address;
    mess.phone = phone || mess.phone;
    mess.timings = timings || mess.timings;
    mess.isOfficial = isOfficial !== undefined ? isOfficial : mess.isOfficial;
    mess.menu = Array.isArray(menu) && menu.length > 0 ? menu.filter(item => item && item.trim()).map(item => ({
      items: typeof item === 'string' ? item.trim() : String(item),
      name: '',
      price: 0
    })) : mess.menu;
    mess.image = image || mess.image;
    mess.rating = rating || mess.rating;
    mess.distance = distance || mess.distance;
    mess.googleMapLink = googleMapLink || mess.googleMapLink;
    mess.ownerName = ownerName || mess.ownerName;
    mess.pricing = pricing || mess.pricing;
    mess.priceRange = priceRange || mess.priceRange;
    mess.mealsIncluded = mealsIncluded || mess.mealsIncluded;
    mess.totalSeats = totalSeats !== undefined ? totalSeats : mess.totalSeats;

    const updatedMess = await mess.save();
    res.json(updatedMess);
  } else {
    res.status(404);
    throw new Error('Mess partner not found');
  }
});

// @desc    Delete a mess partner
// @route   DELETE /api/mess/:id
// @access  Private/Owner
const deleteMessPartner = asyncHandler(async (req, res) => {
  const mess = await Mess.findById(req.params.id);

  if (mess) {
    // Check if user is owner
    if (mess.owner && mess.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await mess.remove();
    res.json({ message: 'Mess partner removed' });
  } else {
    res.status(404);
    throw new Error('Mess partner not found');
  }
});

// @desc    Get official mess (Atharva Canteen)
// @route   GET /api/mess/official
// @access  Public
const getOfficialMess = asyncHandler(async (req, res) => {
  const mess = await Mess.findOne({ isOfficial: true });

  if (mess) {
    res.json(mess);
  } else {
    res.status(404);
    throw new Error('Official mess not found');
  }
});

module.exports = {
  getMessPartners,
  getMessPartnerById,
  createMessPartner,
  updateMessPartner,
  deleteMessPartner,
  getOfficialMess,
  createMessPartnerPublic,
};