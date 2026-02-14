import { motion, AnimatePresence } from 'framer-motion';
import ActivityCard from './ActivityCard';

const ActivityList = ({ activities, onDelete }) => {
  return (
    <div
      className="bg-slate-900/80 backdrop-blur-lg 
                 p-6 rounded-2xl 
                 border border-slate-700 
                 shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-6 text-white">
        Today's Activities
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No activities logged yet
        </p>
      ) : (
        <div className="space-y-4">
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
