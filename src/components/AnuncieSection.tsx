import React from "react";
import { Megaphone, MessageCircle, Radio, CheckCircle, TrendingUp, Users, MapPin, Award } from "lucide-react";
import { RADIO_CONFIG } from "../config/radioConfig";

export default function AnuncieSection() {
  const stats = [
    { number: "100.000+", label: "Ouvintes mensais", icon: Users },
    { number: "15", label: "Municípios no Sul de SC", icon: MapPin },
    { number: "#1", label: "Rádio do coração do ouvinte", icon: Award },
    { number: "24h", label: "No ar sem parar", icon: TrendingUp },
  ];

  const commercialBenefits = [
    {
      title: "Spots Comerciais de 15s e 30s",
      desc: "Veiculação estratégica nos horários nobres de maior audiência da rádio.",
    },
    {
      title: "Patrocínio de Programas Consagrados",
      desc: "Associe o nome da sua empresa aos líderes de audiência: Manhã Clube, Tarde Show e Clube Esporte.",
    },
    {
      title: "Blitz & Ações de Rua com Locutores",
      desc: "Carro de som e equipe ao vivo na porta do seu comércio atraindo clientes na hora.",
    },
    {
      title: "Combo Rádio + Portal Vitrine do Sul",
      desc: "Mídia integrada com banners no portal mais acessado e menções nas transmissões ao vivo.",
    },
  ];

  return (
    <section id="anuncie" className="relative py-24 bg-[#0a0c16] text-white border-t border-white/10 overflow-hidden">
      {/* Dynamic 3D Glow and Radial Ambient Background */}
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Box */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#121626] via-[#0d101d] to-[#15192d] border-2 border-white/10 p-8 sm:p-12 lg:p-16 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Decorative 3D sound burst effect behind header */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-red-500/10 rounded-full blur-2xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Commercial Pitch */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 font-display font-black text-xs uppercase tracking-widest shadow-lg">
                <Megaphone className="w-4 h-4 animate-bounce" />
                <span>COMERCIAL & PUBLICIDADE 87,9 FM</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
                ANUNCIE NA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
                  CLUBE 87,9 FM
                </span>
              </h2>

              <p className="font-extrabold text-sm sm:text-base text-blue-300 uppercase tracking-widest">
                CONECTE SUA MARCA COM CRICIÚMA E REGIÃO.
              </p>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                A Rádio Clube 87,9 FM é a líder em carinho, audiência e engajamento no Sul Catarinense. Com spots criativos, promoções exclusivas e presença digital massiva, colocamos sua marca dentro da rotina de milhares de consumidores.
              </p>

              {/* Action Button: FALE COM NOSSO COMERCIAL */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  id="anuncie-fale-comercial-btn"
                  href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(RADIO_CONFIG.whatsappMessageCommercial)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer border border-emerald-400/40"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>FALE COM NOSSO COMERCIAL</span>
                </a>

                <div className="text-center sm:text-left">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Atendimento Rápido
                  </p>
                  <p className="text-sm font-mono font-bold text-emerald-400">
                    {RADIO_CONFIG.whatsappFormatted}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Commercial Stats in 3D Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group hover:-translate-y-1.5 shadow-lg"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/30 to-blue-600/30 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-red-400 transition-colors">
                        {stat.number}
                      </p>
                      <p className="text-[11px] font-bold text-zinc-300 mt-1 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Formats Grid */}
          <div className="mt-12 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commercialBenefits.map((format, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-colors space-y-2"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span className="text-white font-display font-black text-xs uppercase tracking-wide">
                    {format.title}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed pl-6">
                  {format.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
