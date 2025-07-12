import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardData {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
}

interface CardSwapProps {
  cards: CardData[];
  className?: string;
}

export function CardSwap({ cards, className = "" }: CardSwapProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };
  
  const currentCard = cards[currentIndex];
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
    }),
  };
  
  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-xl w-full h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentCard.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={`absolute inset-0 p-6 rounded-xl ${
              currentCard.color || "bg-gradient-to-br from-blue-500/20 to-purple-600/20"
            } backdrop-blur-sm border border-white/10`}
          >
            <div className="flex flex-col h-full">
              {currentCard.icon && (
                <div className="text-3xl mb-4">{currentCard.icon}</div>
              )}
              <h3 className="text-xl font-bold mb-2">{currentCard.title}</h3>
              <p className="text-sm opacity-80 flex-grow">{currentCard.description}</p>
              
              <div className="flex justify-between items-center mt-4">
                <motion.button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ←
                </motion.button>
                
                <div className="flex gap-1">
                  {cards.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentIndex
                          ? "bg-white"
                          : "bg-white/30"
                      }`}
                      animate={{ scale: index === currentIndex ? 1.2 : 1 }}
                    />
                  ))}
                </div>
                
                <motion.button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}