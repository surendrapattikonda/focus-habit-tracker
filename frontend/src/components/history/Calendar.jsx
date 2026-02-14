import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const Calendar = ({ activities, onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get activities for a specific day
  const getActivitiesForDay = (day) => {
    return activities.filter(activity => 
      isSameDay(new Date(activity.timestamp), day)
    );
  };

  // Check if day has activities
  const hasActivities = (day) => {
    return getActivitiesForDay(day).length > 0;
  };

  // Get total duration for day
  const getDayDuration = (day) => {
    return getActivitiesForDay(day).reduce((sum, a) => sum + a.duration, 0);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
          className="p-2 hover:bg-slate-700 rounded-lg transition"
        >
          ←
        </button>
        
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
          className="p-2 hover:bg-slate-700 rounded-lg transition"
        >
          →
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-slate-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day, index) => {
          const dayActivities = getActivitiesForDay(day);
          const duration = getDayDuration(day);
          const isToday = isSameDay(day, new Date());

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDayClick(day, dayActivities)}
              className={`
                aspect-square p-2 rounded-lg relative
                ${isToday ? 'ring-2 ring-purple-500' : ''}
                ${hasActivities(day) ? 'bg-purple-600/20 hover:bg-purple-600/30' : 'bg-slate-700 hover:bg-slate-600'}
                transition
              `}
            >
              <span className={`text-sm ${!isSameMonth(day, currentDate) ? 'text-slate-600' : ''}`}>
                {format(day, 'd')}
              </span>
              
              {hasActivities(day) && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;