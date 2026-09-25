import React, { useState } from "react";
import { Mic, Instagram, Clock, Radio, MessageCircle, Sparkles } from "lucide-react";
import { RADIO_CONFIG } from "../config/radioConfig";

export default function LocutoresSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="locutores" className="relative py-20 bg-[#0a0b12] text-white border-t border-white/10 overflow-hidden">
      {/* Dynamic ambient lights */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-display font-black text-xs uppercase tracking-widest mb-3">
              <Mic className="w-3.5 h-3.5 animate-pulse" />
              <span>VOZES QUE TOCAM SEU CORAÇÃO</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              NOSSOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400">LOCUTORES</span>
            </h2>
            <p className="text-zinc-400 font-medium text-sm sm:text-base mt-2 max-w-2xl">
              Conheça os profissionais que trazem música, alegria, prêmios e informação com credibilidade todos os dias na Clube 87,9 FM.
            </p>
          </div>

          <div className="hidden sm:block">
            <span className="font-marker text-lg text-amber-300 transform -rotate-3 inline-block">
              GENTE DE VERDADE NO MICROFONE! 🎙️
            </span>
          </div>
        </div>

        {/* 3D Depth Locutores Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RADIO_CONFIG.locutores.map((locutor) => {
            const isHovered = hoveredId === locutor.id;

            return (
              <div
                key={locutor.id}
                onMouseEnter={() => setHoveredId(locutor.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-[#121420] rounded-3xl overflow-hidden border-2 border-white/10 hover:border-red-500/60 shadow-2xl transition-all duration-500 hover:-translate-y-2.5 flex flex-col cursor-pointer"
                style={{
                  transform: isHovered
                    ? "perspective(1000px) rotateX(2deg) rotateY(-2deg) translateY(-8px)"
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
                }}
              >
                {/* Photo Container with Depth & Gradient Overlays */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
                  <img
                    src={locutor.image}
                    alt={locutor.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter saturate-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121420] via-[#121420]/30 to-transparent"></div>
                  
                  {/* Live Status Tag */}
                  {locutor.isLiveNow && (
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/50 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                      <span>NO AR AGORA</span>
                    </div>
                  )}

                  {/* Program Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-amber-300 font-display font-black text-xs uppercase tracking-wider">
                      {locutor.show}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-white/90 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                      <Clock className="w-3 h-3 text-red-400" />
                      {locutor.time}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-black text-xl text-white group-hover:text-red-400 transition-colors">
                      {locutor.name}
                    </h3>
                    <p className="text-xs text-zinc-300 font-medium mt-2 leading-relaxed">
                      {locutor.bio}
                    </p>
                  </div>

                  {/* Social & Contact Bar */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <a
                      href={locutor.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>{locutor.instagram}</span>
                    </a>

                    <a
                      href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Olá! Quero mandar um abraço para o locutor ${locutor.name} da Clube FM!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-600/30 border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-300 text-xs font-bold transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mandar Alô</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
