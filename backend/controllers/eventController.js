const Event = require('../models/Event');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Create an event (public submission)
// @route   POST /api/events/public
// @access  Public
const createEventPublic = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    date,
    location,
    organizer,
    contact,
    signUpLink,
    image,
  } = req.body;

  // Create a default owner for public submissions
  const defaultOwner = await User.findOne({ email: 'public@roomeze.com' });
  
  const event = new Event({
    title,
    description,
    category,
    date,
    location,
    organizer,
    contact,
    signUpLink,
    image,
    owner: defaultOwner ? defaultOwner._id : null,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Owner
const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    date,
    location,
    organizer,
    contact,
    signUpLink,
    image,
  } = req.body;

  const event = new Event({
    title,
    description,
    category,
    date,
    location,
    organizer,
    contact,
    signUpLink,
    image,
    owner: req.user._id,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Owner
const updateEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    date,
    location,
    organizer,
    contact,
    signUpLink,
    image,
  } = req.body;

  const event = await Event.findById(req.params.id);

  if (event) {
    // Check if user is owner
    if (event.owner && event.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.category = category || event.category;
    event.date = date || event.date;
    event.location = location || event.location;
    event.organizer = organizer || event.organizer;
    event.contact = contact || event.contact;
    event.signUpLink = signUpLink || event.signUpLink;
    event.image = image || event.image;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Owner
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    // Check if user is owner
    if (event.owner && event.owner.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await event.remove();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  createEventPublic,
  updateEvent,
  deleteEvent,
};