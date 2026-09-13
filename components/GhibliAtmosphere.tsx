"use client";

import { useEffect, useRef } from "react";

export default function GhibliAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Sistema de partículas sutiles (Motes de harina / Polvo dorado flotante)
    const totalParticles = 35;
    const particles = Array.from({ length: totalParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2, // Flotan hacia arriba como vapor
      opacity: Math.random() * 0.4 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.008;

      // 1. Capas de Ondas Suaves (Simulación de pliegues de masa y mantequilla tibia)
      const waveConfigs = [
        { yOffset: height * 0.85, amplitude: 35, frequency: 0.0018, color: "rgba(245, 235, 225, 0.45)", speed: step * 0.8 },
        { yOffset: height * 0.90, amplitude: 45, frequency: 0.0012, color: "rgba(243, 162, 97, 0.07)", speed: -step * 0.6 },
        { yOffset: height * 0.94, amplitude: 25, frequency: 0.0025, color: "rgba(226, 135, 113, 0.08)", speed: step * 1.2 },
      ];

      waveConfigs.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 10) {
          const y = wave.yOffset + Math.sin(x * wave.frequency + wave.speed) * wave.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // 2. Partículas Flotantes Orgánicas
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        // Si sube al techo, vuelve a renacer abajo
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const dynamicOpacity = Math.max(0.1, p.opacity + Math.sin(p.pulse) * 0.15);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 162, 97, ${dynamicOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(243, 162, 97, 0.3)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}