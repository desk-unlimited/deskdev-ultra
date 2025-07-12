import React, { useState } from "react";
import { motion } from "framer-motion";

interface ChromaGridProps {
  className?: string;
  rows?: number;
  cols?: number;
}

export function ChromaGrid({
  className = "",
  rows = 8,
  cols = 12,
}: ChromaGridProps) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  
  // Generate grid cells
  const cells = Array.from({ length: rows * cols }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    
    return { id: i, row, col };
  });
  
  // Calculate distance from hovered cell
  const getDistance = (cell: { row: number; col: number }) => {
    if (hoveredCell === null) return 0;
    
    const hoveredRow = Math.floor(hoveredCell / cols);
    const hoveredCol = hoveredCell % cols;
    
    const rowDiff = cell.row - hoveredRow;
    const colDiff = cell.col - hoveredCol;
    
    return Math.sqrt(rowDiff * rowDiff + colDiff * colDiff);
  };
  
  // Get color based on distance
  const getColor = (distance: number) => {
    if (hoveredCell === null) return "rgba(59, 130, 246, 0.1)";
    
    // Create a rainbow effect based on distance
    const hue = (distance * 30) % 360;
    return `hsla(${hue}, 80%, 60%, 0.3)`;
  };
  
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: "2px",
      }}
      onMouseLeave={() => setHoveredCell(null)}
    >
      {cells.map((cell) => {
        const distance = getDistance(cell);
        const color = getColor(distance);
        
        return (
          <motion.div
            key={cell.id}
            className="aspect-square rounded-md cursor-pointer"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: hoveredCell === null ? 0.3 : 0.7,
              scale: hoveredCell === cell.id ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setHoveredCell(cell.id)}
            whileHover={{ scale: 1.2 }}
          />
        );
      })}
    </div>
  );
}