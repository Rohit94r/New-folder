const User = require('../models/User');
const Property = require('../models/Property');
const Mess = require('../models/Mess');
const Laundry = require('../models/Laundry');
const Printing = require('../models/Printing');
const Event = require('../models/Event');
const asyncHandler = require('express-async-handler');

// @desc    Get owner dashboard data
// @route   GET /api/owner/dashboard
// @access  Private/Owner
const getOwnerDashboard = asyncHandler(async (req, res) => {
  const properties = await Property.find({ owner: req.user._id });
  const messPartners = await Mess.find({ owner: req.user._id });
  const laundryServices = await Laundry.find({ owner: req.user._id });
  const printingServices = await Printing.find({ owner: req.user._id });
  const events = await Event.find({ owner: req.user._id });

  res.json({
    properties: properties.length,
    messPartners: messPartners.length,
    laundryServices: laundryServices.length,
    printingServices: printingServices.length,
    events: events.length,
    propertiesList: properties,
    messPartnersList: messPartners,
    laundryServicesList: laundryServices,
    printingServicesList: printingServices,
    eventsList: events,
  });
});

// @desc    Get owner services
// @route   GET /api/owner/services
// @access  Private/Owner
const getOwnerServices = asyncHandler(async (req, res) => {
  const properties = await Property.find({ owner: req.user._id });
  const messPartners = await Mess.find({ owner: req.user._id });
  const laundryServices = await Laundry.find({ owner: req.user._id });
  const printingServices = await Printing.find({ owner: req.user._id });

  res.json({
    properties,
    messPartners,
    laundryServices,
    printingServices,
  });
});

// @desc    Update owner profile
// @route   PUT /api/owner/profile
// @access  Private/Owner
const updateOwnerProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.college = req.body.college || user.college;
    user.collegeId = req.body.collegeId || user.collegeId;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      college: updatedUser.college,
      role: updatedUser.role,
      collegeIdVerified: updatedUser.collegeIdVerified,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  getOwnerDashboard,
  getOwnerServices,
  updateOwnerProfile,
};