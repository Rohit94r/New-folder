const express = require('express');
const router = express.Router();
const {
  getProperties,
  getNearbyProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  createPropertyPublic,
} = require('../controllers/propertyController');
const { protect, ownerProtect } = require('../middleware/auth');

router.route('/').get(getProperties).post(protect, ownerProtect, createProperty);
router.route('/public').post(createPropertyPublic);
router.route('/nearby').get(getNearbyProperties);
router
  .route('/:id')
  .get(getPropertyById)
  .put(protect, ownerProtect, updateProperty)
  .delete(protect, ownerProtect, deleteProperty);

module.exports = router;