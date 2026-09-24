"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Utensils, HeartHandshake, BookOpen } from "lucide-react";

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
  return (
    <section className="relative w-full min-h-[460px] md:min-h-[520px] rounded-[2.5rem] bg-gradient-to-b from-[#FFF3E3] via-[#FFE8D6] to-[#FFF9F2] border border-[#F3A261]/20 shadow-2xl shadow-[#E07A5F]/10 overflow-hidden flex flex-col items-center justify-between p-6 md:p-10 mb-10">
      
      {/* 1. Fondo vivo: Ondas de calor y partículas suaves */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 w-96 h-96 rounded-full bg-gradient-to-tr from-[#F3A261]/40 to-[#E07A5F]/20 blur-3xl pointer-events-none"
      />

      {/* 2. Encabezado con tipografía cinemática */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E07A5F]/20 text-xs font-bold text-[#E07A5F] mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F3A261] animate-spin" />
          <span>Panadería Mágica de Autor</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl md:text-5xl font-black tracking-tight text-[#2C2420] leading-tight"
        >
          Masa lenta, aroma tibio y la magia de{" "}
          <span className="text-[#E07A5F] underline decoration-[#F3A261]/40 decoration-wavy">
            Io
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-3 text-xs md:text-sm text-[#2C2420]/70 max-w-md mx-auto leading-relaxed"
        >
          Aprende los secretos del trigo, la mantequilla pomada y el punto exacto de dorado en una cocina que respira.
        </motion.p>
      </div>

      {/* 3. Escenario central: Representación artística viva de Io */}
      <div className="relative z-10 my-4 flex items-center justify-center">
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-center"
        >
          {/* Aura cálida tras Io */}
          <div className="absolute w-44 h-44 rounded-full bg-[#F3A261]/25 blur-2xl -z-10" />

          {/* Avatar / Tarjeta de Io con estilo Glassmorphism */}
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white bg-gradient-to-tr from-[#F8D5B8] to-[#FFF9F2] shadow-xl flex items-center justify-center relative overflow-hidden group">
            {/* Aquí situaremos la ilustración final de Io; por ahora, una composición estilizada */}
            <div className="text-center p-3">
              <span className="text-4xl md:text-5xl block animate-bounce">👩🏻‍🍳</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#E07A5F] mt-1 block">
                Io la Panadera
              </span>
            </div>

            {/* Micro-humo interactivo saliendo del delantal de Io */}
            <motion.div
              animate={{ y: [-5, -25], opacity: [0, 0.7, 0], scale: [0.8, 1.2] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
              className="absolute top-4 text-xs select-none pointer-events-none text-white/90"
            >
              ♨️
            </motion.div>
          </div>

          {/* Badge reactivo al estado actual */}
          <motion.div
            key={activeTab}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-3 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#F3A261]/30 shadow-md text-[11px] font-bold text-[#2C2420]"
          >
            {activeTab === "recetas" && "🥖 Amasando delicias hoy"}
            {activeTab === "historia" && "📖 Anotando notas en su diario"}
            {activeTab === "apoyar" && "☕ Recibiendo harina y cariño"}
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Navegación en pastilla flotante elástica (estilo MotionSites) */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl p-1.5 rounded-full border border-white/80 shadow-lg shadow-[#E07A5F]/5 flex items-center justify-between">
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