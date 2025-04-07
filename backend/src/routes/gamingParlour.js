const express = require('express');
const router = express.Router();
const {
  getParlours,
  getParlour,
  createParlour,
  updateParlour,
  deleteParlour,
  searchParlours
} = require('../controllers/gamingParlour');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getParlours)
  .post(protect, authorize('admin', 'owner'), createParlour);

router.route('/search')
  .get(searchParlours);

router.route('/:id')
  .get(getParlour)
  .put(protect, authorize('admin', 'owner'), updateParlour)
  .delete(protect, authorize('admin', 'owner'), deleteParlour);

module.exports = router; 