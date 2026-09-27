import { motion } from "framer-motion";
import { useState } from "react";

interface LobbyProps {
  onEnterKitchen: () => void;
  onOpenStory: () => void;
  onOpenDonate: () => void;
}

export default function BakeryLobby({
  onEnterKitchen,
  onOpenStory,
  onOpenDonate,
}: LobbyProps) {
  // Estado para animar el saltito de Lía al hacer clic en apoyar
  const [isJumping, setIsJumping] = useState(false);

  const handleSupportClick = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 800); // Duración del saltito
    onOpenDonate();
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden flex flex-col justify-between select-none bg-stone-950">
      
      {/* 0. Video de fondo luminoso y vivo */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          src="/videos/lia-welcome-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover contrast-[1.06] saturate-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* 1. Navbar flotante */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-6">
        {/* Logo / Nombre */}
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
          <span className="text-sm font-semibold tracking-wide text-amber-200">
            🥖 Lia's Oven
          </span>
        </div>

        {/* Enlaces y Botón de Apoyo con Lía Chibi */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenStory}
            className="hidden md:block text-sm text-stone-200 hover:text-white px-4 py-2 transition-colors cursor-pointer"
          >
            Diario de la Panadería
          </button>
          
          <button
            onClick={handleSupportClick}
            className="relative bg-amber-100/90 hover:bg-white text-stone-900 text-sm font-medium px-5 py-2.5 rounded-full backdrop-blur transition-all shadow-md flex items-center gap-3 cursor-pointer group"
          >
            {/* Miniatura Chibi de Lía con animación de salto */}
            <motion.div 
              animate={isJumping ? { y: [-4, -14, 0], scale: [1, 1.15, 1] } : { y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-7 h-7 rounded-full overflow-hidden border border-amber-600/50 shadow-sm bg-amber-200 flex-shrink-0"
            >
              <img 
                src="/images/lia-avatar.png" 
                alt="Lía Chibi" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <span>❤️ Apoyar a Lía y a Gus</span>
          </button>
        </div>
      </nav>

      {/* 2. Contenido Central (Títulos y descripción directa) */}
      <div className="relative z-10 flex flex-col items-start px-6 md:px-16 pb-12 max-w-2xl">
        <span className="bg-amber-900/60 text-amber-200 text-xs md:text-sm font-medium tracking-wider px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/30 mb-3">
          🌾 Fermentación natural & recetas caseras
        </span>
        
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
          Bienvenidos al recetario <br />
          de Lía y Gus
        </h1>
        
        <p className="mt-3 text-stone-200 text-sm md:text-base leading-relaxed drop-shadow">
          Un espacio acogedor donde compartimos recetas de pan artesanal, 
          masas madre y el paso a paso para hornear con amor desde casa.
        </p>

        {/* Botón de acción a la cocina */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={onEnterKitchen}
            className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-7 py-3 rounded-full shadow-xl transition-all flex items-center gap-2 text-sm md:text-base border border-amber-400/30 cursor-pointer"
          >
            <span>Entrar a la Cocina</span>
            <span>→</span>
          </button>
        </div>
      </div>

    </section>
  );
}