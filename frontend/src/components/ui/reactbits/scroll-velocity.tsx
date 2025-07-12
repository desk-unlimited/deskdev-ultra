import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollVelocityTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollVelocityText({ children, className = "" }: ScrollVelocityTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  
  const { scrollY } = useScroll();
  
  // Update element position on scroll or resize
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const updatePosition = () => {
      const rect = element.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
      setClientHeight(window.innerHeight);
    };
    
    updatePosition();
    window.addEventListener("resize", updatePosition);
    
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [ref]);
  
  // Calculate progress value (0 to 1) based on scroll position
  const yRange = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [0, 1]
  );
  
  // Add spring physics for smoother animation
  const ySpring = useSpring(yRange, { stiffness: 400, damping: 90 });
  
  // Transform properties based on scroll progress
  const scale = useTransform(ySpring, [0, 0.5, 1], [0.8, 1.1, 1]);
  const opacity = useTransform(ySpring, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(ySpring, [0, 0.5, 1], [-60, 0, 60]);
  
  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{
        scale,
        opacity,
        x,
      }}
    >
      {children}
    </motion.div>
  );
}