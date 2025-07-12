import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  words: string[];
  className?: string;
  baseText?: string;
  interval?: number;
}

export function RotatingText({
  words,
  className = "",
  baseText = "",
  interval = 2000,
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [words.length, interval]);
  
  return (
    <div className={`inline-flex items-center ${className}`}>
      {baseText && <span className="mr-2">{baseText}</span>}
      <div className="relative h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute font-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}