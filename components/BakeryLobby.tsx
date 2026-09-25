"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Utensils, HeartHandshake, BookOpen, ArrowRight } from "lucide-react";
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
  // Coordenadas normalizadas del mouse (-0.5 a 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Físicas suaves para que el giro de mirada no sea tieso
  const springSmooth = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springSmooth);
  const smoothY = useSpring(mouseY, springSmooth);

  // Transformaciones para Io (Simulación de giro de cabeza / mirada hacia el mouse)
  const ioRotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const ioRotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const ioTranslateX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const ioTranslateY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  // Fondo que se desplaza sutilmente en sentido contrario (Parallax)
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPct = clientX / innerWidth - 0.5;
    const yPct = clientY / innerHeight - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-[#FFF5EA] via-[#FFEBD7] to-[#FFF9F2] flex flex-col justify-between items-center select-none p-6 md:p-10 perspective-[1200px]"
    >
      {/* 1. Fondo vivo con atmósfera de panadería */}
      <motion.div
        style={{ x: bgTranslateX }}
        className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-[#F3A261]/35 via-[#E07A5F]/20 to-transparent blur-3xl"
        />
      </motion.div>

      {/* 2. Barra Superior Minimalista */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-30 pt-2">
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/80 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#F3A261] animate-spin" />
          <span className="text-xs font-black text-[#2C2420] tracking-wider uppercase">
            Kiki's Oven
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStory}
            className="px-3.5 py-1.5 rounded-full bg-white/60 hover:bg-white text-xs font-bold text-[#2C2420]/80 transition-all border border-white/60 cursor-pointer"
          >
            Diario de Io
          </button>
          <button
            onClick={onOpenDonate}
            className="px-3.5 py-1.5 rounded-full bg-[#E07A5F]/15 hover:bg-[#E07A5F]/25 text-xs font-extrabold text-[#E07A5F] transition-all border border-[#E07A5F]/20 cursor-pointer flex items-center gap-1.5"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            Apoyar
          </button>
        </div>
      </header>

      {/* 3. Título Hero Flotante (Despacio, arriba de Io) */}
      <div className="relative z-20 text-center max-w-2xl px-4 pointer-events-none mt-2">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2C2420] tracking-tight leading-tight"
        >
          Bienvenido al obrador de{" "}
          <span className="text-[#E07A5F] underline decoration-[#F3A261]/50 decoration-wavy">
            Io
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-xs md:text-sm font-medium text-[#2C2420] mt-2 max-w-md mx-auto"
        >
          Elige qué hornear hoy y aprende la magia de la masa lenta.
        </motion.p>
      </div>

      {/* 4. IO: La estrella a pantalla completa con seguimiento de cursor */}
      <motion.div
        style={{
          rotateY: ioRotateY,
          rotateX: ioRotateX,
          x: ioTranslateX,
          y: ioTranslateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute bottom-0 z-10 w-full max-w-3xl h-[65vh] md:h-[78vh] flex items-end justify-center pointer-events-none"
      >
        <div className="relative w-full h-full drop-shadow-[0_25px_40px_rgba(224,122,95,0.25)]">
          <Image
            src="/images/io-cutout.png"
            alt="Io la Panadera te atiende en el mostrador"
            fill
            priority
            className="object-contain object-bottom filter contrast-[1.02] brightness-[1.01]"
          />
        </div>
      </motion.div>

      {/* 5. Barra Flotante de Llamado a la Acción (CTA) */}
      <div className="relative z-30 w-full max-w-sm pb-4">
        <motion.button
          onClick={onEnterKitchen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#F3A261] via-[#E07A5F] to-[#D96B4F] text-white font-black text-sm shadow-xl shadow-[#E07A5F]/30 border border-white/40 flex items-center justify-center gap-3 cursor-pointer hover:shadow-2xl transition-all"
        >
          <Utensils className="w-4 h-4" />
          <span>Entrar a la Cocina y Hornear</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}