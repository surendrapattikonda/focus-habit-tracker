import { useState, useEffect } from 'react';
import { activityService } from '../services/activityService';
import ActivityForm from '../components/dashboard/ActivityForm';
import ActivityList from '../components/dashboard/ActivityList';
import Navbar from '../components/common/Navbar';
import toast from 'react-hot-toast';
import { startOfDay, endOfDay } from 'date-fns';

const DashboardPage = () => {
  const [todayActivities, setTodayActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayActivities();
  }, []);

  const fetchTodayActivities = async () => {
    try {
      const today = new Date();
      const activities = await activityService.getActivities({
        startDate: startOfDay(today).toISOString(),
        endDate: endOfDay(today).toISOString()
      });
      setTodayActivities(activities);
    } catch (error) {
      toast.error('Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  };

  const handleActivityAdded = async (activityData) => {
    try {
      const newActivity = await activityService.createActivity(activityData);
      setTodayActivities([newActivity, ...todayActivities]);
      toast.success('Activity added!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add activity');
    }
  };

  const handleDelete = async (id) => {
    try {
      await activityService.deleteActivity(id);
      setTodayActivities(todayActivities.filter(a => a._id !== id));
      toast.success('Activity deleted');
    } catch (error) {
      toast.error('Failed to delete activity');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">

      {/* Cyan Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.25),transparent_50%)]"></div>

      <Navbar />

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <ActivityForm onActivityAdded={handleActivityAdded} />
          <ActivityList activities={todayActivities} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
