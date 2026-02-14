import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

const CATEGORY_COLORS = {
  Work: 'bg-blue-500',
  Study: 'bg-green-500',
  Exercise: 'bg-orange-500',
  Break: 'bg-yellow-500',
  Personal: 'bg-purple-500'
};

const DayModal = ({ isOpen, onClose, date, activities }) => {
  if (!isOpen) return null;

  const totalDuration = activities.reduce((sum, a) => sum + a.duration, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-slate-800 rounded-xl shadow-2xl z-50 p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {format(date, 'EEEE, MMMM d')}
                </h3>
                <p className="text-sm text-slate-400">
                  {activities.length} activities • {totalDuration} minutes
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            {/* Activities List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="bg-slate-700 p-4 rounded-lg flex items-center gap-4"
                >
                  <div className={`w-2 h-12 rounded-full ${CATEGORY_COLORS[activity.category]}`} />
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{activity.activityName}</h4>
                    <p className="text-sm text-slate-400">
                      {activity.duration} min • {format(new Date(activity.timestamp), 'h:mm a')}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 bg-slate-600 rounded-full">
                    {activity.category}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DayModal;