import React from "react";
import { Instagram, Facebook, Youtube, Heart, MapPin, Radio } from "lucide-react";
import ClubeLogo from "./ClubeLogo";
import { RADIO_CONFIG } from "../config/radioConfig";

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

interface FooterBarProps {
  isPlaying: boolean;
  onOpenProgramacao?: () => void;
  onOpenLocutores?: () => void;
  onOpenNoticias?: () => void;
  onOpenContato?: () => void;
}

export default function FooterBar({
  isPlaying,
  onOpenProgramacao,
  onOpenLocutores,
  onOpenNoticias,
  onOpenContato,
}: FooterBarProps) {
  return (
    <footer className="bg-[#06070a] text-zinc-400 pt-16 pb-28 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ClubeLogo size="md" />
            </div>
            <p className="font-display font-black text-lg text-white">
              Clube 87,9 FM
            </p>
            <p className="text-zinc-400 leading-relaxed text-xs">
              “A Rádio do Coração” – Sintonize a melhor programação musical, notícias com credibilidade e prêmios em Criciúma e Sul de Santa Catarina.
            </p>
            <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Criciúma – Santa Catarina</span>
            </div>
          </div>

          {/* Col 2: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2 font-bold text-zinc-400">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#programacao" onClick={onOpenProgramacao} className="hover:text-red-400 transition-colors">
                  Programação
                </a>
              </li>
              <li>
                <a href="#locutores" onClick={onOpenLocutores} className="hover:text-red-400 transition-colors">
                  Locutores
                </a>
              </li>
              <li>
                <a href="#noticias" onClick={onOpenNoticias} className="hover:text-red-400 transition-colors">
                  Notícias (Vitrine do Sul)
                </a>
              </li>
              <li>
                <a href="#anuncie" className="hover:text-red-400 transition-colors">
                  Anuncie Conosco
                </a>
              </li>
              <li>
                <button onClick={onOpenContato} className="hover:text-red-400 transition-colors text-left cursor-pointer">
                  Contato & WhatsApp
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Redes Sociais Oficiais */}
          <div className="space-y-3">
            <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
              Redes Sociais
            </h4>
            <p className="text-xs text-zinc-400">
              Siga a Clube FM nas redes sociais e participe das promoções ao vivo:
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={RADIO_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={RADIO_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={RADIO_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10"
                title="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={RADIO_CONFIG.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 border border-white/10"
                title="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 4: Transmissão Ao Vivo & Streaming */}
          <div className="space-y-3">
            <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
              Transmissão
            </h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-black text-xs uppercase">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>87,9 FM em Criciúma</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Streaming digital 128 kbps HD estéreo disponível em qualquer lugar do planeta.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                  Servidor Online 24/7
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Equalizer Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-medium text-zinc-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Rádio Clube 87,9 FM – Criciúma/SC. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-3">
            <span className="font-marker text-amber-300 text-xs">
              A RÁDIO DO CORAÇÃO
            </span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-heartbeat" />
            
            {/* Equalizer */}
            <div className="flex items-end gap-0.5 h-3.5 ml-2">
              <span className={`w-0.5 bg-red-500 rounded-full transition-all ${isPlaying ? "h-3.5 animate-[waveBar_0.7s_ease-in-out_infinite]" : "h-1"}`}></span>
              <span className={`w-0.5 bg-amber-400 rounded-full transition-all ${isPlaying ? "h-2.5 animate-[waveBar_0.5s_ease-in-out_infinite_0.2s]" : "h-1.5"}`}></span>
              <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isPlaying ? "h-3 animate-[waveBar_0.8s_ease-in-out_infinite_0.4s]" : "h-1"}`}></span>
              <span className={`w-0.5 bg-red-500 rounded-full transition-all ${isPlaying ? "h-2 animate-[waveBar_0.6s_ease-in-out_infinite_0.1s]" : "h-2"}`}></span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
