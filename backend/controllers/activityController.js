const Activity = require('../models/Activity');

// @route   POST /api/activities
exports.createActivity = async (req, res) => {
  try {
    const { activityName, duration, category, timestamp } = req.body;

    const activity = new Activity({
      userId: req.user.id,
      activityName,
      duration,
      category,
      timestamp: timestamp || new Date()
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/activities
exports.getActivities = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    
    let query = { userId: req.user.id };

    // Date filtering
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    // Category filtering
    if (category) {
      query.category = category;
    }

    const activities = await Activity.find(query)
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/activities/:id
exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   DELETE /api/activities/:id
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};