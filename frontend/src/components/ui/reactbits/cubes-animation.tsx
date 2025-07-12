import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface CubesAnimationProps {
  className?: string;
}

export function CubesAnimation({ className = "" }: CubesAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);
  
  // Generate cube data
  const cubes = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: (i % 4) * 80,
    y: Math.floor(i / 4) * 80,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1,
  }));
  
  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="grid grid-cols-4 gap-4 w-[340px] h-[340px]">
        {cubes.map((cube) => (
          <motion.div
            key={cube.id}
            className="w-16 h-16 bg-gradient-to-br from-blue-500/80 to-purple-600/80 rounded-lg backdrop-blur-sm"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { 
                opacity: 0,
                scale: 0.3,
                rotateX: -30,
                rotateY: 45
              },
              visible: { 
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                transition: {
                  duration: cube.duration,
                  delay: cube.delay,
                  ease: [0.215, 0.61, 0.355, 1]
                }
              }
            }}
            whileHover={{
              scale: 1.1,
              rotateZ: 5,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
              transition: { duration: 0.3 }
            }}
          />
        ))}
      </div>
    </div>
  );
}