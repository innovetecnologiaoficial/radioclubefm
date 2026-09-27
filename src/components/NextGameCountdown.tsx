import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Ticket, Info, Calendar, Trophy, CheckCircle2, ChevronRight } from 'lucide-react';

export interface GameFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  dateStr: string;
  label: string;
  competition: string;
  stadium: string;
  homeScore?: number;
  awayScore?: number;
}

const TEAM_LOGOS: Record<string, string> = {
  "criciúma": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Crici%C3%BAma_EC_2025_crest.svg/500px-Crici%C3%BAma_EC_2025_crest.svg.png",
  "chapecoense": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Logo_Associa%C3%A7%C3%A3o_Chapecoense_de_Futebol.svg/500px-Logo_Associa%C3%A7%C3%A3o_Chapecoense_de_Futebol.svg.png",
  "coritiba": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Coritiba_Foot_Ball_Club_logo.svg/500px-Coritiba_Foot_Ball_Club_logo.svg.png",
  "américa-mg": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Escudo_oficial_do_Am%C3%A9rica_Futebol_Clube.svg/500px-Escudo_oficial_do_Am%C3%A9rica_Futebol_Clube.svg.png",
  "santos": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Santos_logo.svg/500px-Santos_logo.svg.png",
  "operário-pr": "https://upload.wikimedia.org/wikipedia/commons/9/90/Oper%C3%A1rio_Ferrovi%C3%A1rio_EC_%28no_stars%29.png",
  "avaí": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Ava%C3%AD_Futebol_Clube_logo.svg/500px-Ava%C3%AD_Futebol_Clube_logo.svg.png",
  "figueirense": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Figueirense_Futebol_Clube.svg/500px-Figueirense_Futebol_Clube.svg.png",
  "crb": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/CRB_logo.svg/500px-CRB_logo.svg.png",
  "sport": "https://thumb.wikimedia.org/wikipedia/pt/thumb/1/1a/Sport-clube-recife.svg/500px-Sport-clube-recife.svg.png",
  "flamengo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Clube_de_Regatas_do_Flamengo_logo.svg/500px-Clube_de_Regatas_do_Flamengo_logo.svg.png",
  "palmeiras": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/SE_Palmeiras_2025_crest.png/500px-SE_Palmeiras_2025_crest.png",
  "são paulo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/S%C3%A3o_Paulo_Futebol_Clube_logo_%282022%29.svg/500px-S%C3%A3o_Paulo_Futebol_Clube_logo_%282022%29.svg.png",
  "grêmio": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Gremio_logo.svg/500px-Gremio_logo.svg.png",
  "internacional": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/500px-Escudo_do_Sport_Club_Internacional.svg.png"
};

// Fixture schedule for Criciúma EC
const BASE_FIXTURES: GameFixture[] = [
  {
    id: "g1",
    homeTeam: "Criciúma",
    awayTeam: "Chapecoense",
    dateStr: "2026-10-04T16:00:00-03:00",
    label: "04/10/2026 - 16:00 (Domingo)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO HERIBERTO HÜLSE (MAJESTOSO)",
  },
  {
    id: "g2",
    homeTeam: "Coritiba",
    awayTeam: "Criciúma",
    dateStr: "2026-10-11T18:30:00-03:00",
    label: "11/10/2026 - 18:30 (Domingo)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO COUTO PEREIRA",
  },
  {
    id: "g3",
    homeTeam: "Criciúma",
    awayTeam: "América-MG",
    dateStr: "2026-10-18T19:00:00-03:00",
    label: "18/10/2026 - 19:00 (Domingo)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO HERIBERTO HÜLSE (MAJESTOSO)",
  },
  {
    id: "g4",
    homeTeam: "Santos",
    awayTeam: "Criciúma",
    dateStr: "2026-10-25T16:00:00-03:00",
    label: "25/10/2026 - 16:00 (Domingo)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO DA VILA BELMIRO",
  },
  {
    id: "g5",
    homeTeam: "Criciúma",
    awayTeam: "Figueirense",
    dateStr: "2026-11-01T19:00:00-03:00",
    label: "01/11/2026 - 19:00 (Domingo)",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO HERIBERTO HÜLSE (MAJESTOSO)",
  }
];

