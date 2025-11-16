const express = require('express');
const router = express.Router();
const {
  getOwnerDashboard,
  getOwnerServices,
  updateOwnerProfile,
} = require('../controllers/ownerController');
const { protect, ownerProtect } = require('../middleware/auth');

router.route('/dashboard').get(protect, ownerProtect, getOwnerDashboard);
router.route('/services').get(protect, ownerProtect, getOwnerServices);
router.route('/profile').put(protect, ownerProtect, updateOwnerProfile);

module.exports = router;