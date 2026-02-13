import api from './api';

export const activityService = {
  async createActivity(activityData) {
    const response = await api.post('/activities', activityData);
    return response.data;
  },

  async getActivities(params = {}) {
    const response = await api.get('/activities', { params });
    return response.data;
  },

  async deleteActivity(id) {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  },

  async getWeeklyAnalytics(startDate) {
    const params = startDate ? { startDate } : {};
    const response = await api.get('/analytics/weekly', { params });
    return response.data;
  },

  async getStats(period = 'week') {
    const response = await api.get('/analytics/stats', { params: { period } });
    return response.data;
  }
};