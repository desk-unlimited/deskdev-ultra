import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashCursorProps {
  children: React.ReactNode;
  className?: string;
}

interface SplashPosition {
  x: number;
  y: number;
  id: number;
}

export function SplashCursor({ children, className = "" }: SplashCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [splashes, setSplashes] = useState<SplashPosition[]>([]);
  const [nextId, setNextId] = useState(0);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Create splash effect on click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSplash = {
        x: e.clientX,
        y: e.clientY,
        id: nextId,
      };
      
      setSplashes((prev) => [...prev, newSplash]);
      setNextId((prev) => prev + 1);
      
      // Remove splash after animation completes
      setTimeout(() => {
        setSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id));
      }, 1000);
    };
    
    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [nextId]);
  
  return (
    <div className={`relative ${className}`}>
      {/* Cursor follower */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-blue-500/30 pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      
      {/* Splash effects */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="fixed w-4 h-4 rounded-full bg-blue-500 pointer-events-none z-40 mix-blend-screen"
            initial={{ 
              x: splash.x - 8,
              y: splash.y - 8,
              scale: 0.5,
              opacity: 0.8,
            }}
            animate={{
              scale: 15,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
      
      {children}
    </div>
  );
}