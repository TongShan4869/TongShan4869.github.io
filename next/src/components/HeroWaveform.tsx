"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface Wave {
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  opacity: number;
  lineWidth: number;
}

const WAVES: Wave[] = [
  { amplitude: 40, frequency: 0.003, speed: 0.4, phase: 0, opacity: 0.08, lineWidth: 1.5 },
  { amplitude: 55, frequency: 0.005, speed: 0.6, phase: 1.2, opacity: 0.12, lineWidth: 1.8 },
  { amplitude: 30, frequency: 0.007, speed: 0.8, phase: 2.5, opacity: 0.18, lineWidth: 1.2 },
  { amplitude: 45, frequency: 0.004, speed: 1.0, phase: 3.8, opacity: 0.25, lineWidth: 1.4 },
];

const MOUSE_RADIUS = 200;

function gaussian(dist: number, radius: number): number {
  return Math.exp(-(dist * dist) / (2 * (radius / 3) * (radius / 3)));
}

export default function HeroWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const drawWaves = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);
      const centerY = height * 0.5;
      const mouse = mouseRef.current;

      for (const wave of WAVES) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(78, 197, 212, ${wave.opacity})`;
        ctx.lineWidth = wave.lineWidth;

        for (let x = 0; x <= width; x += 2) {
          let amp = wave.amplitude;

          // Mouse distortion
          if (mouse) {
            const dx = x - mouse.x;
            const dy =
              centerY +
              amp * Math.sin(x * wave.frequency + time * wave.speed + wave.phase) -
              mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
              amp += 25 * gaussian(dist, MOUSE_RADIUS);
            }
          }

          const y =
            centerY + amp * Math.sin(x * wave.frequency + time * wave.speed + wave.phase);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to parent
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      // Draw static frame immediately after resize
      drawWaves(ctx, rect.width, rect.height, 0);
    };

    resize();

    const parent = canvas.parentElement;
    let observer: ResizeObserver | undefined;
    if (parent) {
      observer = new ResizeObserver(resize);
      observer.observe(parent);
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    if (!prefersReducedMotion) {
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;
        const parentEl = canvas.parentElement;
        if (!parentEl) return;
        const rect = parentEl.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawWaves(ctx, rect.width, rect.height, elapsed);
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer?.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion, drawWaves]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
