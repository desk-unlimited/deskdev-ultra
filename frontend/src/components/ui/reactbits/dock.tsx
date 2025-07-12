import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router";

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

interface DockProps {
  items: DockItemProps[];
  className?: string;
}

export function Dock({ items, className = "" }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  
  // Add spring physics for smoother animation
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dock = dockRef.current;
      if (!dock) return;
      
      const rect = dock.getBoundingClientRect();
      const x = e.clientX - rect.left;
      mouseX.set(x);
    };
    
    const handleMouseLeave = () => {
      mouseX.set(0);
      setHoveredIndex(null);
    };
    
    const dock = dockRef.current;
    if (dock) {
      dock.addEventListener("mousemove", handleMouseMove);
      dock.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (dock) {
        dock.removeEventListener("mousemove", handleMouseMove);
        dock.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mouseX]);
  
  return (
    <motion.div
      ref={dockRef}
      className={`flex items-center justify-center gap-2 p-2 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 ${className}`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {items.map((item, index) => {
        // Calculate distance from mouse to determine scale
        const distance = useTransform(springX, (x) => {
          const dock = dockRef.current;
          if (!dock || x === 0) return 0;
          
          const rect = dock.getBoundingClientRect();
          const itemWidth = rect.width / items.length;
          const itemX = itemWidth * (index + 0.5);
          const distanceFromMouse = Math.abs(x - itemX);
          
          // Convert distance to a 0-1 value (closer = higher value)
          return Math.max(0, 1 - distanceFromMouse / (itemWidth * 2));
        });
        
        // Transform distance to scale
        const scale = useTransform(distance, [0, 1], [1, 1.5]);
        
        return (
          <Link to={item.to} key={index}>
            <motion.div
              className={`relative flex flex-col items-center justify-center p-2 rounded-full ${
                item.isActive ? "bg-blue-500/30" : "bg-white/5 hover:bg-white/10"
              } transition-colors`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ scale }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl text-white">{item.icon}</div>
              
              {/* Label tooltip */}
              <motion.div
                className="absolute -top-10 px-3 py-1 bg-black/80 text-white text-xs rounded-full whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? 0 : 10
                }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
}