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
    id: 3,
    url: "https://radioclubecriciuma.com/imagens/CARD3.png",
    alt: "Programação de Shows e Programas",
    title: "Programas e Horários"
  },
  {
    id: 4,
    url: "https://radioclubecriciuma.com/imagens/CARD4.png",
    alt: "Mais Programação",
    title: "Mais Programação"
  },
  {
    id: 5,
    url: "https://radioclubecriciuma.com/imagens/CARD5.png",
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-[#ff3e5e] animate-pulse" />
            <span>Destaques e Programação</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Fique por dentro de tudo na Clube FM</p>
        </div>
        
        {/* Navigation Buttons */}
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-[#ff3e5e] hover:border-[#ff3e5e] hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            aria-label="Slide anterior"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-[#ff3e5e] hover:border-[#ff3e5e] hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            aria-label="Próximo slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main slider viewport container - no background fill, transparent, keeping rounded cards */}
      <div 
        className="relative select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 overflow-hidden py-2 px-1">
          {/* Card Left */}
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100/60 bg-white">
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
                  className="w-full h-auto block select-none rounded-[2.5rem] hover:scale-[1.01] transition-transform duration-500"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card Right - visible on md and up desktops/tablets */}
          <div className="hidden md:block relative overflow-hidden rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100/60 bg-white">
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
                  className="w-full h-auto block select-none rounded-[2.5rem] hover:scale-[1.01] transition-transform duration-500"
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
