const express = require('express');
const router = express.Router();
const {
  getPrintingServices,
  getPrintingServiceById,
  createPrintingService,
  updatePrintingService,
  deletePrintingService,
  createPrintingServicePublic,
} = require('../controllers/printingController');
const { protect, ownerProtect } = require('../middleware/auth');

router.route('/').get(getPrintingServices).post(protect, ownerProtect, createPrintingService);
router.route('/public').post(createPrintingServicePublic);
router
  .route('/:id')
  .get(getPrintingServiceById)
  .put(protect, ownerProtect, updatePrintingService)
  .delete(protect, ownerProtect, deletePrintingService);

module.exports = router;