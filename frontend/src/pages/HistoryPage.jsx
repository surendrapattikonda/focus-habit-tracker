import { useState, useEffect } from 'react';
import { activityService } from '../services/activityService';
import Calendar from '../components/history/Calendar';
import DayModal from '../components/history/DayModal';
import Navbar from '../components/common/Navbar';
import toast from 'react-hot-toast';

const HistoryPage = () => {
  const [activities, setActivities] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await activityService.getActivities();
      setActivities(data);
    } catch (error) {
      toast.error('Failed to fetch activities');
    }
  };

  const handleDayClick = (day, dayActivities) => {
    setSelectedDay(day);
    setSelectedActivities(dayActivities);
    setModalOpen(true);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br 
                  from-slate-950 via-slate-900 to-slate-800">
    <Navbar />
    
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Activity History
      </h1>

      <Calendar 
        activities={activities} 
        onDayClick={handleDayClick}
      />

      <DayModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        date={selectedDay}
        activities={selectedActivities}
      />
    </div>
  </div>
);
};

export default HistoryPage;