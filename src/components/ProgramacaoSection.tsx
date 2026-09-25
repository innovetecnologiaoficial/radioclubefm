import React, { useState } from "react";
import { Clock, Radio, MessageCircle, Calendar, Sparkles, ChevronRight } from "lucide-react";
import { RADIO_CONFIG } from "../config/radioConfig";

type DayKey = "segunda" | "terca" | "quarta" | "quinta" | "sexta" | "sabado" | "domingo";

interface ProgramacaoSectionProps {
  onOpenDetails?: (show: any) => void;
}

export default function ProgramacaoSection({ onOpenDetails }: ProgramacaoSectionProps) {
  // Determine current day of week in Portuguese
  const getTodayKey = (): DayKey => {
    const day = new Date().getDay();
    switch (day) {
      case 0: return "domingo";
      case 1: return "segunda";
      case 2: return "terca";
      case 3: return "quarta";
      case 4: return "quinta";
      case 5: return "sexta";
      case 6: return "sabado";
      default: return "segunda";
    }
  };

  const [activeDay, setActiveDay] = useState<DayKey | "hoje">("hoje");

  const resolvedDayKey: DayKey = activeDay === "hoje" ? getTodayKey() : activeDay;
  const currentSchedule = RADIO_CONFIG.programacao[resolvedDayKey] || RADIO_CONFIG.programacao.segunda;

  const dayTabs = [
    { key: "hoje", label: "Hoje", highlight: true },
    { key: "segunda", label: "Segunda" },
    { key: "terca", label: "Terça" },
    { key: "quarta", label: "Quarta" },
    { key: "quinta", label: "Quinta" },
    { key: "sexta", label: "Sexta" },
    { key: "sabado", label: "Sábado" },
    { key: "domingo", label: "Domingo" },
  ];

  return (
    <section id="programacao" className="relative py-20 bg-[#07080c] text-white border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 font-display font-black text-xs uppercase tracking-widest mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>GRADE OFICIAL 24 HORAS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              PROGRAMAÇÃO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">CLUBE FM</span>
            </h2>
            <p className="text-zinc-400 font-medium text-sm sm:text-base mt-2 max-w-2xl">
              Confira nossa grade completa e não perca seu programa favorito na 87,9 FM de Criciúma.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-marker text-amber-400 text-sm hidden sm:inline transform -rotate-2">
              SEMPRE AO SEU LADO! ❤️
            </span>
            <a
              href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(RADIO_CONFIG.whatsappMessageSong)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-black uppercase tracking-wider transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Participe no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Day Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {dayTabs.map((tab) => {
            const isSelected = activeDay === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveDay(tab.key as any)}
                className={`px-5 py-2.5 rounded-full font-display font-black text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/30 scale-105"
                    : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                }`}
              >
                {tab.highlight && <Sparkles className="w-3 h-3 text-amber-300" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Program Cards Grid */}
        <div className="space-y-4">
          {currentSchedule.map((item, index) => {
            return (
              <div
                key={index}
                className="group relative bg-[#10121a]/90 hover:bg-[#141724] border border-white/10 hover:border-red-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl hover:-translate-y-1"
              >
                {/* Left: Time & Tag */}
                <div className="flex items-center md:flex-col md:items-start md:w-44 shrink-0 gap-3 md:gap-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-red-400 font-mono font-bold text-xs sm:text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                {/* Center: Show Title, Host & Description */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-black text-lg sm:text-xl text-white group-hover:text-red-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-amber-300">
                    Apresentação: <span className="text-white">{item.host}</span>
                  </p>
                  <p className="text-xs text-zinc-400 font-medium line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                  <a
                    href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Olá! Quero mandar uma mensagem para o programa ${item.name} com ${item.host}!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-600/30 border border-white/10 hover:border-emerald-500/50 text-zinc-200 hover:text-emerald-300 font-black text-xs uppercase tracking-wider transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Mandar Recado</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
