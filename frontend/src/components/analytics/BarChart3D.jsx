import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CATEGORY_COLORS = {
  Work: '#3b82f6',      // blue
  Study: '#10b981',     // green
  Exercise: '#f59e0b',  // orange
  Break: '#eab308',     // yellow
  Personal: '#a855f7'   // purple
};

// Animated Bar Component
function AnimatedBar({ position, height, color, delay = 0 }) {
  const meshRef = useRef();
  const targetHeight = useRef(height);
  const currentHeight = useRef(0.01);

  useFrame((state, delta) => {
    if (currentHeight.current < targetHeight.current) {
      currentHeight.current = Math.min(
        currentHeight.current + delta * 3,
        targetHeight.current
      );
      
      meshRef.current.scale.y = currentHeight.current;
      meshRef.current.position.y = currentHeight.current / 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], 0, position[2]]}>
      <boxGeometry args={[0.7, 1, 0.7]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

// Day Label Component
function DayLabel({ position, text }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[0.8, 0.3]} />
      <meshBasicMaterial color="#1e293b" opacity={0.8} transparent />
    </mesh>
  );
}

// Grid Floor
function GridFloor() {
  return (
    <gridHelper args={[20, 20, '#334155', '#1e293b']} position={[0, 0, 0]} />
  );
}

// Main Bar Chart Component
const BarChart3D = ({ data }) => {
  // Process data to create stacked bars
  const bars = useMemo(() => {
    const result = [];
    
    data.forEach((day, dayIndex) => {
      const xPos = (dayIndex - 3) * 2; // Spread across X-axis
      let yOffset = 0;

      // Create stacked bars for each category
      Object.entries(day.categories).forEach(([category, duration]) => {
        if (duration > 0) {
          const height = duration / 30; // Scale: 30 min = 1 unit height
          
          result.push({
            position: [xPos, yOffset, 0],
            height,
            color: CATEGORY_COLORS[category],
            category,
            day: day.day
          });
          
          yOffset += height;
        }
      });
    });

    return result;
  }, [data]);

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* Grid Floor */}
      <GridFloor />

      {/* Animated Bars */}
      {bars.map((bar, index) => (
        <AnimatedBar
          key={index}
          position={bar.position}
          height={bar.height}
          color={bar.color}
          delay={index * 0.1}
        />
      ))}

      {/* Day Labels */}
      {data.map((day, index) => (
        <group key={day.day} position={[(index - 3) * 2, -0.5, 1.5]}>
          <DayLabel position={[0, 0, 0]} text={day.day} />
        </group>
      ))}

      {/* Axis Lines */}
      <mesh position={[0, 0, -8]}>
        <boxGeometry args={[15, 0.05, 0.05]} />
        <meshBasicMaterial color="#475569" />
      </mesh>
      <mesh position={[-8, 4, 0]}>
        <boxGeometry args={[0.05, 8, 0.05]} />
        <meshBasicMaterial color="#475569" />
      </mesh>
    </group>
  );
};

export default BarChart3D;