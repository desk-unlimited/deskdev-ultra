import React, { useState } from "react";
import { motion } from "framer-motion";

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  starCount?: number;
  color?: string;
}

export function StarBorder({
  children,
  className = "",
  starCount = 20,
  color = "#3b82f6",
}: StarBorderProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate stars positioned around the border
  const stars = Array.from({ length: starCount }, (_, i) => {
    const angle = (i / starCount) * Math.PI * 2;
    const delay = i * 0.05;
    
    return { angle, delay };
  });
  
  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Stars */}
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ 
            x: "50%", 
            y: "50%",
            opacity: 0,
            scale: 0,
          }}
          animate={isHovered ? {
            x: `calc(50% + ${Math.cos(star.angle) * 100}%)`,
            y: `calc(50% + ${Math.sin(star.angle) * 100}%)`,
            opacity: 1,
            scale: [0, 1.5, 1],
          } : {
            x: "50%",
            y: "50%",
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.5,
            delay: isHovered ? star.delay : 0,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          boxShadow: `0 0 0 1px ${color}20, 0 0 20px ${color}40`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}