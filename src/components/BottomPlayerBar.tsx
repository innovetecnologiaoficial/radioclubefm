import React, { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Radio, Phone, ChevronUp, ChevronDown } from "lucide-react";
import ClubeLogo from "./ClubeLogo";
import { RADIO_CONFIG } from "../config/radioConfig";

interface BottomPlayerBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function BottomPlayerBar({
  isPlaying,
  onTogglePlay,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}: BottomPlayerBarProps) {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0d0f14]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Station info & Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onTogglePlay}
            className="w-12 h-12 rounded-full bg-[#ff1e38] hover:bg-[#e0142c] text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? "Pausar" : "Ouvir"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <div className="flex items-center gap-3 min-w-0">
            <ClubeLogo size="sm" className="hidden sm:inline-flex" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0"></span>
                <span className="font-display font-black text-white text-xs sm:text-sm truncate">
                  AO VIVO • Clube 87,9 FM
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-400 truncate hidden sm:inline">
                A Rádio do Coração de Criciúma e Região
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Equalizer (desktop) */}
        <div className="hidden md:flex items-center gap-1 h-5 px-4 bg-white/5 rounded-full border border-white/10">
          <span
            className={`w-1 bg-red-500 rounded-full transition-all ${
              isPlaying ? "h-5 animate-[waveBar_0.6s_ease-in-out_infinite]" : "h-1.5"
            }`}
          ></span>
          <span
            className={`w-1 bg-amber-400 rounded-full transition-all ${
              isPlaying ? "h-3 animate-[waveBar_0.8s_ease-in-out_infinite_0.2s]" : "h-1"
            }`}
          ></span>
          <span
            className={`w-1 bg-cyan-400 rounded-full transition-all ${
              isPlaying ? "h-4 animate-[waveBar_0.5s_ease-in-out_infinite_0.4s]" : "h-2"
            }`}
          ></span>
          <span
            className={`w-1 bg-emerald-400 rounded-full transition-all ${
              isPlaying ? "h-5 animate-[waveBar_0.7s_ease-in-out_infinite_0.1s]" : "h-1.5"
            }`}
          ></span>
          <span
            className={`w-1 bg-red-500 rounded-full transition-all ${
              isPlaying ? "h-3 animate-[waveBar_0.9s_ease-in-out_infinite_0.3s]" : "h-2"
            }`}
          ></span>
          <span className="text-[10px] font-black text-white/80 uppercase ml-2 tracking-wider">
            {isPlaying ? "NO AR" : "PAUSADO"}
          </span>
        </div>

        {/* Right: Volume & WhatsApp CTA */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Volume Control */}
          <div className="relative flex items-center">
            <button
              onClick={onToggleMute}
              onMouseEnter={() => setShowVolumeSlider(true)}
              className="p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Desmutar" : "Mutar"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5 text-red-400" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            {/* Volume range slider */}
            <div
              className={`hidden sm:flex items-center transition-all ${
                showVolumeSlider ? "w-24 opacity-100 mr-2" : "w-20 opacity-80"
              }`}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  onVolumeChange(parseFloat(e.target.value));
                  if (isMuted) onToggleMute();
                }}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#ff1e38]"
              />
            </div>
          </div>

          {/* WhatsApp Direct Action */}
          <a
            href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(RADIO_CONFIG.whatsappMessageSong)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-emerald-600/30 hover:scale-105 active:scale-95"
            title="Pedir música no WhatsApp"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Pedir Música</span>
          </a>
        </div>

      </div>
    </div>
  );
}
