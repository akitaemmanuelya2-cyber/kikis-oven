"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, Flame, Play, ChevronRight, CheckCircle2 } from "lucide-react";
import { RECETAS_BRUJITOS, Receta } from "../data/recipes";

export default function Home() {
  const [recetaActiva, setRecetaActiva] = useState<Receta>(RECETAS_BRUJITOS[0]);
  const [pasoIndex, setPasoIndex] = useState(0);

  const pasoActual = recetaActiva.pasos[pasoIndex];
  const esUltimoPaso = pasoIndex === recetaActiva.pasos.length - 1;

  const handleSiguientePaso = () => {
    if (!esUltimoPaso) {
      setPasoIndex((prev) => prev + 1);
    } else {
      setPasoIndex(0);
    }
  };

  return (
    <main className="min-h-screen bg-ghibli-cream text-ghibli-ink px-4 py-8 md:px-12 selection:bg-ghibli-pumpkin/30">
      {/* Encabezado */}
      <header className="max-w-6xl mx-auto flex items-center justify-between pb-8 border-b border-ghibli-ink/10">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-11 h-11 rounded-2xl bg-ghibli-pumpkin/30 flex items-center justify-center text-ghibli-ink cursor-pointer shadow-sm"
          >
            <Sparkles className="w-6 h-6 text-ghibli-pumpkin" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Kiki's Oven</h1>
            <p className="text-xs text-ghibli-ink/60 font-medium">Recetario Pastel & Animado</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-ghibli-sand shadow-sm text-xs font-semibold text-ghibli-pumpkin">
          <span className="w-2 h-2 rounded-full bg-ghibli-pumpkin animate-ping" />
          Temporada de Brujitos 🎃
        </div>
      </header>

      {/* Píldoras para cambiar de receta */}
      <div className="max-w-6xl mx-auto mt-8 flex gap-3 overflow-x-auto pb-2">
        {RECETAS_BRUJITOS.map((receta) => (
          <button
            key={receta.id}
            onClick={() => {
              setRecetaActiva(receta);
              setPasoIndex(0);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
              recetaActiva.id === receta.id
                ? "bg-ghibli-pumpkin text-white border-ghibli-pumpkin shadow-md shadow-ghibli-pumpkin/20"
                : "bg-white/70 text-ghibli-ink/70 border-ghibli-sand hover:bg-white"
            }`}
          >
            {receta.titulo}
          </button>
        ))}
      </div>

      {/* Grid del Visualizador */}
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lado Izquierdo: Descripción y Lista de Pasos */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.div
            key={recetaActiva.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs uppercase tracking-widest font-bold text-ghibli-terracotta mb-2 inline-block">
              {recetaActiva.badge}
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-ghibli-ink">
              {recetaActiva.titulo}
            </h2>
            <p className="text-sm text-ghibli-ink/70 mt-2 leading-relaxed">
              {recetaActiva.subtitulo}
            </p>

            <div className="flex items-center gap-3 mt-4 text-xs font-medium text-ghibli-ink/80">
              <div className="flex items-center gap-1.5 bg-ghibli-sand px-3 py-1.5 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-ghibli-terracotta" />
                {recetaActiva.tiempo}
              </div>
              <div className="flex items-center gap-1.5 bg-ghibli-sand px-3 py-1.5 rounded-xl">
                <Flame className="w-3.5 h-3.5 text-ghibli-terracotta" />
                {recetaActiva.dificultad}
              </div>
            </div>
          </motion.div>

          {/* Selector de Pasos */}
          <div className="flex flex-col gap-2.5 mt-2">
            <span className="text-xs font-bold text-ghibli-ink/50 uppercase tracking-wider">
              Pasos de preparación
            </span>
            {recetaActiva.pasos.map((paso, idx) => (
              <motion.button
                key={paso.numero}
                onClick={() => setPasoIndex(idx)}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  pasoIndex === idx
                    ? "bg-white border-ghibli-pumpkin/60 shadow-md shadow-ghibli-pumpkin/10"
                    : "bg-ghibli-sand/50 border-transparent hover:bg-white/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ghibli-terracotta">
                    Paso 0{paso.numero}
                  </span>
                  {pasoIndex === idx && (
                    <motion.div layoutId="activeStepIndicator">
                      <Play className="w-3.5 h-3.5 fill-ghibli-pumpkin text-ghibli-pumpkin" />
                    </motion.div>
                  )}
                </div>
                <p className="text-sm font-semibold mt-1 text-ghibli-ink">
                  {paso.accion}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lado Derecho: Cinema de Animación Ghibli */}
        <div className="lg:col-span-7">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-ghibli-sand to-white border border-ghibli-sand shadow-xl shadow-ghibli-ink/5 flex flex-col justify-between p-6">
            
            {/* Cabecera del Cinema */}
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-bold bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-ghibli-ink/70">
                Paso {pasoIndex + 1} de {recetaActiva.pasos.length}
              </span>
              <button
                onClick={handleSiguientePaso}
                className="flex items-center gap-1 text-xs font-bold bg-ghibli-pumpkin text-white px-3 py-1.5 rounded-full hover:bg-ghibli-terracotta transition-colors shadow-sm cursor-pointer"
              >
                {esUltimoPaso ? "Reiniciar" : "Siguiente"}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Canvas de Animación (Micro-loop Ghibli) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${recetaActiva.id}-${pasoActual?.numero}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="w-full h-full flex flex-col items-center justify-center text-center p-8"
                >
                  <div
                    className="w-32 h-32 rounded-full border-4 border-dashed flex items-center justify-center mb-4 animate-[spin_20s_linear_infinite]"
                    style={{ borderColor: pasoActual?.colorAcento || "#F3A261" }}
                  >
                    <Sparkles
                      className="w-10 h-10 animate-bounce"
                      style={{ color: pasoActual?.colorAcento || "#F3A261" }}
                    />
                  </div>
                  
                  <span className="text-base font-bold text-ghibli-ink/80">
                    {pasoActual?.accion}
                  </span>
                  <span className="text-xs text-ghibli-ink/40 mt-1 font-mono tracking-wide">
                    [ Micro-Loop Ghibli • Cámara Lenta ]
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Banner de Instrucción Táctil */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${recetaActiva.id}-${pasoActual?.numero}-detalle`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-md"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-ghibli-pumpkin" />
                  <span className="text-xs font-black uppercase text-ghibli-pumpkin tracking-wider">
                    En la cocina
                  </span>
                </div>
                <p className="text-sm text-ghibli-ink/90 leading-relaxed font-medium">
                  {pasoActual?.detalle}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </main>
  );
}