import React from "react";
import { X, Mic, Instagram, Radio, Heart } from "lucide-react";

interface LocutoresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocutoresModal({ isOpen, onClose }: LocutoresModalProps) {
  if (!isOpen) return null;

  const locutores = [
    {
      name: "Lucas Andrade",
      show: "Manhã Clube (08h às 12h)",
      bio: "A voz mais animada da manhã! Trazendo alto-astral, prêmios e a participação dos ouvintes em tempo real.",
      instagram: "@lucasclube87",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Camila Rocha",
      show: "Tarde Show (13h às 17h)",
      bio: "Divertida e conectada! Os maiores sucessos das paradas mundiais, sertanejo e as novidades das redes sociais.",
      instagram: "@camilasomclube",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Marco Silva",
      show: "Clube Esporte (17h às 19h)",
      bio: "Jornalista esportivo raiz. Paixão pelo Tigre (Criciúma E.C.) e análises cirúrgicas do futebol catarinense e nacional.",
      instagram: "@marcosilvaclube",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Zé da Viola",
      show: "Amanhecer no Sertão (05h às 08h)",
      bio: "Mais de 25 anos de tradição sertaneja, café quentinho e muita prosa boa para a gente trabalhadora do Sul.",
      instagram: "@zedaviolaclube",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0088ff] rounded-2xl text-white shadow-lg">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Nossos Locutores
              </h2>
              <p className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
                As vozes que conectam Criciúma e o Sul de SC
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {locutores.map((loc, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={loc.image}
                  alt={loc.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/30 group-hover:border-cyan-400 transition-colors shrink-0 shadow-md"
                />
                <div>
                  <h4 className="font-black text-white text-base leading-tight">
                    {loc.name}
                  </h4>
                  <p className="text-xs font-bold text-cyan-400 mt-0.5">{loc.show}</p>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                    <Instagram className="w-3 h-3 text-pink-400" />
                    {loc.instagram}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {loc.bio}
              </p>

              <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span className="flex items-center gap-1 text-red-400">
                  <Heart className="w-3.5 h-3.5 fill-current" /> No ar diariamente
                </span>
                <span className="text-cyan-300">Clube 87,9 FM</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
