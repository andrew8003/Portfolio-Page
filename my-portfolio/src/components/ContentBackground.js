import React, { useEffect, useRef } from 'react';
import './ContentBackground.css';

const ContentBackground = () => {
  const canvasRef = useRef(null);
  const waveRef = useRef({ time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size to match parent
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waveRef.current.time += 0.008;
      const time = waveRef.current.time;

      // Grid dimensions (smaller grid for content area)
      const cols = 20;
      const rows = 12;
      const cellWidth = canvas.width / (cols - 1);
      const cellHeight = canvas.height / (rows - 1);

      // Create wave grid points
      const points = [];
      for (let row = 0; row < rows; row++) {
        points[row] = [];
        for (let col = 0; col < cols; col++) {
          const x = col * cellWidth;
          const baseY = row * cellHeight;
          
          // Create flowing wave pattern
          const wave1 = Math.sin(col * 0.4 + time) * 15;
          const wave2 = Math.cos(row * 0.25 + time * 0.7) * 12;
          const wave3 = Math.sin((col + row) * 0.2 + time * 1.5) * 8;
          
          const y = baseY + wave1 + wave2 + wave3;
          
          points[row][col] = { x, y };
        }
      }

      // Draw wireframe
      ctx.strokeStyle = 'rgba(250, 112, 112, 0.15)';
      ctx.lineWidth = 1;

      // Draw horizontal lines
      for (let row = 0; row < rows; row++) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const point = points[row][col];
          if (col === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let col = 0; col < cols; col++) {
        ctx.beginPath();
        for (let row = 0; row < rows; row++) {
          const point = points[row][col];
          if (row === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
        ctx.stroke();
      }

      // Draw nodes at intersections
      ctx.fillStyle = 'rgba(250, 112, 112, 0.3)';
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const point = points[row][col];
          ctx.beginPath();
          ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Delay animation start slightly for better performance
    setTimeout(() => animate(), 100);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="content-background" />;
};

export default ContentBackground;
