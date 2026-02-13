import { motion, AnimatePresence } from 'framer-motion';
import ActivityCard from './ActivityCard';

const ActivityList = ({ activities, onDelete }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Today's Activities</h2>

      {activities.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No activities logged yet</p>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {activities.map((activity) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ActivityList;