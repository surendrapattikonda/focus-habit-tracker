import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CATEGORIES = ['Work', 'Study', 'Exercise', 'Break', 'Personal'];

const ActivityForm = ({ onActivityAdded }) => {
  const [formData, setFormData] = useState({
    activityName: '',
    duration: '',
    category: 'Work'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.activityName || !formData.duration) {
      toast.error('Please fill all fields');
      return;
    }

    await onActivityAdded({
      ...formData,
      duration: parseInt(formData.duration),
      timestamp: new Date().toISOString()
    });

    setFormData({
      activityName: '',
      duration: '',
      category: 'Work'
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-slate-900/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-slate-700"
    >
      <h2 className="text-xl font-semibold mb-6 text-white">
        Log Activity
      </h2>

      <div className="space-y-5">
        {/* Activity Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Activity Name
          </label>
          <input
            type="text"
            value={formData.activityName}
            onChange={(e) =>
              setFormData({ ...formData, activityName: e.target.value })
            }
            placeholder="e.g., Morning workout"
            className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
          />
        </div>

        {/* Duration + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="1440"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              placeholder="30"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white hover:from-blue-700 hover:to-cyan-700 transition duration-300"
        >
          Add Activity
        </button>
      </div>
    </motion.form>
  );
};

export default ActivityForm;
