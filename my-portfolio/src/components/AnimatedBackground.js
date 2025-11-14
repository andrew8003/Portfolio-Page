import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const linesRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLines();
    };

    const initLines = () => {
      linesRef.current = [];
      const lineCount = 8;
      
      for (let i = 0; i < lineCount; i++) {
        linesRef.current.push({
          baseY: (canvas.height / lineCount) * i,
          offset: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.01;
      const time = timeRef.current;

      // Draw flowing lines
      linesRef.current.forEach((line, index) => {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0)');
        gradient.addColorStop(0.5, `rgba(102, 126, 234, ${0.15 + index * 0.02})`);
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x <= canvas.width; x += 20) {
          const wave1 = Math.sin((x * 0.005) + (time * line.speed) + line.offset) * 30;
          const wave2 = Math.sin((x * 0.003) + (time * line.speed * 0.7) + line.offset + 1) * 20;
          const y = line.baseY + wave1 + wave2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;
