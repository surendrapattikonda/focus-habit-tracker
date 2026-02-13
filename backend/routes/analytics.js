const express = require('express');
const { getWeeklyAnalytics, getStats } = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/weekly', getWeeklyAnalytics);
router.get('/stats', getStats);

module.exports = router;