// Helper to generate dynamic future fixtures if all calendar matches pass
function getDynamicUpcomingFixtures(): GameFixture[] {
  const now = new Date();
  const futureGames = BASE_FIXTURES.filter(g => new Date(g.dateStr).getTime() > now.getTime());

  if (futureGames.length > 0) {
    return futureGames;
  }

  // If time moves beyond BASE_FIXTURES, auto-roll next matches
  const dynamicGames: GameFixture[] = [];
  const opponents = ["Chapecoense", "Avaí", "Coritiba", "Santos", "América-MG", "Figueirense", "Operário-PR", "CRB"];

  for (let i = 1; i <= 3; i++) {
    const gameDate = new Date(now.getTime() + i * 7 * 24 * 60 * 60 * 1000);
    gameDate.setHours(16, 0, 0, 0);
    const day = String(gameDate.getDate()).padStart(2, '0');
    const month = String(gameDate.getMonth() + 1).padStart(2, '0');
    const year = gameDate.getFullYear();
    const opponent = opponents[(now.getMonth() + i) % opponents.length];
    const isHome = i % 2 !== 0;

    dynamicGames.push({
      id: `dyn-${i}`,
      homeTeam: isHome ? "Criciúma" : opponent,
      awayTeam: isHome ? opponent : "Criciúma",
      dateStr: gameDate.toISOString(),
      label: `${day}/${month}/${year} - 16:00 (Domingo)`,
      competition: "Brasileirão Série B",
      stadium: isHome ? "ESTÁDIO HERIBERTO HÜLSE" : `ESTÁDIO DO ${opponent.toUpperCase()}`,
    });
  }

  return dynamicGames;
}

export default function NextGameCountdown() {
  const upcomingGames = useMemo(() => getDynamicUpcomingFixtures(), []);
  const [selectedGameId, setSelectedGameId] = useState<string>(upcomingGames[0]?.id || "g1");

  const activeGame = useMemo(() => {
    return upcomingGames.find(g => g.id === selectedGameId) || upcomingGames[0];
  }, [upcomingGames, selectedGameId]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate live countdown timer
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
        {/* Glow ambient effects */}
        <div className="absolute top-0 left-0 -mt-20 -ml-20 w-80 h-80 bg-[#663b86] rounded-full blur-[110px] opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-[#ff3e5e] rounded-full blur-[110px] opacity-25 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[#fce315] rounded-full blur-[140px] opacity-10 pointer-events-none"></div>

        {/* Top Header Bar: Recent Result + Games Navigation */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Last Match Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Último Jogo:</span>
            <span className="text-white font-black">Criciúma 3 x 0 Avaí</span>
            <span className="bg-emerald-500 text-black text-[10px] uppercase font-black px-2 py-0.5 rounded-full ml-1 hidden sm:inline-block">Vitória</span>
          </div>

          {/* Fixtures Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden md:inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#fce315]" />
              Confrontos:
            </span>
            {upcomingGames.slice(0, 3).map((game, idx) => (
              <button
                key={game.id}
                onClick={() => setSelectedGameId(game.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  selectedGameId === game.id 
                    ? "bg-[#fce315] text-[#111111] shadow-lg shadow-[#fce315]/20 scale-102"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                <span>{idx === 0 ? "Próximo" : `Jogo ${idx + 1}`}: {game.homeTeam === "Criciúma" ? game.awayTeam : game.homeTeam}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Centerpiece Match Layout */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
          {/* Left: Info */}
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

          {/* Middle: Teams Shields */}
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

            {/* X */}
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

          {/* Right: Countdown & Action Buttons */}
          <div className="flex flex-col items-center lg:items-end w-full lg:w-1/3 gap-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-slate-200 tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-[#fce315]" />
              <span>{activeGame.label}</span>
            </div>
            
            {/* Digital Countdown Timer */}
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

            {/* Action buttons */}
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
