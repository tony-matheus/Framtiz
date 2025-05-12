'use client';

import { useEffect, useRef } from 'react';

export class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    colors: string[]
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width) this.x = 0;
    else if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    else if (this.y < 0) this.y = this.canvas.height;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.size, this.size);
    this.ctx.fill();
  }
}

export function useCanvasEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // const darkModeColors = ['#74a309', '#ef467e', '#9c98f0', '#cb2c66'];
    const colors = ['#8b5cf6', '#10b981', '#6366f1', '#34d399'];
    // const colors = ['#74a309', '#ef467e', '#9c98f0', '#cb2c66'];
    const particles: Particle[] = Array.from(
      { length: 30 },
      () => new Particle(canvas, ctx, colors)
    );

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    let glitchInterval: NodeJS.Timeout | null = null;
    let isGlitching = false;

    const startGlitchEffect = () => {
      glitchInterval = setInterval(() => {
        isGlitching = Math.random() > 0.7;
        if (isGlitching) {
          setTimeout(() => {
            isGlitching = false;
          }, 200);
        }
      }, 3000);
    };

    const drawGlitch = () => {
      if (!isGlitching) return;
      const numLines = Math.floor(Math.random() * 5) + 3;
      for (let i = 0; i < numLines; i++) {
        const y = Math.random() * canvas.height;
        const width = Math.random() * 100 + 50;
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        }, 0.1)`;
        ctx.fillRect(0, y, width, Math.random() * 5 + 1);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawGlitch();
      requestAnimationFrame(animate);
    };

    animate();
    startGlitchEffect();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (glitchInterval) clearInterval(glitchInterval);
    };
  }, []);

  return canvasRef;
}
