import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BarChart3D from './BarChart3D';
import { motion } from 'framer-motion';

const WeeklyChart3D = ({ weeklyData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800 p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Weekly Activity Chart</h2>
      
      <div className="h-[500px] rounded-lg overflow-hidden bg-slate-900">
        <Canvas
          camera={{ 
            position: [12, 8, 12], 
            fov: 50 
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Enable camera controls (optional but nice) */}
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />
          
          <BarChart3D data={weeklyData} />
        </Canvas>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {['Work', 'Study', 'Exercise', 'Break', 'Personal'].map(category => (
          <div key={category} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded"
              style={{ 
                backgroundColor: {
                  Work: '#3b82f6',
                  Study: '#10b981',
                  Exercise: '#f59e0b',
                  Break: '#eab308',
                  Personal: '#a855f7'
                }[category]
              }}
            />
            <span className="text-sm text-slate-300">{category}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeeklyChart3D;