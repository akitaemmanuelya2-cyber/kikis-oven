"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Utensils, HeartHandshake, BookOpen } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onSelectTab: (tab: "recetas" | "historia" | "apoyar") => void;
  activeTab: "recetas" | "historia" | "apoyar";
}

const TABS = [
  { id: "recetas", label: "Horno & Recetas", icon: Utensils },
  { id: "historia", label: "El Rincón de Io", icon: BookOpen },
  { id: "apoyar", label: "Invítale un Café a Io", icon: HeartHandshake },
] as const;

export default function HeroInteractive({ onSelectTab, activeTab }: HeroProps) {
  // Valores reactivos del mouse para el Parallax orgánico
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Físicas suaves de resorte (spring)
  const springConfig = { damping: 30, stiffness: 140 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Movimiento exclusivo para Io (ella se mueve e inclina sutilmente)
  const ioRotate = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const ioTranslateX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const ioTranslateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  // Movimiento opuesto sutil para los textos (sensación de profundidad 3D)
  const textTranslateX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[82vh] flex flex-col justify-between items-center overflow-hidden pt-4 pb-8 select-none"
    >
      {/* 1. Fondo Atmosférico Cálido (Sin bordes rígidos) */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#F3A261]/35 via-[#E07A5F]/20 to-transparent blur-3xl pointer-events-none -z-10"
      />

      {/* 2. Textos Flotantes (Profundidad superior) */}
      <motion.div 
        style={{ x: textTranslateX }}
        className="relative z-10 text-center max-w-2xl px-4 pointer-events-none mt-2"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E07A5F]/20 text-xs font-bold text-[#E07A5F] mb-3 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F3A261] animate-spin" />
          <span>El Mostrador de Autor</span>
        </motion.div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#2C2420] leading-[1.1]">
          Pan crujiente, alma lenta y la calidez de{" "}
          <span className="text-[#E07A5F] underline decoration-[#F3A261]/50 decoration-wavy">
            Io
          </span>
        </h2>
      </motion.div>

      {/* 3. Escenario de Io: Personaje Recortado a Escala Real */}
      <motion.div
        style={{
          rotate: ioRotate,
          x: ioTranslateX,
          y: ioTranslateY,
        }}
        className="relative w-full max-w-2xl h-[440px] md:h-[540px] lg:h-[600px] flex items-end justify-center pointer-events-none z-20 my-auto"
      >
        {/* Silueta PNG de Io */}
        <div className="relative w-full h-full drop-shadow-[0_20px_35px_rgba(224,122,95,0.22)]">
          <Image
            src="/images/io-cutout.png"
            alt="Io la Panadera"
            fill
            priority
            className="object-contain object-bottom filter contrast-[1.02] brightness-[1.01]"
          />
        </div>

        {/* Badge flotante sutil a los pies de la bandeja */}
        <div className="absolute bottom-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/80 shadow-lg flex items-center gap-2 text-xs font-extrabold text-[#2C2420] pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          {activeTab === "recetas" && "¡Hojaldres recién horneados!"}
          {activeTab === "historia" && "Anotando secretos de masa madre"}
          {activeTab === "apoyar" && "Un cafecito para el taller"}
        </div>
      </motion.div>

      {/* 4. Navegación en Pastilla Flotante (Base del Escenario) */}
      <div className="relative z-30 w-full max-w-md bg-white/85 backdrop-blur-xl p-1.5 rounded-full border border-white/90 shadow-xl shadow-[#E07A5F]/10 flex items-center justify-between">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex-1 py-2.5 px-3 rounded-full text-xs font-extrabold transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                isActive ? "text-white" : "text-[#2C2420]/70 hover:text-[#2C2420]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="heroActivePill"
                  className="absolute inset-0 bg-[#E07A5F] rounded-full shadow-md shadow-[#E07A5F]/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#E07A5F]"}`} />
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}