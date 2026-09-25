"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Utensils, HeartHandshake, ArrowRight } from "lucide-react";
import Image from "next/image";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Referencias para el control matemático de mouse-scrub
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cuando el video carga metadatos, lo situamos en la mitad (mirando al frente)
    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
      if (video.duration) {
        const midTime = video.duration / 2;
        video.currentTime = midTime;
        targetTimeRef.current = midTime;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration || isNaN(video.duration)) return;

      // Posición horizontal normalizada del ratón (0 = izquierda total, 1 = derecha total)
      const xPct = Math.max(0, Math.min(1, e.clientX / window.innerWidth));

      // Mapeo directo: mouse a la izquierda = inicio del video, mouse a la derecha = final
      const targetTime = xPct * video.duration;
      targetTimeRef.current = targetTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTime;
      }
    };

    const handleSeeked = () => {
      if (!video) return;
      // Si el cursor siguió moviéndose mientras buscaba el cuadro anterior, actualiza
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.04) {
        video.currentTime = targetTimeRef.current;
      } else {
        isSeekingRef.current = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("mousemove", handleMouseMove);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-[#FFF5EA] via-[#FFEBD7] to-[#FFF9F2] flex flex-col justify-between select-none">
      
      {/* 1. Io animada con Scrubbing en primer plano */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-end justify-center md:justify-end md:pr-12 lg:pr-24">
        {/* Contenedor del video */}
        <div className="relative w-full max-w-xl lg:max-w-2xl h-[78vh] md:h-[90vh] flex items-end justify-center">
          <video
            ref={videoRef}
            src="/videos/io-head-turn.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_45px_rgba(224,122,95,0.25)]"
          />

          {/* Respaldo por si el video tarda en cargar */}
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-end justify-center">
              <Image
                src="/images/io-cutout.png"
                alt="Io la Panadera"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. Barra Superior */}
      <header className="relative z-30 w-full max-w-6xl mx-auto flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/90 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#F3A261] animate-spin" />
          <span className="text-xs font-black text-[#2C2420] tracking-wider uppercase">
            Kiki's Oven
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStory}
            className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-xs font-bold text-[#2C2420] transition-all border border-white/80 shadow-xs cursor-pointer"
          >
            Diario de Io
          </button>
          <button
            onClick={onOpenDonate}
            className="px-4 py-2 rounded-full bg-[#E07A5F] hover:bg-[#D96B4F] text-xs font-extrabold text-white transition-all shadow-md shadow-[#E07A5F]/20 cursor-pointer flex items-center gap-1.5"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            Apoyar
          </button>
        </div>
      </header>

      {/* 3. Textos y Acciones principales (Alineados a la izquierda) */}
      <div className="relative z-20 max-w-xl px-6 md:px-12 lg:px-16 my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/75 backdrop-blur-md border border-[#E07A5F]/20 text-[11px] font-bold text-[#E07A5F] mb-3">
          <span>Obrador Artesanal &middot; Masa Lenta</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2C2420] tracking-tight leading-[1.08] mb-4">
          La calidez de un buen pan empieza con{" "}
          <span className="text-[#E07A5F] underline decoration-[#F3A261]/60 decoration-wavy">
            Io
          </span>
        </h1>

        <p className="text-sm md:text-base text-[#2C2420]/80 leading-relaxed max-w-md mb-8 font-medium">
          Mueve el cursor para ver el obrador a través de los ojos de Io y descubre los secretos de la fermentación paciente.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onEnterKitchen}
            className="inline-flex items-center gap-2.5 bg-[#E07A5F] hover:bg-[#D96B4F] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#E07A5F]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>Entrar al Horno y Recetas</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenDonate}
            className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-[#2C2420] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-white/90 shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <HeartHandshake className="w-4 h-4 text-[#E07A5F]" />
            <span>Invitar un café</span>
          </button>
        </div>
      </div>

      {/* 4. Pie de página sutil */}
      <div className="relative z-20 px-6 md:px-12 py-6 flex items-center justify-between text-[11px] text-[#2C2420]/60 font-medium">
        <span>Mueve el cursor de izquierda a derecha para interactuar</span>
        <span className="hidden sm:inline">Kiki's Oven &copy; 2026</span>
      </div>

    </section>
  );
}