"use client";

import { useState } from "react";
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
  // Valores del mouse para el efecto 3D Parallax estilo MotionSites
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Físicas suaves de resorte (spring)
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transformaciones de ángulo e inclinación según la posición del cursor
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

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
      className="relative w-full rounded-[2.5rem] bg-gradient-to-b from-[#FFF3E3] via-[#FFE8D6] to-[#FFF9F2] border border-[#F3A261]/25 shadow-2xl shadow-[#E07A5F]/10 overflow-hidden flex flex-col items-center justify-between p-6 md:p-10 mb-10 perspective-[1000px]"
    >
      
      {/* 1. Fondo vivo: Resplandor de calor pulsante */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#F3A261]/40 to-[#E07A5F]/20 blur-3xl pointer-events-none"
      />

      {/* 2. Textos del Lobby */}
      <div className="relative z-20 text-center max-w-2xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E07A5F]/20 text-xs font-bold text-[#E07A5F] mb-3 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F3A261] animate-spin" />
          <span>El Mostrador de Io</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl md:text-5xl font-black tracking-tight text-[#2C2420] leading-tight"
        >
          Pan crujiente, alma lenta y la calidez de{" "}
          <span className="text-[#E07A5F] underline decoration-[#F3A261]/40 decoration-wavy">
            Io
          </span>
        </motion.h2>
      </div>

      {/* 3. Escenario 3D Interactivo con Io */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 my-6 w-full max-w-lg aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white/90 shadow-2xl bg-[#FFE4CE] flex items-end justify-center group"
      >
        {/* Imagen principal de Io generada por Morgan */}
        <Image
          src="/images/io-baker.png"
          alt="Io la Panadera en el mostrador"
          fill
          priority
          className="object-cover object-center filter contrast-[1.03] brightness-[1.01] transition-transform duration-700 group-hover:scale-105"
        />

        {/* Viñeta cálida en los bordes para fundir la imagen con la interfaz */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(255,243,227,0.7)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/40 via-transparent to-transparent pointer-events-none" />

        {/* Badge flotante dinámico */}
        <div className="absolute bottom-4 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/80 shadow-md flex items-center gap-2 text-xs font-extrabold text-[#2C2420]">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          {activeTab === "recetas" && "¡Hojaldres recién salidos!"}
          {activeTab === "historia" && "Revisando el cuaderno de notas"}
          {activeTab === "apoyar" && "Agradeciendo cada cafecito"}
        </div>
      </motion.div>

      {/* 4. Barra de navegación elástica */}
      <div className="relative z-20 w-full max-w-md bg-white/80 backdrop-blur-xl p-1.5 rounded-full border border-white/90 shadow-lg shadow-[#E07A5F]/5 flex items-center justify-between">
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