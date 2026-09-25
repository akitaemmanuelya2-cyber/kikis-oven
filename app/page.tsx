"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Clock, Flame, Play, ChevronRight, CheckCircle2, 
  Scale, ChefHat, PartyPopper, RotateCcw, ThermometerSun,
  Heart, Coffee, BookOpen, ArrowLeft
} from "lucide-react";
import { RECETAS_BRUJITOS, Receta } from "../data/recipes";
import GhibliAtmosphere from "../components/GhibliAtmosphere";
import BakeryLobby from "../components/BakeryLobby";

export default function Home() {
  const [escenaActiva, setEscenaActiva] = useState<"lobby" | "cocina">("lobby");
  const [modalAbierto, setModalAbierto] = useState<"historia" | "apoyar" | null>(null);

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
    <main className="min-h-screen bg-[#FFF9F2] text-[#2C2420] selection:bg-[#E07A5F]/20 relative overflow-x-hidden">
      <GhibliAtmosphere />

      <AnimatePresence mode="wait">
        {/* ESCENA 1: LOBBY DE BIENVENIDA */}
        {escenaActiva === "lobby" ? (
          <motion.div
            key="scene-lobby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5 }}
          >
            <BakeryLobby
              onEnterKitchen={() => setEscenaActiva("cocina")}
              onOpenStory={() => setModalAbierto("historia")}
              onOpenDonate={() => setModalAbierto("apoyar")}
            />
          </motion.div>
        ) : (
          /* ESCENA 2: TALLER DE HORNEADO & RECETAS */
          <motion.div
            key="scene-cocina"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-8 md:px-12 max-w-6xl mx-auto"
          >
            {/* Barra de Retorno al Lobby */}
            <div className="flex items-center justify-between pb-6 border-b border-ghibli-ink/10 relative z-10 mb-6">
              <button
                onClick={() => setEscenaActiva("lobby")}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-bold text-[#2C2420] border border-ghibli-sand shadow-xs cursor-pointer transition-all hover:scale-105"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#E07A5F]" />
                Volver al Lobby con Io
              </button>

              <div className="flex items-center gap-2 bg-white/85 px-4 py-1.5 rounded-full border border-ghibli-sand shadow-sm text-xs font-semibold text-ghibli-pumpkin">
                <span className="w-2 h-2 rounded-full bg-ghibli-pumpkin animate-ping" />
                Taller en vivo 🥖
              </div>
            </div>

            {/* Selector de Recetas */}
            <div className="flex gap-3 overflow-x-auto pb-2 relative z-10">
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

            {/* Grid Principal del Taller */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
              
              {/* Lado Izquierdo: Pasos / Ingredientes */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
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
                    <div className="flex items-center gap-1.5 bg-white/70 border border-ghibli-sand px-3 py-1.5 rounded-xl shadow-xs">
                      <Clock className="w-3.5 h-3.5 text-ghibli-terracotta" />
                      {recetaActiva.tiempo}
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/70 border border-ghibli-sand px-3 py-1.5 rounded-xl shadow-xs">
                      <Flame className="w-3.5 h-3.5 text-ghibli-terracotta" />
                      {recetaActiva.dificultad}
                    </div>
                    {esUltimoPaso && (
                      <div className="flex items-center gap-1.5 bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-xl font-bold">
                        <ThermometerSun className="w-3.5 h-3.5 animate-spin" />
                        180°C Activo ♨️
                      </div>
                    )}
                  </div>
                </div>

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
                          onClick={() => {
                            setPasoIndex(idx);
                            setCelebrando(false);
                          }}
                          whileHover={{ x: 6 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                            pasoIndex === idx
                              ? "bg-white border-ghibli-pumpkin/60 shadow-md ring-2 ring-ghibli-pumpkin/10"
                              : "bg-white/40 border-transparent hover:bg-white/70"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-ghibli-terracotta">
                              Paso 0{paso.numero}
                            </span>
                            {pasoIndex === idx && (
                              <Play className="w-3.5 h-3.5 fill-ghibli-pumpkin text-ghibli-pumpkin" />
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
                      className="flex flex-col gap-4 bg-white/75 p-5 rounded-2xl border border-ghibli-sand shadow-sm"
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

              {/* Lado Derecho: Cinema de Animación */}
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-ghibli-sand to-white border border-ghibli-sand shadow-2xl flex flex-col justify-between p-6">
                  
                  <div className="flex items-center justify-between z-20">
                    <span className="text-xs font-bold bg-white/90 px-3.5 py-1.5 rounded-full text-ghibli-ink/80 border border-white/60 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ghibli-pumpkin animate-pulse" />
                      Paso {pasoIndex + 1} de {recetaActiva.pasos.length}
                    </span>

                    <button
                      onClick={handleSiguientePaso}
                      className="flex items-center gap-1.5 text-xs font-bold bg-ghibli-pumpkin text-white px-4 py-1.5 rounded-full hover:bg-ghibli-terracotta transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
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
                            className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] saturate-[1.1]"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFEBD0] to-[#FDE1C7] text-ghibli-ink p-8 text-center">
                            <Flame className="w-12 h-12 text-ghibli-pumpkin animate-pulse mb-3" />
                            <h3 className="text-xl font-black text-ghibli-ink mb-1">
                              ¡El horno está en su punto! ♨️
                            </h3>
                            <p className="text-xs text-ghibli-ink/70 max-w-xs">
                              Las galletas doran sus orillas a 180°C.
                            </p>
                          </div>
                        )}
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(255,249,240,0.85)]" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="relative z-20 flex justify-end pointer-events-none mt-auto">
                    <div className="pointer-events-auto w-full max-w-xs bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-xl">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-ghibli-pumpkin shrink-0" />
                        <span className="text-[11px] font-black uppercase text-ghibli-pumpkin tracking-wider truncate">
                          {pasoActual?.accion}
                        </span>
                      </div>
                      <p className="text-xs text-ghibli-ink/90 leading-relaxed font-medium">
                        {pasoActual?.detalle}
                      </p>
                    </div>
                  </div>

                  {/* Modal de Celebración */}
                  <AnimatePresence>
                    {celebrando && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-[#2C2420]/40 backdrop-blur-xs flex items-center justify-center p-6"
                      >
                        <div className="bg-white/95 border-2 border-ghibli-pumpkin/40 rounded-3xl p-6 text-center max-w-sm shadow-2xl">
                          <PartyPopper className="w-8 h-8 text-ghibli-pumpkin mx-auto mb-2 animate-bounce" />
                          <h3 className="text-2xl font-black text-ghibli-ink mb-1">
                            ¡Ya están listas!
                          </h3>
                          <p className="text-xs text-ghibli-ink/70 mt-2 mb-4 leading-relaxed">
                            El aroma inunda toda la panadería. ¡A disfrutar calientitas!
                          </p>
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={reiniciarReceta}
                              className="text-xs font-bold bg-ghibli-sand/80 px-4 py-2 rounded-xl cursor-pointer"
                            >
                              Hornear otra vez
                            </button>
                            <button
                              onClick={() => setCelebrando(false)}
                              className="text-xs font-bold bg-ghibli-pumpkin text-white px-4 py-2 rounded-xl cursor-pointer"
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: HISTORIA / DIARIO DE IO */}
      <AnimatePresence>
        {modalAbierto === "historia" && (
          <div className="fixed inset-0 z-50 bg-[#2C2420]/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-center border border-orange-200"
            >
              <BookOpen className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="text-xl font-black text-ghibli-ink mb-2">El Diario de Masas de Io</h3>
              <p className="text-xs text-ghibli-ink/70 leading-relaxed mb-4">
                "Para que un pan crezca con alma, no solo necesita levadura y paciencia... necesita una cocina donde el tiempo se detenga y la leña susurre secretos."
              </p>
              <button
                onClick={() => setModalAbierto(null)}
                className="px-5 py-2 rounded-full bg-ghibli-pumpkin text-white text-xs font-bold cursor-pointer"
              >
                Volver
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: DONACIONES */}
      <AnimatePresence>
        {modalAbierto === "apoyar" && (
          <div className="fixed inset-0 z-50 bg-[#2C2420]/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-center border border-orange-200"
            >
              <Coffee className="w-8 h-8 text-[#E07A5F] mx-auto mb-2" />
              <h3 className="text-xl font-black text-ghibli-ink mb-1">Invítale un Café a Io</h3>
              <p className="text-xs text-ghibli-ink/70 leading-relaxed mb-4">
                Tu aporte (desde $100 COP) ayuda a mantener encendido el horno y sumar nuevas recetas interactivas.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => alert("¡Pronto disponible con Wompi!")}
                  className="w-full py-2.5 rounded-xl bg-[#E07A5F] text-white font-bold text-xs cursor-pointer"
                >
                  Donar con Nequi / Daviplata ($100 COP)
                </button>
                <button
                  onClick={() => setModalAbierto(null)}
                  className="w-full py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}