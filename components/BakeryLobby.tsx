"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Utensils, HeartHandshake, ArrowRight } from "lucide-react";

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
  // Coordenadas normalizadas (-1 a 1) para el efecto 2.5D interactivo
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalizamos: centro de la pantalla es (0,0)
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-[#FFF5EA] via-[#FFEBD7] to-[#FFF9F2] flex flex-col justify-between select-none">
      
      {/* 1. Barra Superior Flotante */}
      <header className="relative z-30 w-full max-w-6xl mx-auto flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/90 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#F3A261] animate-spin" />
          <span className="text-xs font-black text-[#2C2420] tracking-wider uppercase">
            Kiki's Oven
          </span>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={onOpenStory}
            className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-xs font-bold text-[#2C2420] transition-all border border-white/80 shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          >
            Diario de Io
          </button>
          <button
            onClick={onOpenDonate}
            className="px-4 py-2 rounded-full bg-[#E07A5F] hover:bg-[#D96B4F] text-xs font-extrabold text-white transition-all shadow-md shadow-[#E07A5F]/20 cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            Apoyar
          </button>
        </nav>
      </header>

      {/* 2. Escenario Central con Composición Editorial y Capas */}
      <main className="relative flex-1 flex flex-col items-center justify-center w-full px-4">
        
        {/* Capa de Fondo (Z-10): Tipografía Editorial Gigante */}
        <div 
          className="absolute z-10 flex flex-col items-center text-center transition-transform duration-300 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -8}px, 0)`,
          }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#2C2420] tracking-tight leading-none">
            Bienvenido al obrador
          </h1>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#E07A5F] tracking-tight leading-none mt-1">
            de Io
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base font-bold text-[#2C2420]/70 max-w-sm tracking-wide">
            Elige qué hornear hoy y aprende la magia de la masa lenta.
          </p>
        </div>

        {/* Capa Frontal (Z-20): Io con Bandeja y Reacción al Cursor */}
        <div 
          className="relative z-20 flex flex-col items-center justify-end w-full max-w-lg md:max-w-xl h-[70vh] md:h-[80vh] transition-transform duration-150 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${mousePos.x * 16}px, ${mousePos.y * 10}px, 0) rotate(${mousePos.x * 1.5}deg)`,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/io-cutout.png"
              alt="Io la panadera artesanal"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_25px_35px_rgba(224,122,95,0.22)]"
            />
          </div>

          {/* Botón de Entrada montado sobre la bandeja con interacción interactiva */}
          <div className="absolute bottom-6 sm:bottom-8 z-30 pointer-events-auto">
            <button
              onClick={onEnterKitchen}
              className="inline-flex items-center gap-2.5 bg-[#E07A5F] hover:bg-[#D96B4F] text-white font-extrabold text-xs sm:text-sm px-7 py-3 rounded-full shadow-lg shadow-[#E07A5F]/35 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/30 backdrop-blur-xs"
            >
              <Utensils className="w-4 h-4" />
              <span>Entrar a la Cocina y Hornear</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </main>

      {/* 3. Pie sutil de ambientación */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-[11px] text-[#2C2420]/50 font-medium">
        <span>Artesanía &bull; Fermentación lenta natural</span>
        <span>Kiki's Oven &copy; 2026</span>
      </footer>

    </section>
  );
}