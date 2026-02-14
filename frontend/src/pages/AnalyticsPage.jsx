import { useState, useEffect } from 'react';
import { activityService } from '../services/activityService';
import WeeklyChart3D from '../components/analytics/WeeklyChart3D';
import Navbar from '../components/common/Navbar';
import toast from 'react-hot-toast';

const AnalyticsPage = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [weekly, statistics] = await Promise.all([
        activityService.getWeeklyAnalytics(),
        activityService.getStats('week')
      ]);

      setWeeklyData(weekly);
      setStats(statistics);
    } catch (error) {
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Analytics
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Time */}
          <div className="bg-slate-900/80 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 shadow-xl">
            <p className="text-slate-400 text-sm mb-2">
              Total Time This Week
            </p>
            <p className="text-3xl font-bold text-white">
              {Math.floor((stats?.totalDuration || 0) / 60)}h{' '}
              {(stats?.totalDuration || 0) % 60}m
            </p>
          </div>

          {/* Activities Logged */}
          <div className="bg-slate-900/80 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 shadow-xl">
            <p className="text-slate-400 text-sm mb-2">
              Activities Logged
            </p>
            <p className="text-3xl font-bold text-white">
              {stats?.totalActivities || 0}
            </p>
          </div>

          {/* Average Per Day */}
          <div className="bg-slate-900/80 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 shadow-xl">
            <p className="text-slate-400 text-sm mb-2">
              Average Per Day
            </p>
            <p className="text-3xl font-bold text-white">
              {Math.floor((stats?.totalDuration || 0) / 7 / 60)}h
            </p>
          </div>
        </div>

        {/* 3D Weekly Chart */}
        <div className="bg-slate-900/80 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 shadow-xl">
          <WeeklyChart3D weeklyData={weeklyData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
