const express = require('express');
const router = express.Router();
const {
  getLaundryServices,
  getLaundryServiceById,
  createLaundryService,
  updateLaundryService,
  deleteLaundryService,
  createLaundryServicePublic,
} = require('../controllers/laundryController');
const { protect, ownerProtect } = require('../middleware/auth');

router.route('/').get(getLaundryServices).post(protect, ownerProtect, createLaundryService);
router.route('/public').post(createLaundryServicePublic);
router
  .route('/:id')
  .get(getLaundryServiceById)
  .put(protect, ownerProtect, updateLaundryService)
  .delete(protect, ownerProtect, deleteLaundryService);

module.exports = router;