import React from "react";
import { Calendar, Mic, Newspaper, Megaphone, ArrowRight } from "lucide-react";

interface ActionCardsGridProps {
  onOpenProgramacao: () => void;
  onOpenLocutores: () => void;
  onOpenNoticias: () => void;
  onOpenAnuncie: () => void;
}

export default function ActionCardsGrid({
  onOpenProgramacao,
  onOpenLocutores,
  onOpenNoticias,
  onOpenAnuncie,
}: ActionCardsGridProps) {
  const cards = [
    {
      id: "programacao",
      title: "PROGRAMAÇÃO",
      description: "Confira nossa grade e não perca seu programa favorito!",
      icon: Calendar,
      colorGradient: "from-[#ff1e38] to-[#ff5268]",
      hoverBorder: "hover:border-[#ff1e38]/70",
      arrowBg: "group-hover:bg-[#ff1e38]",
      shadowGlow: "group-hover:shadow-[0_0_25px_rgba(255,30,56,0.35)]",
      badgeText: "Grade 24h",
      onClick: onOpenProgramacao,
    },
    {
      id: "locutores",
      title: "LOCUTORES",
      description: "Conheça as vozes que fazem a Clube todo dia!",
      icon: Mic,
      colorGradient: "from-[#0066ff] to-[#00c6ff]",
      hoverBorder: "hover:border-[#0066ff]/70",
      arrowBg: "group-hover:bg-[#0066ff]",
      shadowGlow: "group-hover:shadow-[0_0_25px_rgba(0,102,255,0.35)]",
      badgeText: "Vozes do Rádio",
      onClick: onOpenLocutores,
    },
    {
      id: "noticias",
      title: "ÚLTIMAS NOTÍCIAS",
      description: "Fique por dentro do que acontece em Criciúma e região!",
      icon: Newspaper,
      colorGradient: "from-[#ff9900] to-[#ffc72c]",
      hoverBorder: "hover:border-[#ff9900]/70",
      arrowBg: "group-hover:bg-[#ff9900]",
      shadowGlow: "group-hover:shadow-[0_0_25px_rgba(255,153,0,0.35)]",
      badgeText: "Vitrine do Sul",
      onClick: onOpenNoticias,
    },
    {
      id: "anuncie",
      title: "ANUNCIE CONOSCO",
      description: "Sua marca mais perto de milhares de ouvintes. Fale com a gente!",
      icon: Megaphone,
      colorGradient: "from-[#00d2ff] to-[#0077ff]",
      hoverBorder: "hover:border-[#00d2ff]/70",
      arrowBg: "group-hover:bg-[#00d2ff]",
      shadowGlow: "group-hover:shadow-[0_0_25px_rgba(0,210,255,0.35)]",
      badgeText: "Comercial",
      onClick: onOpenAnuncie,
    },
  ];

  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              id={`action-card-${card.id}`}
              key={card.id}
              onClick={card.onClick}
              className={`group bg-[#11131a]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-white/10 ${card.hoverBorder} ${card.shadowGlow} hover:-translate-y-2 transition-all duration-300 flex items-center justify-between gap-4 text-left cursor-pointer w-full relative overflow-hidden shadow-2xl`}
            >
              {/* Top ambient glow strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.colorGradient} opacity-60 group-hover:opacity-100 transition-opacity`}
              ></div>

              <div className="flex items-center gap-4 min-w-0">
                {/* 3D-styled Icon box */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.colorGradient} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Text info */}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-black text-white text-sm tracking-tight leading-tight group-hover:text-white transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-zinc-300 leading-snug line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Arrow action circle */}
              <div
                className={`w-9 h-9 rounded-full bg-white/10 text-zinc-200 flex items-center justify-center shrink-0 ${card.arrowBg} group-hover:text-white transition-all duration-300 group-hover:translate-x-1 border border-white/10`}
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
