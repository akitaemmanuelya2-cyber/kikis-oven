"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Clock, Flame, Play, ChevronRight, CheckCircle2, 
  Scale, ChefHat, PartyPopper, RotateCcw, ThermometerSun,
  Heart, Coffee, BookOpen
} from "lucide-react";
import { RECETAS_BRUJITOS, Receta } from "../data/recipes";
import GhibliAtmosphere from "../components/GhibliAtmosphere";
import HeroInteractive from "../components/HeroInteractive";

export default function Home() {
  const [pestanaPrincipal, setPestanaPrincipal] = useState<"recetas" | "historia" | "apoyar">("recetas");
  const [recetaActiva, setRecetaActiva] = useState<Receta>(RECETAS_BRUJITOS[0]);
  const [pasoIndex, setPasoIndex] = useState(0);
  const [porcionesSeleccionadas, setPorcionesSeleccionadas] = useState<number>(12);
  const [vistaActiva, setVistaActiva] = useState<"pasos" | "ingredientes">("pasos");
  const [celebrando, setCelebrando] = useState(false);

  const pasoActual = recetaActiva.pasos[pasoIndex];
  const esUltimoPaso = pasoIndex === recetaActiva.pasos.length - 1;
  const factorEscala = porcionesSeleccionadas / recetaActiva.porcionesBase;

  const handleSiguientePaso = () => {
    if (!esUltimoPaso) {
      setPasoIndex((prev) => prev + 1);
    } else {
      setCelebrando(true);
    }
  };

  const reiniciarReceta = () => {
    setCelebrando(false);
    setPasoIndex(0);
  };

  return (
    <main className="min-h-screen bg-[#FFF9F2] text-[#2C2420] px-4 py-8 md:px-12 selection:bg-[#E07A5F]/20 relative overflow-x-hidden">
      <GhibliAtmosphere />
      
      {/* Encabezado */}
      <header className="max-w-6xl mx-auto flex items-center justify-between pb-8 border-b border-ghibli-ink/10 relative z-10 mb-8">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-11 h-11 rounded-2xl bg-ghibli-pumpkin/30 flex items-center justify-center text-ghibli-ink cursor-pointer shadow-sm shadow-ghibli-pumpkin/10"
          >
            <Sparkles className="w-6 h-6 text-ghibli-pumpkin animate-pulse" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-1.5">
              Kiki's Oven
              <span className="inline-block animate-bounce text-sm">✨</span>
            </h1>
            <p className="text-xs text-ghibli-ink/60 font-medium">Recetario Pastel & Animado con Io</p>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-ghibli-sand shadow-sm text-xs font-semibold text-ghibli-pumpkin"
        >
          <span className="w-2 h-2 rounded-full bg-ghibli-pumpkin animate-ping" />
          Temporada de Brujitos 🎃
        </motion.div>
      </header>

      {/* Hero Interactivo de Io (Estilo MotionSites) */}
      <div className="max-w-6xl mx-auto relative z-10">
        <HeroInteractive 
          activeTab={pestanaPrincipal} 
          onSelectTab={setPestanaPrincipal} 
        />
      </div>

      {/* CONTENIDO SEGÚN LA PESTAÑA ACTIVA */}
      <AnimatePresence mode="wait">
        {pestanaPrincipal === "recetas" && (
          <motion.div
            key="tab-recetas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {/* Selector de Recetas */}
            <div className="max-w-6xl mx-auto flex gap-3 overflow-x-auto pb-2 relative z-10">
              {RECETAS_BRUJITOS.map((receta) => (
                <button
                  key={receta.id}
                  onClick={() => {
                    setRecetaActiva(receta);
                    setPasoIndex(0);
                    setCelebrando(false);
                    setPorcionesSeleccionadas(receta.porcionesBase);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border cursor-pointer ${
                    recetaActiva.id === receta.id
                      ? "bg-ghibli-pumpkin text-white border-ghibli-pumpkin shadow-md shadow-ghibli-pumpkin/25 scale-[1.02]"
                      : "bg-white/70 text-ghibli-ink/70 border-ghibli-sand hover:bg-white hover:text-ghibli-ink"
                  }`}
                >
                  {receta.titulo}
                </button>
              ))}
            </div>

            {/* Grid Principal del Recetario */}
            <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
              
              {/* Lado Izquierdo: Ficha técnica y Selector */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <motion.div
                  key={recetaActiva.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs uppercase tracking-widest font-bold text-ghibli-terracotta mb-2 inline-block bg-ghibli-sand/40 px-2.5 py-0.5 rounded-md">
                    {recetaActiva.badge}
                  </span>
                  <h2 className="text-3xl font-extrabold leading-tight text-ghibli-ink">
                    {recetaActiva.titulo}
                  </h2>
                  <p className="text-sm text-ghibli-ink/70 mt-2 leading-relaxed">
                    {recetaActiva.subtitulo}
                  </p>

                  <div className="flex items-center gap-3 mt-4 text-xs font-medium text-ghibli-ink/80">
                    <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-ghibli-sand px-3 py-1.5 rounded-xl shadow-xs">
                      <Clock className="w-3.5 h-3.5 text-ghibli-terracotta" />
                      {recetaActiva.tiempo}
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-ghibli-sand px-3 py-1.5 rounded-xl shadow-xs">
                      <Flame className="w-3.5 h-3.5 text-ghibli-terracotta" />
                      {recetaActiva.dificultad}
                    </div>
                    {esUltimoPaso && (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1.5 bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-xl shadow-xs font-bold"
                      >
                        <ThermometerSun className="w-3.5 h-3.5 animate-spin" />
                        180°C Activo ♨️
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Switch Pasos vs Ingredientes */}
                <div className="flex items-center gap-2 bg-ghibli-sand/60 p-1.5 rounded-2xl border border-ghibli-sand/80">
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

                {/* Contenido Dinámico (Pasos / Ingredientes) */}
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
                          onClick={() => {
                            setPasoIndex(idx);
                            setCelebrando(false);
                          }}
                          whileHover={{ x: 6 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                            pasoIndex === idx
                              ? "bg-white border-ghibli-pumpkin/60 shadow-md shadow-ghibli-pumpkin/15 ring-2 ring-ghibli-pumpkin/10"
                              : "bg-white/40 border-transparent hover:bg-white/70"
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
                      className="flex flex-col gap-4 bg-white/75 backdrop-blur-sm p-5 rounded-2xl border border-ghibli-sand shadow-sm"
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

              {/* Lado Derecho: Cinema de Animación Ghibli */}
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-ghibli-sand to-white border border-ghibli-sand shadow-2xl shadow-ghibli-pumpkin/10 flex flex-col justify-between p-6 group">
                  
                  <div className="flex items-center justify-between z-20">
                    <span className="text-xs font-bold bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-ghibli-ink/80 border border-white/60 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ghibli-pumpkin animate-pulse" />
                      Paso {pasoIndex + 1} de {recetaActiva.pasos.length}
                    </span>

                    <button
                      onClick={handleSiguientePaso}
                      className="flex items-center gap-1.5 text-xs font-bold bg-ghibli-pumpkin text-white px-4 py-1.5 rounded-full hover:bg-ghibli-terracotta transition-all shadow-md shadow-ghibli-pumpkin/20 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      {esUltimoPaso ? "¡Completar y servir!" : "Siguiente"}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="absolute inset-0 z-0 overflow-hidden bg-ghibli-sand">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${recetaActiva.id}-${pasoActual?.numero}`}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
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
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFEBD0] via-[#FFF3E4] to-[#FDE1C7] text-ghibli-ink p-8 text-center relative overflow-hidden">
                            <motion.div 
                              animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                              className="w-20 h-20 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center mb-4 shadow-lg border border-orange-200/50"
                            >
                              <Flame className="w-10 h-10 text-ghibli-pumpkin animate-pulse" />
                            </motion.div>
                            <h3 className="text-xl font-black text-ghibli-ink mb-1">
                              ¡El horno está en su punto! ♨️
                            </h3>
                            <p className="text-xs text-ghibli-ink/70 max-w-xs leading-relaxed">
                              Aroma a canela y calabaza llenando la cocina. Las galletas doran sus orillas a 180°C.
                            </p>
                            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400/10 via-transparent to-transparent animate-pulse" />
                          </div>
                        )}

                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(255,249,240,0.85)]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ghibli-cream/30 via-transparent to-black/10 pointer-events-none" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="relative z-20 flex justify-end pointer-events-none mt-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${recetaActiva.id}-${pasoActual?.numero}-detalle`}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-auto w-full max-w-xs bg-white/90 backdrop-blur-md p-3.5 md:p-4 rounded-2xl border border-white/80 shadow-xl"
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-ghibli-pumpkin shrink-0" />
                          <span className="text-[11px] font-black uppercase text-ghibli-pumpkin tracking-wider truncate">
                            {pasoActual?.accion}
                          </span>
                        </div>
                        <p className="text-xs text-ghibli-ink/90 leading-relaxed font-medium">
                          {pasoActual?.detalle}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Modal de Celebración */}
                  <AnimatePresence>
                    {celebrando && (
                      <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-[#2C2420]/40 flex items-center justify-center p-6"
                      >
                        <motion.div
                          initial={{ scale: 0.8, y: 20, opacity: 0 }}
                          animate={{ scale: 1, y: 0, opacity: 1 }}
                          exit={{ scale: 0.8, y: 20, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className="bg-white/95 border-2 border-ghibli-pumpkin/40 rounded-3xl p-6 text-center max-w-sm shadow-2xl relative overflow-hidden"
                        >
                          <div className="w-14 h-14 bg-ghibli-pumpkin/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-ghibli-pumpkin">
                            <PartyPopper className="w-7 h-7 animate-bounce" />
                          </div>

                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-ghibli-terracotta bg-ghibli-sand/60 px-3 py-1 rounded-full">
                            ¡Receta Completada! 🥖✨
                          </span>

                          <h3 className="text-2xl font-black text-ghibli-ink mt-3 mb-1">
                            ¡Ya están listas!
                          </h3>
                          <p className="text-sm font-semibold text-ghibli-pumpkin">
                            ¡A disfrutar calientitas! ♨️
                          </p>

                          <p className="text-xs text-ghibli-ink/70 mt-3 mb-5 leading-relaxed">
                            El aroma inunda toda la panadería. Sírvelas con una taza de té tibio o chocolate.
                          </p>

                          <div className="flex gap-2.5 justify-center">
                            <button
                              onClick={reiniciarReceta}
                              className="flex items-center gap-1.5 text-xs font-bold bg-ghibli-sand/80 text-ghibli-ink/80 hover:bg-ghibli-sand px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              Hornear otra vez
                            </button>
                            <button
                              onClick={() => setCelebrando(false)}
                              className="text-xs font-bold bg-ghibli-pumpkin text-white hover:bg-ghibli-terracotta px-4 py-2.5 rounded-xl transition-all shadow-md shadow-ghibli-pumpkin/25 cursor-pointer"
                            >
                              Ver resultado
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Pestaña: El Rincón de Io (Historia y Diario) */}
        {pestanaPrincipal === "historia" && (
          <motion.div
            key="tab-historia"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-[#F3A261]/30 shadow-lg text-center relative z-10"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-ghibli-ink mb-2">El Diario de Masas de Io</h3>
            <p className="text-sm text-ghibli-ink/70 leading-relaxed mb-4">
              "Para que un pan crezca con alma, no solo necesita levadura y paciencia... necesita una cocina donde el tiempo se detenga y la leña susurre secretos de otoño."
            </p>
            <span className="text-xs font-bold text-ghibli-terracotta bg-ghibli-sand/50 px-3 py-1 rounded-full">
              Pronto más crónicas y notas de campo ✨
            </span>
          </motion.div>
        )}

        {/* Pestaña: Donaciones y Apoyo */}
        {pestanaPrincipal === "apoyar" && (
          <motion.div
            key="tab-apoyar"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-md mx-auto bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-[#E07A5F]/30 shadow-xl text-center relative z-10"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-ghibli-ink mb-1">Invítale un Café a Io</h3>
            <p className="text-xs text-ghibli-ink/70 leading-relaxed mb-6">
              Este recetario es libre y hecho con amor. Tu aporte (desde $100 COP o $1 USD) ayuda a mantener encendido el horno y sumar nuevas recetas ilustradas.
            </p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => alert("¡Pronto disponible! Conectaremos Wompi (Nequi / Daviplata) para donar desde $100 COP.")}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#F3A261] to-[#E07A5F] text-white font-extrabold text-sm shadow-md shadow-[#E07A5F]/20 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                Donar desde Colombia (Nequi / PSE)
              </button>

              <button 
                onClick={() => alert("¡Pronto disponible! Conectaremos Ko-fi / Stripe para aportes internacionales.")}
                className="w-full py-3 px-4 rounded-2xl bg-white border border-ghibli-sand text-ghibli-ink font-bold text-xs hover:bg-ghibli-sand/40 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Coffee className="w-4 h-4 text-ghibli-terracotta" />
                Buy me a Coffee ($1 USD)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}