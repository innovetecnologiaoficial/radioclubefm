import React, { useState, useEffect } from 'react';
import { MapPin, Ticket, Info } from 'lucide-react';

const TEAM_LOGOS: Record<string, string> = {
  "crb": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/CRB_logo.svg/500px-CRB_logo.svg.png",
  "criciúma": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Crici%C3%BAma_EC_2025_crest.svg/500px-Crici%C3%BAma_EC_2025_crest.svg.png",
  "flamengo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Clube_de_Regatas_do_Flamengo_logo.svg/500px-Clube_de_Regatas_do_Flamengo_logo.svg.png",
  "botafogo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/500px-Botafogo_de_Futebol_e_Regatas_logo.svg.png",
  "corinthians": "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png",
  "bahia": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Bandeira_da_Bahia.svg/500px-Bandeira_da_Bahia.svg.png",
  "fluminense": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Fluminense_Football_Club.svg/500px-Fluminense_Football_Club.svg.png",
  "vasco": "https://thumb.wikimedia.org/wikipedia/pt/thumb/8/8b/EscudoDoVascoDaGama.svg/500px-EscudoDoVascoDaGama.svg.png",
  "palmeiras": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/SE_Palmeiras_2025_crest.png/500px-SE_Palmeiras_2025_crest.png",
  "são paulo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/S%C3%A3o_Paulo_Futebol_Clube_logo_%282022%29.svg/500px-S%C3%A3o_Paulo_Futebol_Clube_logo_%282022%29.svg.png",
  "santos": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Santos_logo.svg/500px-Santos_logo.svg.png",
  "cruzeiro": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/500px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png",
  "atlético-mg": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/500px-Atletico_mineiro_galo.png",
  "grêmio": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Gremio_logo.svg/500px-Gremio_logo.svg.png",
  "internacional": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/500px-Escudo_do_Sport_Club_Internacional.svg.png",
  "cuiabá": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Cuiab%C3%A1_EC_crest.png/500px-Cuiab%C3%A1_EC_crest.png",
  "operário-pr": "https://upload.wikimedia.org/wikipedia/commons/9/90/Oper%C3%A1rio_Ferrovi%C3%A1rio_EC_%28no_stars%29.png",
  "avaí": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Ava%C3%AD_Futebol_Clube_logo.svg/500px-Ava%C3%AD_Futebol_Clube_logo.svg.png"
};

const UPCOMING_GAMES = [
  {
    homeTeam: "Criciúma",
    awayTeam: "Operário-PR",
    dateStr: "2026-09-21T19:30:00-03:00",
    label: "21/09/2026 - 19:30",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO HERIBERTO HÜLSE",
  },
  {
    homeTeam: "Criciúma",
    awayTeam: "Avaí",
    dateStr: "2026-09-27T11:00:00-03:00",
    label: "27/09/2026 - 11:00",
    competition: "Brasileirão Série B 2026",
    stadium: "ESTÁDIO HERIBERTO HÜLSE",
  }
];

