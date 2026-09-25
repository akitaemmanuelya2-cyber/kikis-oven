"use client";

import { useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Procesamiento de Chroma Key en Canvas
  const processFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = frame.data;

    // Umbral de eliminación de verde
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Si el verde supera significativamente a los otros canales
      if (g > 90 && g > r * 1.25 && g > b * 1.25) {
        data[i + 3] = 0; // Transparencia total
      }
    }

    ctx.putImageData(frame, 0, 0);
  };

  // Video Scrubbing con el cursor
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = 0.01;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration) return;
      const progress = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      video.currentTime = progress * video.duration;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", processFrame);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", processFrame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-[#FFF5EA] via-[#FFEBD7] to-[#FFF9F2] flex flex-col justify-between select-none">
      {/* Video oculto en memoria */}
      <video
        ref={videoRef}
        src="/videos/io-head-turn.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden"
      />

      {/* Barra Superior */}
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

      {/* Escenario Central */}
      <main className="relative flex-1 flex flex-col items-center justify-center w-full px-4">
        {/* Título detrás de Io */}
        <div className="absolute z-10 flex flex-col items-center text-center pointer-events-none">
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

        {/* Canvas interactivo con Io */}
        <div className="relative z-20 flex flex-col items-center justify-end w-full max-w-xl h-[70vh] md:h-[80vh]">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_30px_rgba(224,122,95,0.2)] pointer-events-none"
          />

          <div className="absolute bottom-6 sm:bottom-8 z-30 pointer-events-auto">
            <button
              onClick={onEnterKitchen}
              className="inline-flex items-center gap-2.5 bg-[#E07A5F] hover:bg-[#D96B4F] text-white font-extrabold text-xs sm:text-sm px-7 py-3 rounded-full shadow-lg shadow-[#E07A5F]/35 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/30"
            >
              <Utensils className="w-4 h-4" />
              <span>Entrar a la Cocina y Hornear</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-[11px] text-[#2C2420]/50 font-medium">
        <span>Artesanía &bull; Fermentación lenta natural</span>
        <span>Kiki's Oven &copy; 2026</span>
      </footer>
    </section>
  );
}