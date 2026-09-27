import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Ticket, Info, Calendar, Trophy, CheckCircle2 } from 'lucide-react';

export interface GameFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  dateStr: string;
  label: string;
  competition: string;
  stadium: string;
}

const TEAM_LOGOS: Record<string, string> = {
  "criciúma": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Crici%C3%BAma_EC_2025_crest.svg/500px-Crici%C3%BAma_EC_2025_crest.svg.png",
  "londrina": "https://upload.wikimedia.org/wikipedia/pt/9/96/Londrina_EC.png",
  "ceará": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/500px-Cear%C3%A1_Sporting_Club_logo.svg.png",
  "abc": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/ABC_FC_%28E%29_-_RN.svg/500px-ABC_FC_%28E%29_-_RN.svg.png",
  "são bernardo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/S%C3%A3o_Bernardo_FC_2020_crest.png/500px-S%C3%A3o_Bernardo_FC_2020_crest.png",
  "sport": "https://thumb.wikimedia.org/wikipedia/pt/thumb/1/1a/Sport-clube-recife.svg/500px-Sport-clube-recife.svg.png",
  "ponte preta": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_AA_Ponte_Preta.svg/500px-Logo_AA_Ponte_Preta.svg.png",
  "avaí": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Ava%C3%AD_Futebol_Clube_logo.svg/500px-Ava%C3%AD_Futebol_Clube_logo.svg.png"
};

// Calendário Oficial Real do Criciúma Esporte Clube (Brasileirão Série B 2026)
const OFFICIAL_FIXTURES: GameFixture[] = [
  {
    id: "g1",
    homeTeam: "Londrina",
    awayTeam: "Criciúma",
    dateStr: "2026-10-02T20:30:00-03:00",
    label: "02/10/2026 - 20:30 (Sexta-feira)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO VITORINO GONÇALVES DIAS (LONDRINA/PR)",
  },
  {
    id: "g2",
    homeTeam: "Ceará",
    awayTeam: "Criciúma",
    dateStr: "2026-10-08T19:00:00-03:00",
    label: "08/10/2026 - 19:00 (Quinta-feira)",
    competition: "Brasileirão Série B 2026",
    stadium: "ARENA CASTELÃO (FORTALEZA/CE)",
  },
  {
    id: "g3",
    homeTeam: "Criciúma",
    awayTeam: "ABC",
    dateStr: "2026-10-12T19:30:00-03:00",
    label: "12/10/2026 - 19:30 (Segunda-feira)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO HERIBERTO HÜLSE (MAJESTOSO)",
  },
  {
    id: "g4",
    homeTeam: "São Bernardo",
    awayTeam: "Criciúma",
    dateStr: "2026-10-18T16:00:00-03:00",
    label: "18/10/2026 - 16:00 (Domingo)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO 1º DE MAIO (SÃO BERNARDO/SP)",
  },
  {
    id: "g5",
    homeTeam: "Sport",
    awayTeam: "Criciúma",
    dateStr: "2026-10-24T15:00:00-03:00",
    label: "24/10/2026 - 15:00 (Sábado)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO DA ILHA DO RETIRO (RECIFE/PE)",
  },
  {
    id: "g6",
    homeTeam: "Criciúma",
    awayTeam: "Ponte Preta",
    dateStr: "2026-10-31T15:00:00-03:00",
    label: "31/10/2026 - 15:00 (Sábado)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO HERIBERTO HÜLSE (MAJESTOSO)",
  }
];

