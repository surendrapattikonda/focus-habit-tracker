const Activity = require('../models/activity.js');

// @route   GET /api/analytics/weekly
exports.getWeeklyAnalytics = async (req, res) => {
  try {
    const { startDate } = req.query;
    
    // Default to current week if no start date
    const weekStart = startDate 
      ? new Date(startDate) 
      : getStartOfWeek(new Date());
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    // Get all activities for the week
    const activities = await Activity.find({
      userId: req.user.id,
      timestamp: {
        $gte: weekStart,
        $lt: weekEnd
      }
    }).sort({ timestamp: 1 });

    // Process data for chart
    const weeklyData = processWeeklyData(activities, weekStart);

    res.json(weeklyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/analytics/stats
exports.getStats = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    const startDate = getStartDate(period);
    
    // Total duration
    const result = await Activity.aggregate([
      {
        $match: {
          userId: req.user.id,
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalDuration: { $sum: '$duration' },
          totalActivities: { $sum: 1 }
        }
      }
    ]);

    // Category breakdown
    const categoryBreakdown = await Activity.aggregate([
      {
        $match: {
          userId: req.user.id,
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$category',
          duration: { $sum: '$duration' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalDuration: result[0]?.totalDuration || 0,
      totalActivities: result[0]?.totalActivities || 0,
      categories: categoryBreakdown
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper functions
function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  return new Date(d.setDate(diff));
}

function getStartDate(period) {
  const now = new Date();
  switch(period) {
    case 'today':
      return new Date(now.setHours(0, 0, 0, 0));
    case 'week':
      return getStartOfWeek(now);
    case 'month':
      return new Date(now.getFullYear(), now.getMonth(), 1);
    default:
      return getStartOfWeek(now);
  }
}

function processWeeklyData(activities, weekStart) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekData = days.map((day, index) => ({
    day,
    date: new Date(weekStart.getTime() + index * 24 * 60 * 60 * 1000),
    duration: 0,
    categories: {
      Work: 0,
      Study: 0,
      Exercise: 0,
      Break: 0,
      Personal: 0
    }
  }));

  activities.forEach(activity => {
    const activityDate = new Date(activity.timestamp);
    const dayIndex = (activityDate.getDay() + 6) % 7; // Convert to Monday = 0
    
    if (dayIndex >= 0 && dayIndex < 7) {
      weekData[dayIndex].duration += activity.duration;
      weekData[dayIndex].categories[activity.category] += activity.duration;
    }
  });

  return weekData;
}

module.exports = exports;