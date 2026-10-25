import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CardItem {
  id: number;
  url: string;
  alt: string;
  title: string;
}

const CARDS: CardItem[] = [
  {
    id: 1,
    url: "https://radioclubecriciuma.com/imagens/CARD1.png",
    alt: "Destaque Clube FM 1",
    title: "Sintonize na Melhor"
  },
  {
    id: 2,
    url: "https://radioclubecriciuma.com/imagens/CARD2.png",
    alt: "Destaque Clube FM 2",
    title: "Eventos e Prêmios"
  },
  {
    id: 5,
    url: "https://radioclubecriciuma.com/imagens/CARD5.png?t=1728670154",
    alt: "Destaque e Novidades",
    title: "Novidades"
  },
  {
    id: 6,
    url: "https://radioclubecriciuma.com/imagens/CARD6.jpeg",
    alt: "Destaque 6",
    title: "Destaque 6"
  }
];

export default function HighlightsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right/next, -1 = left/prev
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isHovered]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? CARDS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === CARDS.length - 1 ? 0 : prev + 1));
  };

  const leftCard = CARDS[currentIndex];
  const rightCard = CARDS[(currentIndex + 1) % CARDS.length];

  // Motion variants for smooth slide direction-dependent animations
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section id="cards-destaque" className="max-w-7xl mx-auto px-4 py-8 mb-10">
      {/* Header section with sleek layout and red color accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#ED1C24] bg-[#ED1C24]/10 px-2.5 py-0.5 rounded">
              Em Destaque
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Eventos, Prêmios e Novidades
          </h2>
          <p className="text-slate-600 text-sm mt-0.5">
            Acompanhe as principais ações e promoções ativas na rádio
          </p>
        </div>
        
        {/* Navigation Buttons */}
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[#ED1C24] hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm"
            aria-label="Slide anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[#ED1C24] hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm"
            aria-label="Próximo slide"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main slider viewport container */}
      <div 
        className="relative select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 overflow-hidden py-1">
          {/* Card Left */}
          <div className="relative overflow-hidden rounded-2xl shadow-sm border border-slate-200/80 bg-slate-100 aspect-[3/2] w-full">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`left-${leftCard.id}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full"
              >
                <img
                  src={leftCard.url}
                  alt={leftCard.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card Right - visible on md and up desktops/tablets */}
          <div className="hidden md:block relative overflow-hidden rounded-2xl shadow-sm border border-slate-200/80 bg-slate-100 aspect-[3/2] w-full">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`right-${rightCard.id}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full"
              >
                <img
                  src={rightCard.url}
                  alt={rightCard.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Elegant Dots indicators representing current slide position */}
        <div className="flex justify-center gap-2 mt-8">
          {CARDS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex 
                  ? "w-8 bg-[#ff3e5e]" 
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