export default function NextGameCountdown() {
  const getNextGame = () => {
    const now = new Date().getTime();
    for (const game of UPCOMING_GAMES) {
      if (new Date(game.dateStr).getTime() > now) {
        return game;
      }
    }
    return UPCOMING_GAMES[UPCOMING_GAMES.length - 1];
  };

  const [activeGame, setActiveGame] = useState(getNextGame());
  const [homeLogo, setHomeLogo] = useState('');
  const [awayLogo, setAwayLogo] = useState('');

  const targetDate = new Date(activeGame.dateStr).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const getTeamLogo = async (teamName: string) => {
    const nameLower = teamName.toLowerCase().trim();
    if (TEAM_LOGOS[nameLower]) {
      return TEAM_LOGOS[nameLower];
    }
    
    // Fallback: Wikipedia API
    try {
      const searchTerm = `${teamName} clube futebol escudo`;
      const res = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=1&prop=pageimages&format=json&pithumbsize=500&origin=*`);
      const data = await res.json();
      if (data.query && data.query.pages) {
        const pages = Object.values(data.query.pages);
        if (pages.length > 0 && (pages[0] as any).thumbnail) {
          return (pages[0] as any).thumbnail.source;
        }
      }
    } catch (e) {
      console.error(e);
    }
    
    // Final fallback
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=random&color=fff&font-size=0.33&size=128`;
  };

  useEffect(() => {
    getTeamLogo(activeGame.homeTeam).then(setHomeLogo);
    getTeamLogo(activeGame.awayTeam).then(setAwayLogo);
  }, [activeGame.homeTeam, activeGame.awayTeam]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      let targetDate = new Date(activeGame.dateStr).getTime();
      let difference = targetDate - now;

      // If the match started and has passed some time (e.g., 2 hours), go to next game
      if (difference < -7200000) {
        const next = getNextGame();
        if (next !== activeGame) {
          setActiveGame(next);
          targetDate = new Date(next.dateStr).getTime();
          difference = targetDate - now;
        }
      }

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeGame]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="max-w-7xl mx-auto px-4 pt-12">
      <div 
        className="bg-[#111111] border border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(17, 17, 17, 0.9) 0%, rgba(17, 17, 17, 0.4) 50%, rgba(17, 17, 17, 0.9) 100%), url("https://i.ibb.co/rRGvQVBw/Chat-GPT-Image-30-de-ago-de-2026-11-51-34.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        
        {/* Glow Effects com cores da Clube FM */}
        <div className="absolute top-0 left-0 -mt-20 -ml-20 w-72 h-72 bg-[#663b86] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-72 h-72 bg-[#ff3e5e] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#fce315] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

        {/* Left: Info */}
        <div className="relative z-10 flex flex-col gap-4 text-center lg:text-left w-full lg:w-1/3">
          <div className="flex flex-col items-center lg:items-start leading-none uppercase italic transform -skew-x-6">
            <span className="text-4xl lg:text-5xl font-black text-[#fce315] drop-shadow-md">PRÓXIMO</span>
            <span className="text-4xl lg:text-5xl font-black text-white drop-shadow-md tracking-wide" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>JOGO</span>
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <h3 className="text-xl lg:text-2xl font-bold text-white uppercase tracking-wider">{activeGame.homeTeam} X {activeGame.awayTeam}</h3>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{activeGame.competition}</p>
          </div>
          <div className="mt-2 flex items-center justify-center lg:justify-start gap-2 text-slate-300 font-medium text-sm">
            <MapPin className="w-4 h-4 text-[#ff3e5e]" />
            {activeGame.stadium}
          </div>
        </div>

        {/* Middle: Teams */}
        <div className="relative z-10 flex items-center justify-center gap-6 w-full lg:w-1/3">
          <div className="flex flex-col items-center">
            {homeLogo && (
              <img 
                src={homeLogo} 
                alt={activeGame.homeTeam} 
                loading="lazy"
                className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeGame.homeTeam)}&background=111111&color=fff&font-size=0.33&size=128&bold=true`;
                }}
              />
            )}
          </div>
          <span className="text-2xl font-black text-slate-500">X</span>
          <div className="flex flex-col items-center">
            {awayLogo && (
              <img 
                src={awayLogo} 
                alt={activeGame.awayTeam} 
                loading="lazy"
                className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(252,227,21,0.2)] transition-all duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeGame.awayTeam)}&background=111111&color=fff&font-size=0.33&size=128&bold=true`;
                }}
              />
            )}
            <span className="text-[10px] font-black text-[#fce315] uppercase tracking-widest mt-2 hidden">{activeGame.awayTeam}</span>
          </div>
        </div>

        {/* Right: Countdown & Actions */}
        <div className="relative z-10 flex flex-col items-center lg:items-end w-full lg:w-1/3 gap-6">
          <div className="text-sm font-bold text-slate-300 tracking-widest">
            {activeGame.label}
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 text-center">
            <div className="flex flex-col gap-1">
              <div className="text-4xl md:text-5xl font-black text-[#fce315] drop-shadow-[0_2px_10px_rgba(252,227,21,0.2)] font-mono">{formatNumber(timeLeft.days)}</div>
              <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">Dias</span>
            </div>
            <span className="text-2xl font-black text-slate-600 -mt-5">:</span>
            <div className="flex flex-col gap-1">
              <div className="text-4xl md:text-5xl font-black text-[#fce315] drop-shadow-[0_2px_10px_rgba(252,227,21,0.2)] font-mono">{formatNumber(timeLeft.hours)}</div>
              <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">Horas</span>
            </div>
            <span className="text-2xl font-black text-slate-600 -mt-5">:</span>
            <div className="flex flex-col gap-1">
              <div className="text-4xl md:text-5xl font-black text-[#fce315] drop-shadow-[0_2px_10px_rgba(252,227,21,0.2)] font-mono">{formatNumber(timeLeft.minutes)}</div>
              <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">Minutos</span>
            </div>
            <span className="text-2xl font-black text-slate-600 -mt-5">:</span>
            <div className="flex flex-col gap-1">
              <div className="text-4xl md:text-5xl font-black text-[#fce315] drop-shadow-[0_2px_10px_rgba(252,227,21,0.2)] font-mono">{formatNumber(timeLeft.seconds)}</div>
              <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">Segundos</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center lg:justify-end">
            <a 
              href="https://criciuma.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
            >
              <Info className="w-4 h-4" />
              Saiba Tudo
            </a>
            <a 
              href="https://criciuma.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#fce315] text-[#fce315] font-bold text-xs uppercase tracking-wider hover:bg-[#fce315]/10 transition-all duration-300"
            >
              <Ticket className="w-4 h-4" />
              Compre Ingresso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

