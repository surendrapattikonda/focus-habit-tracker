import { motion } from 'framer-motion';
import { format } from 'date-fns';

const CATEGORY_COLORS = {
  Work: 'bg-blue-500',
  Study: 'bg-green-500',
  Exercise: 'bg-orange-500',
  Break: 'bg-yellow-500',
  Personal: 'bg-purple-500'
};

const ActivityCard = ({ activity, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-slate-700 p-4 rounded-lg flex items-center justify-between hover:bg-slate-650 transition group"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-2 h-12 rounded-full ${CATEGORY_COLORS[activity.category]}`} />
        
        <div className="flex-1">
          <h3 className="font-medium">{activity.activityName}</h3>
          <p className="text-sm text-slate-400">
            {activity.duration} min • {format(new Date(activity.timestamp), 'h:mm a')}
          </p>
        </div>

        <span className="text-sm px-3 py-1 bg-slate-600 rounded-full">
          {activity.category}
        </span>
      </div>

      <button
        onClick={() => onDelete(activity._id)}
        className="ml-4 p-2 text-red-400 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </motion.div>
  );
};

export default ActivityCard;