const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  createEventPublic,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, ownerProtect } = require('../middleware/auth');

router.route('/').get(getEvents).post(protect, ownerProtect, createEvent);
router.route('/public').post(createEventPublic);
router
  .route('/:id')
  .get(getEventById)
  .put(protect, ownerProtect, updateEvent)
  .delete(protect, ownerProtect, deleteEvent);

module.exports = router;