import React, { useState } from "react";
import { Search, Play, Pause, Menu, X, Instagram, Facebook, Youtube } from "lucide-react";
import ClubeLogo from "./ClubeLogo";

// TikTok custom SVG icon
const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

interface HeaderNavProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenProgramacao: () => void;
  onOpenLocutores: () => void;
  onOpenNoticias: () => void;
  onOpenContato: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export default function HeaderNav({
  isPlaying,
  onTogglePlay,
  onOpenProgramacao,
  onOpenLocutores,
  onOpenNoticias,
  onOpenContato,
  searchQuery,
  onSearchChange,
}: HeaderNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f14]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center group shrink-0">
          <ClubeLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white">
          <a
            href="#"
            className="px-5 py-2 rounded-full bg-[#ff204e] text-white shadow-md shadow-red-500/25 hover:bg-[#e61742] transition-all"
          >
            Início
          </a>
          <button
            onClick={onOpenProgramacao}
            className="px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Programação
          </button>
          <button
            onClick={onOpenLocutores}
            className="px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Locutores
          </button>
          <button
            onClick={onOpenNoticias}
            className="px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Notícias
          </button>
          <button
            onClick={onTogglePlay}
            className="px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            Ao Vivo
          </button>
          <button
            onClick={onOpenContato}
            className="px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Contato
          </button>
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Buscar no site..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 focus:border-[#ff204e] rounded-full px-4 py-1.5 pl-9 text-xs text-white placeholder-white/50 focus:outline-none transition-all"
          />
          <Search className="w-3.5 h-3.5 text-white/50 absolute left-3 pointer-events-none" />
        </div>

        {/* Social Icons & Listen CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5 text-white/80 border-r border-white/10 pr-4">
            <a
              href="https://www.instagram.com/clubefmcriciuma/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600 hover:text-white flex items-center justify-center transition-all duration-300"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-300"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-all duration-300"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300"
              title="TikTok"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>

          {/* OUÇA AGORA Button */}
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff1e38] hover:bg-[#e0142c] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Ouça Agora</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle & Play Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={onTogglePlay}
            className="p-2 rounded-full bg-[#ff1e38] text-white flex items-center justify-center"
            title={isPlaying ? "Pausar" : "Ouvir"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0d0f14] border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Buscar no site..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 text-sm text-white placeholder-white/50 focus:outline-none"
            />
            <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
          </div>

          <div className="flex flex-col space-y-2 text-sm font-black uppercase tracking-wider text-white">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-[#ff204e] text-white"
            >
              Início
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProgramacao();
              }}
              className="text-left px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Programação
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLocutores();
              }}
              className="text-left px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Locutores
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNoticias();
              }}
              className="text-left px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Notícias
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTogglePlay();
              }}
              className="text-left px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between"
            >
              <span>Ao Vivo</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-600 text-white font-bold">
                {isPlaying ? "Tocando" : "Ouvir"}
              </span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContato();
              }}
              className="text-left px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Contato
            </button>
          </div>

          {/* Socials on mobile */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-around text-white/80">
            <a href="https://www.instagram.com/clubefmcriciuma/" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-[#ff204e]">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-red-500">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-white">
              <TikTokIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
