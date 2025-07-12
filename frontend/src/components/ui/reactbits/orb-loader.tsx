import React from "react";
import { motion } from "framer-motion";

interface OrbLoaderProps {
  className?: string;
  size?: number;
  color?: string;
}

export function OrbLoader({
  className = "",
  size = 80,
  color = "#3b82f6",
}: OrbLoaderProps) {
  // Create particles that orbit around the center
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const delay = i * 0.1;
    const radius = size / 2;
    
    return { angle, delay, radius };
  });
  
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Center orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          backgroundColor: color,
          filter: "blur(8px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Orbiting particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: size * 0.08,
            height: size * 0.08,
            backgroundColor: color,
            filter: "blur(3px)",
          }}
          initial={{
            x: Math.cos(particle.angle) * particle.radius * 0.5,
            y: Math.sin(particle.angle) * particle.radius * 0.5,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.cos(particle.angle) * particle.radius * 0.5,
              Math.cos(particle.angle) * particle.radius,
              Math.cos(particle.angle) * particle.radius * 0.5,
            ],
            y: [
              Math.sin(particle.angle) * particle.radius * 0.5,
              Math.sin(particle.angle) * particle.radius,
              Math.sin(particle.angle) * particle.radius * 0.5,
            ],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 20px ${color}20`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}