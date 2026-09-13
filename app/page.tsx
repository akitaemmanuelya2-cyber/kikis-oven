"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, Flame, Play, ChevronRight, CheckCircle2, Scale, ChefHat } from "lucide-react";
import { RECETAS_BRUJITOS, Receta } from "../data/recipes";
import GhibliAtmosphere from "../components/GhibliAtmosphere";

export default function Home() {
  const [recetaActiva, setRecetaActiva] = useState<Receta>(RECETAS_BRUJITOS[0]);
  const [pasoIndex, setPasoIndex] = useState(0);
  const [porcionesSeleccionadas, setPorcionesSeleccionadas] = useState<number>(12);
  const [vistaActiva, setVistaActiva] = useState<"pasos" | "ingredientes">("pasos");

  const pasoActual = recetaActiva.pasos[pasoIndex];
  const esUltimoPaso = pasoIndex === recetaActiva.pasos.length - 1;

  const factorEscala = porcionesSeleccionadas / recetaActiva.porcionesBase;

  const handleSiguientePaso = () => {
    if (!esUltimoPaso) {
      setPasoIndex((prev) => prev + 1);
    } else {
      setPasoIndex(0);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9F2] text-[#2C2420] px-4 py-8 md:px-12 selection:bg-[#E07A5F]/20 relative">
      <GhibliAtmosphere />
      {/* Header */}
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

      {/* Selector de Recetas */}
      <div className="max-w-6xl mx-auto mt-8 flex gap-3 overflow-x-auto pb-2">
        {RECETAS_BRUJITOS.map((receta) => (
          <button
            key={receta.id}
            onClick={() => {
              setRecetaActiva(receta);
              setPasoIndex(0);
              setPorcionesSeleccionadas(receta.porcionesBase);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border cursor-pointer ${
              recetaActiva.id === receta.id
                ? "bg-ghibli-pumpkin text-white border-ghibli-pumpkin shadow-md shadow-ghibli-pumpkin/20"
                : "bg-white/70 text-ghibli-ink/70 border-ghibli-sand hover:bg-white"
            }`}
          >
            {receta.titulo}
          </button>
        ))}
      </div>

      {/* Grid Principal */}
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lado Izquierdo: Ficha técnica y Selector */}
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

          {/* Switch Pasos vs Ingredientes */}
          <div className="flex items-center gap-2 bg-ghibli-sand/60 p-1.5 rounded-2xl">
            <button
              onClick={() => setVistaActiva("pasos")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                vistaActiva === "pasos"
                  ? "bg-white text-ghibli-ink shadow-sm"
                  : "text-ghibli-ink/60 hover:text-ghibli-ink"
              }`}
            >
              <ChefHat className="w-4 h-4 text-ghibli-pumpkin" />
              Pasos ({recetaActiva.pasos.length})
            </button>
            <button
              onClick={() => setVistaActiva("ingredientes")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                vistaActiva === "ingredientes"
                  ? "bg-white text-ghibli-ink shadow-sm"
                  : "text-ghibli-ink/60 hover:text-ghibli-ink"
              }`}
            >
              <Scale className="w-4 h-4 text-ghibli-terracotta" />
              Ingredientes ({recetaActiva.ingredientes.length})
            </button>
          </div>

          {/* Contenido Dinámico */}
          <AnimatePresence mode="wait">
            {vistaActiva === "pasos" ? (
              <motion.div
                key="vista-pasos"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-2.5"
              >
                {recetaActiva.pasos.map((paso, idx) => (
                  <motion.button
                    key={paso.numero}
                    onClick={() => setPasoIndex(idx)}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
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
              </motion.div>
            ) : (
              <motion.div
                key="vista-ingredientes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-4 bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-ghibli-sand"
              >
                <div className="flex items-center justify-between pb-3 border-b border-ghibli-ink/10">
                  <span className="text-xs font-bold text-ghibli-ink/70">
                    Ajustar porciones:
                  </span>
                  <div className="flex gap-2">
                    {[6, 12, 24].map((cant) => (
                      <button
                        key={cant}
                        onClick={() => setPorcionesSeleccionadas(cant)}
                        className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                          porcionesSeleccionadas === cant
                            ? "bg-ghibli-terracotta text-white shadow-sm"
                            : "bg-ghibli-sand/80 text-ghibli-ink/70 hover:bg-ghibli-sand"
                        }`}
                      >
                        {cant}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {recetaActiva.ingredientes.map((ing, i) => {
                    const cantidadCalculada = Math.round(ing.cantidadBase * factorEscala * 10) / 10;
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm py-1.5 border-b border-ghibli-sand/50 last:border-0"
                      >
                        <span className="text-ghibli-ink/80 font-medium">{ing.nombre}</span>
                        <span className="font-mono font-bold text-ghibli-pumpkin">
                          {cantidadCalculada} {ing.unidad}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lado Derecho: Cinema de Animación Ghibli con Video Vivo */}
        <div className="lg:col-span-7">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-ghibli-sand to-white border border-ghibli-sand shadow-2xl shadow-ghibli-pumpkin/5 flex flex-col justify-between p-6 group">
            
            {/* Cabecera del Cinema */}
            <div className="flex items-center justify-between z-20">
              <span className="text-xs font-bold bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-ghibli-ink/80 border border-white/50 shadow-sm">
                Paso {pasoIndex + 1} de {recetaActiva.pasos.length}
              </span>
              <button
                onClick={handleSiguientePaso}
                className="flex items-center gap-1.5 text-xs font-bold bg-ghibli-pumpkin text-white px-4 py-1.5 rounded-full hover:bg-ghibli-terracotta transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
              >
                {esUltimoPaso ? "Reiniciar" : "Siguiente"}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visor Multimedia Cinematográfico */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-ghibli-sand">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${recetaActiva.id}-${pasoActual?.numero}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  {pasoActual?.videoUrl ? (
                    <video
                      key={pasoActual.videoUrl}
                      src={pasoActual.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] saturate-[1.1]"
                    />
                  ) : (
                    /* Fallback artístico */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-ghibli-sand/60 to-white text-ghibli-ink/30">
                      <Sparkles className="w-12 h-12 mb-2 animate-pulse text-ghibli-pumpkin" />
                      <span className="text-xs font-mono">[ Ilustración en preparación ]</span>
                    </div>
                  )}

                  {/* Viñeta de Acuarela Orgánica: funde los bordes del video en el lienzo cálido */}
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(255,249,240,0.85)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ghibli-cream/90 via-transparent to-black/10 pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Banner de Instrucción Flotante */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${recetaActiva.id}-${pasoActual?.numero}-detalle`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-20 bg-white/85 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/70 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-ghibli-pumpkin" />
                  <span className="text-xs font-black uppercase text-ghibli-pumpkin tracking-wider">
                    {pasoActual?.accion}
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