export default function NextGameCountdown() {
  // Retorna os jogos futuros com base na data atual real
  const activeGames = useMemo(() => {
    const now = new Date().getTime();
    const future = OFFICIAL_FIXTURES.filter(g => new Date(g.dateStr).getTime() > now);
    return future.length > 0 ? future : [OFFICIAL_FIXTURES[OFFICIAL_FIXTURES.length - 1]];
  }, []);

  const [selectedGameId, setSelectedGameId] = useState<string>(activeGames[0]?.id || "g1");

  // Garante que o jogo ativo sempre exista
  const activeGame = useMemo(() => {
    return activeGames.find(g => g.id === selectedGameId) || activeGames[0];
  }, [activeGames, selectedGameId]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(activeGame.dateStr).getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeGame]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const getLogo = (name: string) => {
    const lower = name.toLowerCase().trim();
    return TEAM_LOGOS[lower] || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=111111&color=fce315&font-size=0.33&size=128&bold=true`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pt-10">
      <div 
        className="bg-[#111111] border border-slate-800/90 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col gap-8"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(17, 17, 17, 0.95) 0%, rgba(17, 17, 17, 0.65) 50%, rgba(17, 17, 17, 0.95) 100%), url("https://i.ibb.co/rRGvQVBw/Chat-GPT-Image-30-de-ago-de-2026-11-51-34.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Glow ambient effects com as cores da Clube FM */}
        <div className="absolute top-0 left-0 -mt-20 -ml-20 w-80 h-80 bg-[#663b86] rounded-full blur-[110px] opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-[#ff3e5e] rounded-full blur-[110px] opacity-25 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[#fce315] rounded-full blur-[140px] opacity-10 pointer-events-none"></div>

        {/* Top Header Bar: Resultado Oficial do Último Jogo + Navegação Real */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Resultado Real do Último Jogo */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Último Resultado:</span>
            <span className="text-white font-black">Criciúma 3 x 0 Avaí</span>
            <span className="bg-emerald-500 text-black text-[10px] uppercase font-black px-2 py-0.5 rounded-full ml-1 hidden sm:inline-block">Goleada no Clássico</span>
          </div>

          {/* Abas com a Tabela Oficial */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden md:inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#fce315]" />
              Próximas Rodadas:
            </span>
            {activeGames.slice(0, 4).map((game, idx) => (
              <button
                key={game.id}
                onClick={() => setSelectedGameId(game.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  selectedGameId === game.id 
                    ? "bg-[#fce315] text-[#111111] shadow-lg shadow-[#fce315]/20 scale-102"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                <span>{idx === 0 ? "Próximo" : `Rodada ${idx + 1}`}: {game.homeTeam} x {game.awayTeam}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Confronto Selecionado */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
          {/* Informações da Partida */}
          <div className="flex flex-col gap-3 text-center lg:text-left w-full lg:w-1/3">
            <div className="flex flex-col items-center lg:items-start leading-none uppercase italic transform -skew-x-6">
              <span className="text-4xl lg:text-5xl font-black text-[#fce315] drop-shadow-md">PRÓXIMO</span>
              <span className="text-4xl lg:text-5xl font-black text-white drop-shadow-md tracking-wide" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>JOGO DO TIGRE</span>
            </div>
            
            <div className="mt-2 flex flex-col gap-1">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                {activeGame.homeTeam} <span className="text-[#fce315]">X</span> {activeGame.awayTeam}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#fce315]" />
                {activeGame.competition}
              </p>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-300 font-medium text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#ff3e5e] shrink-0" />
              <span>{activeGame.stadium}</span>
            </div>
          </div>

          {/* Escudos dos Times */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 w-full lg:w-1/3">
            {/* Mandante */}
            <div className="flex flex-col items-center group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={getLogo(activeGame.homeTeam)} 
                  alt={activeGame.homeTeam} 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)]"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeGame.homeTeam)}&background=111111&color=fce315&font-size=0.33&size=128&bold=true`;
                  }}
                />
              </div>
              <span className="text-xs font-black text-white uppercase tracking-wider mt-2.5 text-center">
                {activeGame.homeTeam}
              </span>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-black text-[#fce315] italic drop-shadow-md">VS</span>
            </div>

            {/* Visitante */}
            <div className="flex flex-col items-center group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={getLogo(activeGame.awayTeam)} 
                  alt={activeGame.awayTeam} 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(252,227,21,0.2)]"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeGame.awayTeam)}&background=111111&color=fff&font-size=0.33&size=128&bold=true`;
                  }}
                />
              </div>
              <span className="text-xs font-black text-white uppercase tracking-wider mt-2.5 text-center">
                {activeGame.awayTeam}
              </span>
            </div>
          </div>

          {/* Cronômetro e Botões de Ação */}
          <div className="flex flex-col items-center lg:items-end w-full lg:w-1/3 gap-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-slate-200 tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-[#fce315]" />
              <span>{activeGame.label}</span>
            </div>
            
            {/* Contagem Regressiva */}
            <div className="flex items-center gap-2 sm:gap-3 text-center">
              <div className="flex flex-col gap-1 min-w-[50px] sm:min-w-[60px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fce315] drop-shadow-[0_2px_10px_rgba(252,227,21,0.3)] font-mono leading-none">
                  {formatNumber(timeLeft.days)}
                </div>
                <span className="text-[9px] sm:text-[10px] font-black text-white/60 uppercase tracking-wider mt-1">Dias</span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-600 -mt-4">:</span>
              
              <div className="flex flex-col gap-1 min-w-[50px] sm:min-w-[60px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fce315] drop-shadow-[0_2px_10px_rgba(252,227,21,0.3)] font-mono leading-none">
                  {formatNumber(timeLeft.hours)}
                </div>
                <span className="text-[9px] sm:text-[10px] font-black text-white/60 uppercase tracking-wider mt-1">Horas</span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-600 -mt-4">:</span>

              <div className="flex flex-col gap-1 min-w-[50px] sm:min-w-[60px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fce315] drop-shadow-[0_2px_10px_rgba(252,227,21,0.3)] font-mono leading-none">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <span className="text-[9px] sm:text-[10px] font-black text-white/60 uppercase tracking-wider mt-1">Minutos</span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-600 -mt-4">:</span>

              <div className="flex flex-col gap-1 min-w-[50px] sm:min-w-[60px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fce315] drop-shadow-[0_2px_10px_rgba(252,227,21,0.3)] font-mono leading-none">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <span className="text-[9px] sm:text-[10px] font-black text-white/60 uppercase tracking-wider mt-1">Segundos</span>
              </div>
            </div>

            {/* Links Oficiais */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full mt-1">
              <a 
                href="https://criciuma.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
              >
                <Info className="w-3.5 h-3.5" />
                Portal do Tigre
              </a>
              <a 
                href="https://criciuma.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#fce315] text-[#111111] font-black text-xs uppercase tracking-wider hover:bg-[#ffe83b] hover:scale-102 transition-all duration-300 shadow-lg shadow-[#fce315]/15"
              >
                <Ticket className="w-3.5 h-3.5" />
                Ingressos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
