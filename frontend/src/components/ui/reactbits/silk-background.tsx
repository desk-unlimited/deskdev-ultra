import React, { useEffect, useRef } from "react";

interface SilkBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function SilkBackground({ children, className = "" }: SilkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Create silk-like patterns
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }[] = [];
    
    const colors = [
      "rgba(14, 165, 233, 0.2)",  // Sky blue
      "rgba(139, 92, 246, 0.2)",  // Purple
      "rgba(236, 72, 153, 0.2)",  // Pink
    ];
    
    const createParticle = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 100 + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const vx = (Math.random() - 0.5) * 0.3;
      const vy = (Math.random() - 0.5) * 0.3;
      const maxLife = 200 + Math.random() * 100;
      
      particles.push({
        x, y, size, color, vx, vy, life: 0, maxLife
      });
    };
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
      createParticle();
    }
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new particles occasionally
      if (Math.random() < 0.05 && particles.length < 30) {
        createParticle();
      }
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Calculate opacity based on life
        const opacity = p.life < p.maxLife / 2 
          ? p.life / (p.maxLife / 2) 
          : 1 - (p.life - p.maxLife / 2) / (p.maxLife / 2);
        
        // Draw silk-like shape
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size
        );
        
        const baseColor = p.color.slice(0, -4); // Remove opacity
        gradient.addColorStop(0, `${baseColor}, ${opacity * 0.3})`);
        gradient.addColorStop(1, `${baseColor}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  
  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
        style={{ filter: "blur(60px)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}