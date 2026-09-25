import React, { useState, useEffect } from "react";
import { Play, Pause, Download, Music, Users, Star, Volume2, Sparkles, MessageCircle, Radio, RadioTower } from "lucide-react";
import { RADIO_CONFIG } from "../config/radioConfig";

interface HeroSectionProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onDownloadApp: () => void;
}

const STADIUM_BG_URL = "https://i.ibb.co/rRGvQVBw/Chat-GPT-Image-30-de-ago-de-2026-11-51-34.png";
const OFFICIAL_LOGO_URL = "https://radioclubecriciuma.com/imagens/logoclubepng.png";

export default function HeroSection({
  isPlaying,
  onTogglePlay,
  onDownloadApp,
}: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-gradient-to-br from-[#3c095c] via-[#5e197d] to-[#b81b5c] text-white overflow-hidden min-h-[620px] lg:min-h-[720px] flex items-center border-b border-white/15 select-none"
    >
      {/* 1. Stadium Watermark Background with Parallax and Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Stadium Image Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay transition-transform duration-700 ease-out scale-105"
          style={{
            backgroundImage: `url('${STADIUM_BG_URL}')`,
            transform: `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px, 0) scale(1.05)`,
          }}
        />

        {/* Dynamic Light Gradients for Rich Color Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2c0543]/90 via-[#4e1369]/60 to-[#9d1550]/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b0329]/95 via-transparent to-[#2c0543]/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.12),transparent_55%)]"></div>

        {/* Ambient Neon Orbs */}
        <div
          className="absolute top-10 left-1/4 w-96 h-96 bg-[#c71f65]/25 rounded-full blur-3xl pointer-events-none animate-pulse"
          style={{
            transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
          }}
        ></div>
        <div
          className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#5a189a]/35 rounded-full blur-3xl pointer-events-none"
          style={{
            transform: `translate3d(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px, 0)`,
          }}
        ></div>
        <div className="absolute -top-16 right-12 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Column: Radio Branding, Slogans & Primary CTA */}
        <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
          
          {/* Top Status Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            {/* Live On-Air Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="font-extrabold text-xs uppercase tracking-widest text-[#fce315]">
                AO VIVO EM 87,9 FM • CRICIÚMA/SC
              </span>
            </div>

            {/* Favorite Station Tag */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-bold tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ffdf00]" />
              <span>A RÁDIO DO CORAÇÃO</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.08] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              RÁDIO CLUBE FM 87.9 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe066] via-[#ffffff] to-[#ffb3c1]">
                A SUA RÁDIO FAVORITA!
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium max-w-2xl leading-relaxed drop-shadow-sm mx-auto lg:mx-0">
              Sintonize na rádio número 1 de Criciúma e Sul de SC! Músicas mais tocadas, promoções exclusivas, VIP Clube e notícias em tempo real.
            </p>
          </div>

          {/* Action Buttons: Ouvir Ao Vivo + WhatsApp Pedir Música + Baixar App */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            
            {/* 1. Main Primary Button: OUVIR AO VIVO */}
            <button
              id="hero-ouca-ao-vivo-btn"
              onClick={onTogglePlay}
              className="w-full sm:w-auto flex items-center justify-center gap-3.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#ff1e56] via-[#ff2a6d] to-[#d81159] hover:from-[#e01445] hover:to-[#c20d4e] text-white font-black text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(255,30,86,0.45)] hover:shadow-[0_12px_35px_rgba(255,30,86,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer border border-white/25"
            >
              <div className="w-9 h-9 rounded-full bg-white text-[#d81159] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </div>
              <span className="font-black text-sm tracking-wide">
                {isPlaying ? "PAUSAR TRANSMISSÃO" : "OUVIR AO VIVO"}
              </span>

              {/* Animated Equalizer Wave Bars */}
              <div className="flex items-end gap-1 ml-1 bg-black/25 px-2.5 py-1.5 rounded-full">
                <span className={`w-1 bg-white rounded-full transition-all ${isPlaying ? "h-4 animate-[waveBar_0.6s_ease-in-out_infinite]" : "h-1.5"}`}></span>
                <span className={`w-1 bg-white rounded-full transition-all ${isPlaying ? "h-6 animate-[waveBar_0.8s_ease-in-out_infinite_0.15s]" : "h-2.5"}`}></span>
                <span className={`w-1 bg-white rounded-full transition-all ${isPlaying ? "h-4 animate-[waveBar_0.5s_ease-in-out_infinite_0.3s]" : "h-1.5"}`}></span>
              </div>
            </button>

            {/* 2. WhatsApp Button: Pedir Música (Padronizado 55 48 99195-0093) */}
            <a
              id="hero-pedir-musica-btn"
              href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(RADIO_CONFIG.whatsappMessageSong)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#1faa52] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>PEDIR MÚSICA</span>
            </a>

            {/* 3. Download App Button */}
            <button
              id="hero-baixe-o-app-btn"
              onClick={onDownloadApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#ffdf00]" />
              <span>BAIXAR APP</span>
            </button>
          </div>

          {/* Bottom Highlight Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-3 text-xs font-black text-white/90">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-sm">
              <Music className="w-4 h-4 text-[#ffdf00]" />
              <span className="tracking-wider">MAIS MÚSICA</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-sm">
              <Users className="w-4 h-4 text-[#57ebff]" />
              <span className="tracking-wider">MAIS INFORMAÇÃO</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-sm">
              <Star className="w-4 h-4 text-[#ff4b72] fill-current" />
              <span className="tracking-wider">MAIS VOCÊ</span>
            </div>
          </div>
        </div>

        {/* Right Column: Glassmorphism Live Radio Station Card */}
        <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-end">
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-7 bg-white/10 backdrop-blur-xl border border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-white/40 group relative overflow-hidden"
            style={{
              transform: `translate3d(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px, 0)`,
            }}
          >
            {/* Card Background Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ff1e56]/30 rounded-full blur-2xl pointer-events-none"></div>

            {/* Station Header in Card */}
            <div className="flex items-center justify-between pb-5 border-b border-white/15 relative z-10">
              <div className="flex items-center gap-3">
                <img
                  src={OFFICIAL_LOGO_URL}
                  alt="Clube 87,9 FM"
                  className="h-12 w-auto object-contain drop-shadow-md"
                />
                <div>
                  <h2 className="font-black text-sm text-white tracking-wide">
                    {RADIO_CONFIG.stationName}
                  </h2>
                  <p className="text-xs text-white/70 font-semibold">
                    {RADIO_CONFIG.slogan}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/25 border border-red-400/40 text-red-200 text-[10px] font-black uppercase tracking-wider animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                AO VIVO
              </div>
            </div>

            {/* Currently Playing Program */}
            <div className="py-5 space-y-2 relative z-10">
              <div className="text-[11px] uppercase tracking-wider text-[#ffe066] font-extrabold flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>NO AR AGORA NA CLUBE:</span>
              </div>
              <h3 className="font-display font-black text-xl text-white group-hover:text-[#ffe066] transition-colors">
                Tarde Show com Camila Rocha
              </h3>
              <p className="text-xs text-white/80 font-medium">
                Pop, Sertanejo e as notícias mais quentes do Sul de Santa Catarina.
              </p>
            </div>

            {/* Audio Wave Visualizer Bars */}
            <div className="flex items-end justify-between h-10 px-4 py-2 bg-black/40 rounded-2xl border border-white/10 relative z-10">
              {[35, 75, 50, 90, 65, 85, 40, 95, 70, 55, 80, 60, 45, 90, 65, 40].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 sm:w-1.5 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? "bg-gradient-to-t from-[#ff1e56] to-[#ffe066]"
                      : "bg-white/20"
                  }`}
                  style={{
                    height: isPlaying ? `${h}%` : "20%",
                    animation: isPlaying
                      ? `waveBar ${0.5 + (i % 5) * 0.15}s ease-in-out infinite ${(i % 3) * 0.1}s`
                      : "none",
                  }}
                ></span>
              ))}
            </div>

            {/* Interactive Player Controls inside Card */}
            <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between relative z-10">
              <button
                onClick={onTogglePlay}
                className="flex items-center gap-2 text-xs font-black uppercase text-white hover:text-[#ffe066] transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 text-[#ff1e56] fill-current" />
                    <span>Pausar Áudio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-[#ff1e56] fill-current" />
                    <span>Sintonizar Rádio</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-white/70 font-bold">
                128 kbps HD Stereo
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
