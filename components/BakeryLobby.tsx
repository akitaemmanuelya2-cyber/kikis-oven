"use client";

import { Sparkles, Utensils, HeartHandshake, ArrowRight, Wheat, Clock } from "lucide-react";

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
  return (
    <section className="relative w-screen h-screen overflow-hidden flex flex-col justify-between select-none bg-[#140F0D]">
      
      {/* 0. Video de fondo inmersivo (Oscurito, cálido y cinematográfico) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#140F0D]">
        <video
          src="/videos/bakery-360-io.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter blur-[1.5px] opacity-80"
        />
        {/* Velo degradado cálido para contraste editorial a la izquierda */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#140F0D]/90 via-[#140F0D]/55 to-[#140F0D]/30" />
        {/* Viñeta perimetral suave para dar profundidad de cine */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#140F0D]/20 to-[#140F0D]/70 pointer-events-none" />
      </div>

      {/* 1. Header flotante */}
      <header className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-md">
          <Sparkles className="w-4 h-4 text-[#F3A261] animate-spin" />
          <span className="text-xs font-black text-[#2C2420] tracking-wider uppercase">
            Kiki's Oven
          </span>
        </div>

        <nav className="flex items-center gap-3">
          <button
            onClick={onOpenStory}
            className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-xs font-bold text-[#2C2420] transition-all border border-white/40 shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          >
            Diario de Io
          </button>
          <button
            onClick={onOpenDonate}
            className="px-4 py-2 rounded-full bg-[#E07A5F] hover:bg-[#D96B4F] text-xs font-extrabold text-white transition-all shadow-md shadow-[#E07A5F]/30 cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            Apoyar
          </button>
        </nav>
      </header>

      {/* 2. Escenario Central Editorial */}
      <main className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        <div className="w-full md:w-1/2 max-w-lg flex flex-col items-start justify-center">
          
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1.5 rounded-full mb-6">
            <Wheat className="w-3.5 h-3.5 text-[#F4A261]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              Fermentación Natural &bull; 24h
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] drop-shadow-lg">
            Bienvenido al obrador
          </h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#F4A261] tracking-tight leading-[0.95] mt-2 drop-shadow-lg">
            de Io
          </h2>

          <p className="mt-6 text-sm sm:text-base md:text-lg font-medium text-white/90 max-w-md leading-relaxed drop-shadow-md">
            Descubre el arte de la masa madre, hornea pan artesanal con recetas vivas y acompaña a Io en su rutina diaria de panadería.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onEnterKitchen}
              className="inline-flex items-center justify-center gap-3 bg-[#E07A5F] hover:bg-[#D96B4F] text-white font-extrabold text-sm md:text-base px-8 py-4 rounded-full shadow-2xl shadow-black/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/40"
            >
              <Utensils className="w-4 h-4 md:w-5 md:h-5" />
              <span>Entrar a la Cocina</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white/90 bg-black/30 backdrop-blur-sm rounded-full border border-white/10">
              <Clock className="w-4 h-4 text-[#F4A261]" />
              <span>Horno encendido</span>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between text-[11px] text-white/70 font-medium">
        <span>Artesanía &bull; Masa viva con carácter</span>
        <span>Kiki's Oven &copy; 2026</span>
      </footer>

    </section>
  );
}