import React, { useState, useEffect, useRef } from "react";
import { Radio, ChevronLeft, ChevronRight, Sparkles, Clock } from "lucide-react";

export interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  host?: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  timeDisplay: string;
  categoryBadge: string;
  bannerGradient: string;
  logoLabel: string;
  logoSub: string;
  logoIcon?: string;
  cardBgImage: string;
}

const PROGRAMACAO_SEG_SEX: ProgramItem[] = [
  {
    id: "morada-campeira",
    title: "Morada Campeira",
    subtitle: "Melhores músicas do sul para acordar seu dia com tradição e alegria",
    host: "Tradição Gaúcha",
    startHour: 5,
    startMinute: 0,
    endHour: 8,
    endMinute: 0,
    timeDisplay: "05h às 08h",
    categoryBadge: "TRADIÇÃO DO SUL",
    bannerGradient: "from-[#a855f7] via-[#7c3aed] to-[#2563eb]",
    logoLabel: "MORADA",
    logoSub: "CAMPEIRA",
    cardBgImage: "https://radioclubecriciuma.com/imagens/gauchobandinha.png",
  },
  {
    id: "super-hits-seg",
    title: "Super Hits",
    subtitle: "Os maiores sucessos nacionais e internacionais tocando sem parar",
    host: "Equipe Clube FM",
    startHour: 8,
    startMinute: 0,
    endHour: 9,
    endMinute: 0,
    timeDisplay: "08h às 09h",
    categoryBadge: "SUCESSOS DA CLUBE",
    bannerGradient: "from-[#ec4899] via-[#d946ef] to-[#8b5cf6]",
    logoLabel: "SUPER",
    logoSub: "HITS",
    cardBgImage: "https://radioclubecriciuma.com/imagens/manha.png",
  },
  {
    id: "derik-ramos",
    title: "Derik Ramos - Radio Show",
    subtitle: "O programa mais alegre do seu rádio! Prêmios, energia e conexão",
    host: "Dérick Ramos",
    startHour: 9,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    timeDisplay: "09h às 12h",
    categoryBadge: "LÍDER DE AUDIÊNCIA",
    bannerGradient: "from-[#0284c7] via-[#2563eb] to-[#7c3aed]",
    logoLabel: "DERIK RAMOS",
    logoSub: "RADIO SHOW",
    cardBgImage: "https://radioclubecriciuma.com/imagens/manha.png",
  },
  {
    id: "esporte-almoco",
    title: "Esporte na Hora do Almoço",
    subtitle: "Com Carlos Alberto Fiorenza - A cobertura esportiva de Criciúma e do Brasil",
    host: "Carlos Alberto Fiorenza",
    startHour: 12,
    startMinute: 0,
    endHour: 13,
    endMinute: 0,
    timeDisplay: "12h às 13h",
    categoryBadge: "FIORENZA",
    bannerGradient: "from-[#10b981] via-[#0284c7] to-[#2563eb]",
    logoLabel: "ESPORTE",
    logoSub: "NA HORA DO ALMOÇO",
    cardBgImage: "https://radioclubecriciuma.com/imagens/futebol.png",
  },
  {
    id: "super-tarde",
    title: "Super Tarde Clube",
    subtitle: "A companhia perfeita para a sua tarde com as músicas mais pedidas",
    host: "Vozes da Clube",
    startHour: 13,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    timeDisplay: "13h às 17h",
    categoryBadge: "A MELHOR COMPANHIA",
    bannerGradient: "from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]",
    logoLabel: "SUPER TARDE",
    logoSub: "CLUBE 87.9",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
  {
    id: "pen-drive",
    title: "Pen Drive",
    subtitle: "As melhores e mais selecionadas músicas da programação da Clube FM",
    host: "Seleção Especial",
    startHour: 17,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    timeDisplay: "17h às 18h",
    categoryBadge: "AS MAIS TOCADAS",
    bannerGradient: "from-[#2563eb] via-[#3b82f6] to-[#06b6d4]",
    logoLabel: "PEN DRIVE",
    logoSub: "SELEÇÃO CLUBE",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
  {
    id: "top-10",
    title: "Top 10",
    subtitle: "As 10 músicas mais pedidas e votadas pelos ouvintes da Clube",
    host: "Parada Oficial",
    startHour: 18,
    startMinute: 0,
    endHour: 19,
    endMinute: 0,
    timeDisplay: "18h às 19h",
    categoryBadge: "AS 10 MAIS PEDIDAS",
    bannerGradient: "from-[#f59e0b] via-[#ea580c] to-[#e11d48]",
    logoLabel: "TOP 10",
    logoSub: "AS MAIS PEDIDAS",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
  {
    id: "voz-do-brasil",
    title: "Voz do Brasil",
    subtitle: "Noticiário oficial dos poderes da República e prestação de serviço",
    host: "Noticiário Oficial",
    startHour: 19,
    startMinute: 0,
    endHour: 20,
    endMinute: 0,
    timeDisplay: "19h às 20h",
    categoryBadge: "INFORMAÇÃO NACIONAL",
    bannerGradient: "from-[#1d4ed8] via-[#2563eb] to-[#0284c7]",
    logoLabel: "VOZ DO BRASIL",
    logoSub: "NOTICIÁRIO OFICIAL",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
  {
    id: "programacao-evangelica",
    title: "Programação Evangélica",
    subtitle: "Mensagens edificantes de fé, esperança e os maiores louvores",
    host: "Mensagens de Fé",
    startHour: 21,
    startMinute: 0,
    endHour: 23,
    endMinute: 0,
    timeDisplay: "21h às 23h",
    categoryBadge: "MENSAGENS & LOUVORES",
    bannerGradient: "from-[#6366f1] via-[#8b5cf6] to-[#d946ef]",
    logoLabel: "PROGRAMAÇÃO",
    logoSub: "EVANGÉLICA",
    cardBgImage: "https://radioclubecriciuma.com/imagens/adorandodeus.png",
  },
  {
    id: "madrugada-seg-sex",
    title: "Madrugada Seleção Musical",
    subtitle: "A melhor seleção musical para quem curte as madrugadas da Clube",
    host: "Música Contínua",
    startHour: 0,
    startMinute: 0,
    endHour: 5,
    endMinute: 0,
    timeDisplay: "00h às 05h",
    categoryBadge: "MADRUGADA CLUBE",
    bannerGradient: "from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4]",
    logoLabel: "MADRUGADA",
    logoSub: "SELEÇÃO",
    cardBgImage: "https://radioclubecriciuma.com/imagens/madrugada.png",
  },
];

const PROGRAMACAO_QUARTA: ProgramItem[] = PROGRAMACAO_SEG_SEX.map((item) => {
  if (item.id === "super-tarde") {
    return {
      id: "salada-musical",
      title: "Salada Musical",
      subtitle: "Especial das tardes de quarta-feira com Vanderlei Silva",
      host: "Vanderlei Silva",
      startHour: 13,
      startMinute: 0,
      endHour: 17,
      endMinute: 0,
      timeDisplay: "13h às 17h",
      categoryBadge: "VANDERLEI SILVA",
      bannerGradient: "from-[#f97316] via-[#ea580c] to-[#e11d48]",
      logoLabel: "SALADA",
      logoSub: "MUSICAL",
      cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
    };
  }
  return item;
});

const PROGRAMACAO_SABADO: ProgramItem[] = [
  {
    id: "madrugada-sab",
    title: "Madrugada Seleção Musical",
    subtitle: "Embalando sua virada para o fim de semana com os maiores sucessos",
    host: "Madrugada Clube",
    startHour: 0,
    startMinute: 0,
    endHour: 8,
    endMinute: 0,
    timeDisplay: "00h às 08h",
    categoryBadge: "MADRUGADA SÁBADO",
    bannerGradient: "from-[#7c3aed] via-[#2563eb] to-[#06b6d4]",
    logoLabel: "MADRUGADA",
    logoSub: "SÁBADO",
    cardBgImage: "https://radioclubecriciuma.com/imagens/madrugada.png",
  },
  {
    id: "bom-dia-clube-sab",
    title: "Bom Dia Clube",
    subtitle: "A melhor energia para começar seu sábado! Prêmios e muita animação",
    host: "Equipe Fim de Semana",
    startHour: 8,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    timeDisplay: "08h às 12h",
    categoryBadge: "BOM DIA SÁBADO",
    bannerGradient: "from-[#0284c7] via-[#06b6d4] to-[#10b981]",
    logoLabel: "BOM DIA",
    logoSub: "CLUBE",
    cardBgImage: "https://radioclubecriciuma.com/imagens/manha.png",
  },
  {
    id: "sabadao-vip",
    title: "Sabadão VIP",
    subtitle: "Os lançamentos exclusivos e o clima contagiante para o seu início de tarde",
    host: "Exclusividade VIP",
    startHour: 13,
    startMinute: 0,
    endHour: 14,
    endMinute: 0,
    timeDisplay: "13h às 14h",
    categoryBadge: "EXCLUSIVIDADE",
    bannerGradient: "from-[#c026d3] via-[#e11d48] to-[#f59e0b]",
    logoLabel: "SABADÃO",
    logoSub: "VIP",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
  {
    id: "vibe-mix",
    title: "Vibe Mix",
    subtitle: "As melhores versões e sequências mixadas para agitar o seu sábado",
    host: "DJ Clube FM",
    startHour: 14,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    timeDisplay: "14h às 17h",
    categoryBadge: "SEQUÊNCIA MIXADA",
    bannerGradient: "from-[#ec4899] via-[#8b5cf6] to-[#3b82f6]",
    logoLabel: "VIBE",
    logoSub: "MIX",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
  {
    id: "super-tarde-sab",
    title: "Super Fim de Tarde",
    subtitle: "Música selecionada a dedo para curtir o entardecer do sábado",
    host: "Tarde de Sábado",
    startHour: 17,
    startMinute: 0,
    endHour: 22,
    endMinute: 0,
    timeDisplay: "17h às 22h",
    categoryBadge: "FIM DE TARDE",
    bannerGradient: "from-[#6366f1] via-[#8b5cf6] to-[#ec4899]",
    logoLabel: "SUPER",
    logoSub: "FIM DE TARDE",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
  {
    id: "eletro-hits",
    title: "Eletro Hits",
    subtitle: "O melhor da dance music e da cena eletrônica nacional e mundial",
    host: "Noite Eletrônica",
    startHour: 22,
    startMinute: 0,
    endHour: 23,
    endMinute: 0,
    timeDisplay: "22h às 23h",
    categoryBadge: "DANCE & ELETRÔNICA",
    bannerGradient: "from-[#0d9488] via-[#0284c7] to-[#6366f1]",
    logoLabel: "ELETRO",
    logoSub: "HITS",
    cardBgImage: "https://radioclubecriciuma.com/imagens/madrugada.png",
  },
];

const PROGRAMACAO_DOMINGO: ProgramItem[] = [
  {
    id: "madrugada-dom",
    title: "Madrugada Seleção Musical",
    subtitle: "Clássicos e sucessos suaves nas madrugadas da Clube",
    host: "Música Contínua",
    startHour: 0,
    startMinute: 0,
    endHour: 5,
    endMinute: 0,
    timeDisplay: "00h às 05h",
    categoryBadge: "MADRUGADA DOMINGO",
    bannerGradient: "from-[#7c3aed] via-[#2563eb] to-[#06b6d4]",
    logoLabel: "MADRUGADA",
    logoSub: "DOMINGO",
    cardBgImage: "https://radioclubecriciuma.com/imagens/madrugada.png",
  },
  {
    id: "bandinhas-do-sul",
    title: "Bandinhas do Sul",
    subtitle: "A tradição e alegria das bandinhas germânicas e bailões do sul do Brasil",
    host: "Alegria Alemã & Gaúcha",
    startHour: 5,
    startMinute: 0,
    endHour: 8,
    endMinute: 0,
    timeDisplay: "05h às 08h",
    categoryBadge: "ALEGRIA DO SUL",
    bannerGradient: "from-[#e11d48] via-[#ea580c] to-[#f59e0b]",
    logoLabel: "BANDINHAS",
    logoSub: "DO SUL",
    cardBgImage: "https://radioclubecriciuma.com/imagens/gauchobandinha.png",
  },
  {
    id: "bom-dia-clube-dom",
    title: "Bom Dia Clube",
    subtitle: "Domingo de paz, alegria e ótima música para você e sua família",
    host: "Domingo em Família",
    startHour: 8,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    timeDisplay: "08h às 12h",
    categoryBadge: "MANHÃ DE DOMINGO",
    bannerGradient: "from-[#0284c7] via-[#38bdf8] to-[#10b981]",
    logoLabel: "BOM DIA",
    logoSub: "CLUBE",
    cardBgImage: "https://radioclubecriciuma.com/imagens/manha.png",
  },
  {
    id: "domingo-total",
    title: "Domingo Total",
    subtitle: "O almoço de domingo fica ainda melhor sintonizado na 87.9 FM",
    host: "Almoço Musical",
    startHour: 12,
    startMinute: 0,
    endHour: 13,
    endMinute: 0,
    timeDisplay: "12h às 13h",
    categoryBadge: "HORA DO ALMOÇO",
    bannerGradient: "from-[#f97316] via-[#f59e0b] to-[#e11d48]",
    logoLabel: "DOMINGO",
    logoSub: "TOTAL",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
  {
    id: "super-hits-dom",
    title: "Super Hits",
    subtitle: "Tarde de domingo recheada das músicas que você mais ama",
    host: "Sucessos da Tarde",
    startHour: 14,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    timeDisplay: "14h às 17h",
    categoryBadge: "DOMINGO SHOW",
    bannerGradient: "from-[#d946ef] via-[#ec4899] to-[#8b5cf6]",
    logoLabel: "SUPER",
    logoSub: "HITS",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
  {
    id: "super-mais",
    title: "Super Mais",
    subtitle: "Fechando o domingo com chave de ouro e as melhores canções",
    host: "Especial de Domingo",
    startHour: 17,
    startMinute: 0,
    endHour: 19,
    endMinute: 0,
    timeDisplay: "17h às 19h",
    categoryBadge: "SUPER MAIS",
    bannerGradient: "from-[#f43f5e] via-[#e11d48] to-[#9333ea]",
    logoLabel: "SUPER",
    logoSub: "MAIS",
    cardBgImage: "https://radioclubecriciuma.com/imagens/tarde.png",
  },
];

export function getBrazilDate(baseDate: Date = new Date()): Date {
  try {
    const brazilString = baseDate.toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    });
    return new Date(brazilString);
  } catch {
    return baseDate;
  }
}

export function getCurrentLiveProgram(baseDate: Date = new Date()): ProgramItem {
  const brazilDate = getBrazilDate(baseDate);
  const dayOfWeek = brazilDate.getDay(); // 0 = Domingo, 1 = Segunda ... 6 = Sábado
  const currentMinutes = brazilDate.getHours() * 60 + brazilDate.getMinutes();

  let schedule = PROGRAMACAO_SEG_SEX;
  if (dayOfWeek === 0) schedule = PROGRAMACAO_DOMINGO;
  else if (dayOfWeek === 6) schedule = PROGRAMACAO_SABADO;
  else if (dayOfWeek === 3) schedule = PROGRAMACAO_QUARTA;

  for (const item of schedule) {
    const start = item.startHour * 60 + item.startMinute;
    let end = item.endHour * 60 + item.endMinute;
    if (end <= start) end += 24 * 60;

    let checkMinutes = currentMinutes;
    if (checkMinutes < start && end > 24 * 60) {
      checkMinutes += 24 * 60;
    }

    if (checkMinutes >= start && checkMinutes < end) {
      return item;
    }
  }

  return schedule[0];
}

interface ProgramacaoGuideProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function ProgramacaoGuide({
  isPlaying,
  onTogglePlay,
}: ProgramacaoGuideProps) {
  const [now, setNow] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("hoje");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Touch Swipe Gesture States for Mobile Devices
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Real-time 1-second update
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const brazilDate = getBrazilDate(now);
  const dayOfWeek = brazilDate.getDay(); // 0 = Domingo, 1 = Segunda ... 6 = Sábado
  const currentMinutes = brazilDate.getHours() * 60 + brazilDate.getMinutes();
  const currentSecondsTotal =
    brazilDate.getHours() * 3600 +
    brazilDate.getMinutes() * 60 +
    brazilDate.getSeconds();

  const isProgramLive = (item: ProgramItem, tab: string) => {
    if (tab !== "hoje") {
      const isTodayTab =
        (tab === "dom" && dayOfWeek === 0) ||
        (tab === "sab" && dayOfWeek === 6) ||
        (tab === "quarta" && dayOfWeek === 3) ||
        (tab === "seg-sex" && dayOfWeek >= 1 && dayOfWeek <= 5);
      if (!isTodayTab) return false;
    }

    const start = item.startHour * 60 + item.startMinute;
    let end = item.endHour * 60 + item.endMinute;
    if (end <= start) end += 24 * 60;

    let checkMinutes = currentMinutes;
    if (checkMinutes < start && end > 24 * 60) {
      checkMinutes += 24 * 60;
    }

    return checkMinutes >= start && checkMinutes < end;
  };

  const getLiveStats = (item: ProgramItem) => {
    const startSec = (item.startHour * 60 + item.startMinute) * 60;
    let endSec = (item.endHour * 60 + item.endMinute) * 60;
    if (endSec <= startSec) endSec += 24 * 3600;

    let checkSec = currentSecondsTotal;
    if (checkSec < startSec && endSec > 24 * 3600) {
      checkSec += 24 * 3600;
    }

    const totalDurationSec = Math.max(1, endSec - startSec);
    const elapsedSec = Math.max(0, checkSec - startSec);
    const progress = Math.min(100, Math.max(0, (elapsedSec / totalDurationSec) * 100));
    const remainingSec = Math.max(0, endSec - checkSec);

    const hours = Math.floor(remainingSec / 3600);
    const mins = Math.floor((remainingSec % 3600) / 60);
    const secs = remainingSec % 60;

    const remainingText =
      hours > 0
        ? `${hours}h ${mins}m restantes`
        : `${mins}m ${secs < 10 ? "0" + secs : secs}s restantes`;

    return { progress, remainingText };
  };

  const getActiveSchedule = (): ProgramItem[] => {
    if (selectedTab === "hoje") {
      if (dayOfWeek === 0) return PROGRAMACAO_DOMINGO;
      if (dayOfWeek === 6) return PROGRAMACAO_SABADO;
      if (dayOfWeek === 3) return PROGRAMACAO_QUARTA;
      return PROGRAMACAO_SEG_SEX;
    }
    if (selectedTab === "seg-sex") return PROGRAMACAO_SEG_SEX;
    if (selectedTab === "quarta") return PROGRAMACAO_QUARTA;
    if (selectedTab === "sab") return PROGRAMACAO_SABADO;
    if (selectedTab === "dom") return PROGRAMACAO_DOMINGO;
    return PROGRAMACAO_SEG_SEX;
  };

  const currentSchedule = getActiveSchedule();

  // Find index of currently live program
  const liveItemIndex = currentSchedule.findIndex((item) =>
    isProgramLive(item, selectedTab)
  );

  // Auto-slide to live item when tab changes or initially
  useEffect(() => {
    if (liveItemIndex >= 0) {
      setCurrentIndex(liveItemIndex);
    } else {
      setCurrentIndex(0);
    }
  }, [selectedTab, liveItemIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : currentSchedule.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < currentSchedule.length - 1 ? prev + 1 : 0));
  };

  // Touch Swipe Handlers
  const minSwipeDistance = 40;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 via-white to-purple-50/30 text-slate-900 py-10 sm:py-16 relative overflow-hidden select-none border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 relative z-10">
        {/* LIGHT SECTION HEADER */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-[950] tracking-tight text-slate-900 uppercase">
            PROGRAMAÇÃO NO AR
          </h2>
          <p className="text-slate-600 font-medium text-xs sm:text-base max-w-xl mx-auto mt-1 sm:mt-2 px-2">
            Acompanhe o programa em destaque e navegue pelas atrações do dia
          </p>
        </div>

        {/* CAROUSEL SLIDER CONTAINER */}
        <div className="relative flex items-center justify-center max-w-5xl mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Programa Anterior"
            className="absolute -left-1 sm:-left-6 lg:-left-8 z-30 w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-200 text-slate-800 flex items-center justify-center shadow-xl hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Próximo Programa"
            className="absolute -right-1 sm:-right-6 lg:-right-8 z-30 w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-200 text-slate-800 flex items-center justify-center shadow-xl hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
          </button>

          {/* SLIDER CAROUSEL TRACK WITH TOUCH SWIPE */}
          <div
            ref={sliderRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="w-full overflow-hidden rounded-3xl sm:rounded-full shadow-2xl p-1"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {currentSchedule.map((item) => {
                const live = isProgramLive(item, selectedTab);
                const { progress, remainingText } = live
                  ? getLiveStats(item)
                  : { progress: 0, remainingText: "" };

                return (
                  <div key={item.id} className="w-full shrink-0 px-1">
                    <div
                      onClick={live ? onTogglePlay : undefined}
                      className={`relative w-full rounded-3xl sm:rounded-full overflow-hidden transition-all duration-300 min-h-[170px] sm:min-h-[220px] md:min-h-[240px] flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-r ${item.bannerGradient} ${
                        live
                          ? "ring-4 ring-[#ff3e5e] border-2 border-[#ff3e5e] shadow-[0_15px_40px_rgba(255,62,94,0.35)] cursor-pointer"
                          : "border border-white/20 shadow-xl"
                      }`}
                    >
                      {/* Program Specific Background Image */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <img
                          src={item.cardBgImage}
                          alt={item.title}
                          className="w-full h-full object-cover object-center opacity-95"
                        />
                      </div>

                      {/* Text Contrast Gradient Shadow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none"></div>

                      {/* CENTER/LEFT: Clean, Crisp, Ultra-Legible Typography */}
                      <div className="relative z-10 flex items-center flex-1 min-w-0 pr-0 sm:pr-4 w-full sm:w-auto">
                        <div className="flex flex-col min-w-0 flex-1">
                          <span
                            className="font-[1000] text-xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-tight truncate"
                            style={{
                              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                            }}
                          >
                            {item.logoLabel}
                          </span>

                          <span className="font-black text-base sm:text-xl md:text-2xl text-[#fce315] uppercase tracking-wider leading-tight mt-0.5 sm:mt-1.5 truncate drop-shadow-md">
                            {item.logoSub}
                          </span>

                          <p className="text-white/95 text-[11px] sm:text-sm font-semibold truncate mt-0.5 sm:mt-1 drop-shadow-sm">
                            {item.host ? `Com ${item.host}` : item.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT: Floating Clean White Pill Card */}
                      <div className="relative z-20 shrink-0 bg-white rounded-2xl sm:rounded-3xl shadow-2xl px-4 sm:px-7 py-3 sm:py-5 w-full sm:w-auto min-w-0 sm:min-w-[260px] md:min-w-[290px] border border-slate-100 flex flex-col justify-center mt-2 sm:mt-0">
                        {/* Live Red Dot + Title */}
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff3e5e] shrink-0 animate-pulse"></span>
                          <h4 className="font-[950] text-slate-900 text-xs sm:text-base md:text-lg uppercase tracking-tight truncate max-w-[140px] sm:max-w-[200px]">
                            {item.title}
                          </h4>
                        </div>

                        {/* Time display in muted gray */}
                        <span className="text-slate-500 font-black text-[11px] sm:text-sm mt-0.5 sm:mt-1">
                          {item.timeDisplay}
                        </span>

                        {/* Remaining time and progress for live program */}
                        {live && (
                          <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-slate-100">
                            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-600 mb-1">
                              <span>Ao Vivo</span>
                              <span className="font-mono text-[#ff3e5e]">{remainingText}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#fce315] to-[#ff3e5e] rounded-full transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Bottom Yellow/Blue Pill Tag */}
                        <div className="absolute -bottom-3 right-3 sm:right-4 z-30">
                          {live ? (
                            <span className="bg-[#fce315] text-[#3d1b54] text-[10px] sm:text-xs font-[950] uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-md tracking-wider flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#ff3e5e] animate-ping"></span>
                              NO AR AGORA
                            </span>
                          ) : (
                            <span className="bg-[#2563eb] text-white text-[10px] sm:text-[11px] font-extrabold uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md tracking-wider">
                              {item.categoryBadge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CAROUSEL NAVIGATION DOTS (● ○ ○ ○ ○) */}
        <div className="flex items-center justify-center gap-2 mt-5 sm:mt-6">
          {currentSchedule.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para programa ${idx + 1}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-6 sm:w-8 bg-[#ff3e5e]"
                  : "w-2 sm:w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
