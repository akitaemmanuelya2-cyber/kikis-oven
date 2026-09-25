"use client";

import { useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let isSubscribed = true;
    let animId: number;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const processFrame = () => {
      if (!isSubscribed || !video || !canvas || !ctx) return;

      if (video.readyState >= 2 && video.videoWidth > 0) {
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        // Despill + Chroma Key
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const maxRB = Math.max(r, b);
          const greenDiff = g - maxRB;

          if (g > 80 && greenDiff > 30) {
            data[i + 3] = 0;
          } else if (greenDiff > 8) {
            data[i + 1] = maxRB;
            data[i + 3] = Math.max(0, 255 - greenDiff * 5);
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      if ("requestVideoFrameCallback" in video) {
        (video as any).requestVideoFrameCallback(processFrame);
      } else {
        animId = requestAnimationFrame(processFrame);
      }
    };

    const startPlayback = () => {
      video.play().then(() => {
        if ("requestVideoFrameCallback" in video) {
          (video as any).requestVideoFrameCallback(processFrame);
        } else {
          animId = requestAnimationFrame(processFrame);
        }
      }).catch((err) => {
        console.warn("Autoplay bloqueado:", err);
      });
    };

    if (video.readyState >= 3) {
      startPlayback();
    } else {
      video.addEventListener("canplay", startPlayback, { once: true });
    }

    return () => {
      isSubscribed = false;
      cancelAnimationFrame(animId);
      video.removeEventListener("canplay", startPlayback);
    };
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden flex flex-col justify-between select-none bg-[#2C2420]">
      
      {/* 0. Video de Fondo Atmosférico (Panadería Ghibli) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          src="/videos/bakery-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter blur-[1px] scale-105 opacity-90"
        />
        {/* Velo cálido para asegurar perfecta legibilidad y contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1613]/70 via-[#1C1613]/40 to-transparent" />
      </div>

      {/* Video fuente de Io en memoria (oculto) */}
      <video
        ref={videoRef}
        src="/videos/io-lobby-loop.mp4?v=6"
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="fixed -left-[9999px] -top-[9999px] w-10 h-10 opacity-0 pointer-events-none"
      />

      {/* 1. Header flotante */}
      <header className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between p-6 md:p-8">
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

      {/* 2. Escenario Central */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        
        {/* Columna Izquierda Editorial (Contraste alto sobre el fondo) */}
        <div className="relative z-20 w-full md:w-1/2 max-w-lg flex flex-col items-start justify-center">
          
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1.5 rounded-full mb-6">
            <Wheat className="w-3.5 h-3.5 text-[#F4A261]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              Fermentación Natural &bull; 24h
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] drop-shadow-md">
            Bienvenido al obrador
          </h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#F4A261] tracking-tight leading-[0.95] mt-2 drop-shadow-md">
            de Io
          </h2>

          <p className="mt-6 text-sm sm:text-base md:text-lg font-medium text-white/90 max-w-md leading-relaxed drop-shadow-sm">
            Descubre el arte de la masa madre, hornea pan artesanal con recetas vivas y acompaña a Io en su rutina diaria de panadería.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onEnterKitchen}
              className="inline-flex items-center justify-center gap-3 bg-[#E07A5F] hover:bg-[#D96B4F] text-white font-extrabold text-sm md:text-base px-8 py-4 rounded-full shadow-2xl shadow-black/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/40"
            >
              <Utensils className="w-4 h-4 md:w-5 md:h-5" />
              <span>Entrar a la Cocina</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white/80 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
              <Clock className="w-4 h-4 text-[#F4A261]" />
              <span>Horno encendido</span>
            </div>
          </div>
        </div>

        {/* Io a la derecha con iluminación integrada */}
        <div className="absolute right-[-15vw] sm:right-[-8vw] md:right-[-2vw] lg:right-[3vw] bottom-0 h-[88vh] md:h-[96vh] flex items-end justify-center pointer-events-none z-10 translate-x-[15%] md:translate-x-[20%]">
          <canvas
            ref={canvasRef}
            className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          />
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