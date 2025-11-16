const express = require('express');
const router = express.Router();
const {
  getMessPartners,
  getMessPartnerById,
  createMessPartner,
  updateMessPartner,
  deleteMessPartner,
  getOfficialMess,
  createMessPartnerPublic,
} = require('../controllers/messController');
const { protect, ownerProtect } = require('../middleware/auth');

router.route('/').get(getMessPartners).post(protect, ownerProtect, createMessPartner);
router.route('/public').post(createMessPartnerPublic);
router.route('/official').get(getOfficialMess);
router
  .route('/:id')
  .get(getMessPartnerById)
  .put(protect, ownerProtect, updateMessPartner)
  .delete(protect, ownerProtect, deleteMessPartner);

module.exports = router;