import React from "react";
import { Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import ClubeLogo from "./ClubeLogo";
import { RADIO_CONFIG } from "../config/radioConfig";

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

interface PreFooterBarProps {
  onOpenProgramacao: () => void;
  onOpenLocutores: () => void;
  onOpenNoticias: () => void;
  onOpenContato: () => void;
}

export default function PreFooterBar({
  onOpenProgramacao,
  onOpenLocutores,
  onOpenNoticias,
  onOpenContato,
}: PreFooterBarProps) {
  return (
    <section className="bg-[#0b0d16] border-y border-white/10 py-6 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        
        {/* Left: Logo & Subtitle */}
        <div className="flex items-center gap-3">
          <ClubeLogo size="sm" />
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-white text-sm leading-tight">
              {RADIO_CONFIG.stationName}
            </span>
            <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
              {RADIO_CONFIG.slogan}
            </span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2 text-zinc-300">
          <a
            href={RADIO_CONFIG.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600 hover:text-white flex items-center justify-center transition-all"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={RADIO_CONFIG.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all"
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={RADIO_CONFIG.socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-all"
            title="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href={RADIO_CONFIG.socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-all"
            title="TikTok"
          >
            <TikTokIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Vertical Divider */}
        <div className="hidden xl:block h-8 w-px bg-white/10"></div>

        {/* Navigation links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-black text-zinc-300 uppercase tracking-wider">
          <a href="#" className="hover:text-red-400 transition-colors">
            Início
          </a>
          <button onClick={onOpenProgramacao} className="hover:text-red-400 transition-colors cursor-pointer">
            Programação
          </button>
          <button onClick={onOpenLocutores} className="hover:text-red-400 transition-colors cursor-pointer">
            Locutores
          </button>
          <button onClick={onOpenNoticias} className="hover:text-red-400 transition-colors cursor-pointer">
            Notícias
          </button>
          <button onClick={onOpenContato} className="hover:text-red-400 transition-colors cursor-pointer">
            Contato
          </button>
        </nav>

        {/* Vertical Divider */}
        <div className="hidden xl:block h-8 w-px bg-white/10"></div>

        {/* Contact info & Location */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-bold text-zinc-300">
          <a
            href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>{RADIO_CONFIG.whatsappFormatted}</span>
          </a>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span>{RADIO_CONFIG.locationText}</span>
          </div>
        </div>

        {/* Slogan with Heart Doodle */}
        <div className="font-marker text-sm sm:text-base text-amber-300 tracking-wider flex items-center gap-1.5">
          <span>SINTONIZE BOAS ENERGIAS</span>
          <span className="text-red-500 text-lg">❤️</span>
        </div>

      </div>
    </section>
  );
}
