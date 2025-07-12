import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface FluidGlassProps {
  children: React.ReactNode;
  className?: string;
}

export function FluidGlass({ children, className = "" }: FluidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add spring physics for smoother animation
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  // Transform values for the gradient movement
  const gradientX = useTransform(springX, [-300, 300], [0, 100]);
  const gradientY = useTransform(springY, [-300, 300], [0, 100]);
  
  // Transform values for the highlight effect
  const highlightX = useTransform(springX, [-300, 300], [-15, 15]);
  const highlightY = useTransform(springY, [-300, 300], [-15, 15]);
  const highlightOpacity = useTransform(
    springX,
    [-300, 0, 300],
    [0.2, 0.5, 0.2]
  );
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const element = ref.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-md ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(120deg, #3b82f6, #8b5cf6, #ec4899)",
          backgroundSize: "200% 200%",
          backgroundPosition: `${gradientX}% ${gradientY}%`,
        }}
      />
      
      {/* Glass highlight effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), transparent 70%)",
          transform: `translate(${highlightX.get()}px, ${highlightY.get()}px)`,
          opacity: highlightOpacity,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}