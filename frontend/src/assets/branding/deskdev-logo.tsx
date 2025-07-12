import React from "react";

interface DeskDevLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function DeskDevLogo({ width = 34, height = 34, className = "" }: DeskDevLogoProps) {
  return (
    <div 
      className={`flex items-center justify-center font-bold text-lg ${className}`}
      style={{ 
        width: width, 
        height: height,
        minWidth: width,
        minHeight: height
      }}
    >
      <span className="text-logo">D</span>
      <span className="text-content text-xs">dev</span>
    </div>
  );
}

export function DeskDevLogoFull({ width = 120, height = 34, className = "" }: DeskDevLogoProps) {
  return (
    <div 
      className={`flex items-center justify-center font-bold ${className}`}
      style={{ 
        width: width, 
        height: height,
        minWidth: width,
        minHeight: height
      }}
    >
      <span className="text-logo text-xl">Desk</span>
      <span className="text-content text-xl">Dev</span>
      <span className="text-content text-xs ml-1">.ai</span>
    </div>
  );
}