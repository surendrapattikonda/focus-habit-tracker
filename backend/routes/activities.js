const express = require('express');
const { body } = require('express-validator');
const {
  createActivity,
  getActivities,
  getActivity,
  deleteActivity
} = require('../controllers/activityController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation
const activityValidation = [
  body('activityName').trim().notEmpty().withMessage('Activity name is required'),
  body('duration').isInt({ min: 1, max: 1440 }).withMessage('Duration must be between 1-1440 minutes'),
  body('category').isIn(['Work', 'Study', 'Exercise', 'Break', 'Personal']).withMessage('Invalid category')
];

// All routes require authentication
router.use(auth);

router.post('/', activityValidation, createActivity);
router.get('/', getActivities);
router.get('/:id', getActivity);
router.delete('/:id', deleteActivity);

module.exports = router;