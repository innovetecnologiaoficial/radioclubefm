import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import HighlightsSlider from "./components/HighlightsSlider";
import ProgramacaoGuide, { getCurrentLiveProgram, ProgramItem } from "./components/ProgramacaoGuide";
import {
  Play,
  Pause,
  Radio,
  Heart,
  Volume2,
  VolumeX,
  ShieldAlert,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  CloudDrizzle,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  RefreshCw,
  MessageSquare,
  Calendar,
  ChevronDown,
  ChevronUp,
  Music,
  Clock,
  Send,
  Sparkles,
  MapPin,
  Megaphone,
  ExternalLink,
  Target,
  Users,
  TrendingUp,
  Phone,
  Mail,
} from "lucide-react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl: string;
}

const VITRINE_SEM_FOTO = "https://www.vitrinedosul.com.br/img/sem-foto.jpg";
const VITRINE_LOGO = "https://www.vitrinedosul.com.br/img/4eb1ee71ac9cfc5071ee3ef95c0757fa655e9e94.png";
const LOCAL_VITRINE_LOGO = "/images/vitrine-do-sul-logo.png";

const isValidImageUrl = (url: string | null | undefined): boolean => {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) return false;
  if (trimmed.endsWith("/")) return false; // Despreza diretórios sem arquivo como /images/noticias/4371/
  const lower = trimmed.toLowerCase();
  return (
    lower.includes(".webp") ||
    lower.includes(".jpg") ||
    lower.includes(".jpeg") ||
    lower.includes(".png") ||
    lower.includes(".avif") ||
    lower.includes(".gif")
  );
};

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    fill="currentColor"
    {...props}
  >
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const PlayStoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    {...props}
  >
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
);

const CLUBE_LOGO = "https://radioclubecriciuma.com/imagens/logoclubepng.png";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveProgram, setLiveProgram] = useState<ProgramItem>(() => getCurrentLiveProgram());

  // Automatic schedule synchronization every second
  useEffect(() => {
    const update = () => setLiveProgram(getCurrentLiveProgram());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const [isMobileCardOpen, setIsMobileCardOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // States for Volume and Controls
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // States for Club VIP form
  const [clubeName, setClubeName] = useState("");
  const [clubeEmail, setClubeEmail] = useState("");
  const [clubePhone, setClubePhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnunciarModal, setShowAnunciarModal] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [selectedNewsUrl, setSelectedNewsUrl] = useState<string | null>(null);

  const getYoutubeId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };



  // Phone input formatting mask
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    let formatted = rawValue;
    if (rawValue.length > 0) {
      formatted = `(${rawValue.substring(0, 2)}`;
    }
    if (rawValue.length > 2) {
      formatted += `) ${rawValue.substring(2, 7)}`;
    }
    if (rawValue.length > 7) {
      formatted += `-${rawValue.substring(7, 11)}`;
    }
    setClubePhone(formatted);
  };

  const handleClubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubeEmail || !clubePhone) {
      return;
    }

    setIsSubmitting(true);

    // Dynamic professional whatsapp messages
    const nameStr = clubeName ? `\n👤 *Nome:* ${clubeName}` : "";
    const message = `✨ *Novo Cadastro - VIP Clube FM Criciúma* ✨${nameStr}\n📧 *E-mail:* ${clubeEmail}\n📱 *WhatsApp:* ${clubePhone}\n\nQuero participar das promoções e concorrer a prêmios! 🎁`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/5548991950093?text=${encodedMessage}`;

    // Smooth timing feedback
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = waUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();

      // Clear states & inputs
      setClubeName("");
      setClubeEmail("");
      setClubePhone("");
      setIsSubmitting(false);
    }, 1800);
  };

  // Syncing volume level and mute toggles with audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, isPlaying]);

  // Weather States
  const [weather, setWeather] = useState<{
    temp: number;
    apparentTemp: number;
    humidity: number;
    windSpeed: number;
    isDay: boolean;
    code: number;
    time: string;
  } | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const [isRefreshingWeather, setIsRefreshingWeather] = useState(false);

  const fetchWeather = async () => {
    try {
      setIsRefreshingWeather(true);
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-28.6775&longitude=-49.3697&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=America/Sao_Paulo"
      );
      if (!res.ok) throw new Error("Erro ao buscar clima");
      const data = await res.json();

      const current = data.current;
      setWeather({
        temp: Math.round(current.temperature_2m),
        apparentTemp: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        isDay: current.is_day === 1,
        code: current.weather_code,
        time: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setWeatherError(false);
    } catch (e) {
      console.warn("Open-Meteo failed:", e);
      setWeatherError(true);
      if (!weather) {
        setWeather({
          temp: 22,
          apparentTemp: 23,
          humidity: 78,
          windSpeed: 12,
          isDay: true,
          code: 2,
          time: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }
    } finally {
      setWeatherLoading(false);
      setIsRefreshingWeather(false);
    }
  };

  const getWeatherCondition = (code: number) => {
    switch (code) {
      case 0:
        return {
          text: "Céu Limpo",
          icon: "Sun",
          color: "text-amber-500 bg-amber-500/10",
          bgGradient: "from-amber-500/10 to-orange-500/5",
        };
      case 1:
      case 2:
        return {
          text: "Parcialmente Nublado",
          icon: "CloudSun",
          color: "text-sky-400 bg-sky-500/10",
          bgGradient: "from-sky-500/10 to-indigo-500/5",
        };
      case 3:
        return {
          text: "Encoberto",
          icon: "Cloud",
          color: "text-slate-400 bg-slate-550/10",
          bgGradient: "from-slate-500/10 to-zinc-500/5",
        };
      case 45:
      case 48:
        return {
          text: "Nevoeiro/Neblina",
          icon: "Cloud",
          color: "text-zinc-400 bg-zinc-400/10",
          bgGradient: "from-zinc-500/10 to-slate-500/5",
        };
      case 51:
      case 53:
      case 55:
        return {
          text: "Garoa Fina",
          icon: "CloudDrizzle",
          color: "text-teal-400 bg-teal-500/10",
          bgGradient: "from-teal-500/10 to-cyan-500/5",
        };
      case 61:
      case 63:
      case 65:
        return {
          text: "Chuva Fina",
          icon: "CloudRain",
          color: "text-blue-400 bg-blue-500/10",
          bgGradient: "from-blue-500/10 to-indigo-500/5",
        };
      case 80:
      case 81:
      case 82:
        return {
          text: "Pancadas de Chuva",
          icon: "CloudRain",
          color: "text-blue-500 bg-blue-600/10",
          bgGradient: "from-blue-600/10 to-violet-500/5",
        };
      case 95:
        return {
          text: "Chuva com Trovoadas",
          icon: "CloudLightning",
          color: "text-purple-500 bg-purple-650/15",
          bgGradient: "from-purple-600/15 to-indigo-500/5",
        };
      default:
        return {
          text: "Tempo Estável",
          icon: "Sun",
          color: "text-amber-500 bg-amber-500/10",
          bgGradient: "from-amber-500/10 to-orange-500/5",
        };
    }
  };

  const renderWeatherIcon = (
    iconName: string,
    className: string = "w-10 h-10",
  ) => {
    switch (iconName) {
      case "Sun":
        return (
          <Sun
            className={`${className} text-amber-500 animate-spin [animation-duration:20s]`}
          />
        );
      case "CloudSun":
        return <CloudSun className={`${className} text-sky-400`} />;
      case "Cloud":
        return <Cloud className={`${className} text-slate-400`} />;
      case "CloudDrizzle":
        return <CloudDrizzle className={`${className} text-teal-400`} />;
      case "CloudRain":
        return <CloudRain className={`${className} text-blue-400`} />;
      case "CloudLightning":
        return (
          <CloudLightning
            className={`${className} text-purple-400 animate-pulse`}
          />
        );
      default:
        return <Sun className={`${className} text-amber-500`} />;
    }
  };

  // In a real scenario, this would be the actual stream URL!
  const STREAM_URL = "https://stream2.svrdedicado.org/8258/stream";

  const parseXmlFeed = (xmlText: string): NewsItem[] => {
    const itemBlocks = xmlText.split(/<item[\s>]/i).slice(1);
    return itemBlocks.slice(0, 9).map((block) => {
      const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : "";

      const linkMatch = block.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
      const link = linkMatch ? linkMatch[1].trim() : "";

      const pubDateMatch = block.match(/<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i);
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();

      const descMatch = block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
      const rawDesc = descMatch ? descMatch[1] : "";
      const cleanDesc = rawDesc.replace(/<[^>]*>/g, "").trim();

      // Extract image: PRIORITY 1: <media:content url="..." />
      let imageUrl = "";
      const mediaMatch = block.match(/<media:content[^>]+url=["']([^"']+)["']/i);
      if (mediaMatch && isValidImageUrl(mediaMatch[1])) {
        imageUrl = mediaMatch[1];
      }

      // PRIORITY 2: <enclosure url="..." />
      if (!imageUrl) {
        const encMatch = block.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
        if (encMatch && isValidImageUrl(encMatch[1])) {
          imageUrl = encMatch[1];
        }
      }

      // PRIORITY 3: <img src="..." />
      if (!imageUrl) {
        const imgMatch = block.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch && isValidImageUrl(imgMatch[1])) {
          imageUrl = imgMatch[1];
        }
      }

      return {
        title,
        link,
        pubDate,
        description: cleanDesc,
        imageUrl: imageUrl || VITRINE_SEM_FOTO,
      };
    });
  };

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    // 1. Try PHP endpoint (works natively on shared LiteSpeed/Hostinger/cPanel hosting)
    try {
      const phpRes = await fetch("/api-news.php");
      if (phpRes.ok) {
        const contentType = phpRes.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await phpRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setNews(data);
            setError(null);
            setLoading(false);
            return;
          }
        }
      }
    } catch (_) {
      // Continue to next strategy
    }

    // 2. Try Node.js endpoint (/api/news)
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setNews(data);
            setError(null);
            setLoading(false);
            return;
          }
        }
      }
    } catch (_) {
      // Continue to fallback
    }

    // 3. Fallback: Direct RSS XML fetch via CORS proxies with media:content parser
    const proxyUrls = [
      "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://www.vitrinedosul.com.br/rss.xml"),
      "https://corsproxy.io/?" + encodeURIComponent("https://www.vitrinedosul.com.br/rss.xml")
    ];

    for (const proxyUrl of proxyUrls) {
      try {
        const response = await fetch(proxyUrl);
        if (!response.ok) continue;
        const xmlText = await response.text();
        if (xmlText && xmlText.includes("<item")) {
          const parsed = parseXmlFeed(xmlText);
          if (parsed.length > 0) {
            setNews(parsed);
            setError(null);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Proxy RSS falhou:", proxyUrl, err);
      }
    }

    setError("Não conseguimos carregar as notícias no momento. Tente novamente mais tarde.");
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
    fetchWeather();

    // Attempt to autoplay
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay prevent by browser:", err);
        });
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-16">
        {/* Hero Section / Broadcast Masthead */}
        <section className="relative text-white overflow-hidden bg-slate-900">
          {/* Studio Image - High Clarity, Warmth & Color */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <img
              src="https://radioclubecriciuma.com/imagens/estudio.jpeg"
              alt="Estúdio Rádio Clube FM Criciúma"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-100 brightness-105 saturate-[1.1]"
            />
            {/* Top & Overlay Tint for Studio Ambiance */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950/80"></div>
            {/* Soft Bottom Fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 pointer-events-none bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="max-w-5xl mx-auto relative z-10 w-full px-4 sm:px-6 pt-10 pb-16 flex flex-col items-center text-center">
            {/* Station Logo */}
            <div className="mb-6 flex flex-col items-center">
              <img
                src={CLUBE_LOGO}
                alt="Rádio Clube FM Criciúma 87.9"
                fetchPriority="high"
                loading="eager"
                className="h-28 sm:h-36 md:h-44 w-auto max-w-[85vw] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-102"
              />
            </div>

            {/* Transparent Glassmorphic Container for Headline */}
            <div className="bg-black/25 backdrop-blur-md border border-white/25 p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto shadow-2xl space-y-3">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-[1000] tracking-tight text-white leading-tight"
                style={{ textShadow: "0 3px 10px rgba(0, 0, 0, 0.9)" }}
              >
                A rádio favorita de Criciúma
              </h1>
              <p
                className="text-white text-sm sm:text-base md:text-lg font-bold leading-relaxed"
                style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)" }}
              >
                Grandes sucessos da música, jornalismo em tempo real, prêmios diários e a maior audiência da região. Sintonize 87.9 FM ou ouça online.
              </p>
            </div>
          </div>
        </section>

        {/* Eventos, Prêmios e Programação - Carrossel de Cards */}
        <div id="destaques">
          <HighlightsSlider />
        </div>

        {/* App Download Section */}
        <section
          id="app"
          className="max-w-7xl mx-auto px-4 py-12 mb-8"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-purple-50/50 text-slate-900 p-8 md:p-12 border border-slate-200/90 shadow-xl">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
              {/* Left Content */}
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#663b86]/10 border border-[#663b86]/20 rounded-full text-xs font-black text-[#663b86] uppercase tracking-wider mb-4">
                  <span>Aplicativo Oficial</span>
                  <span>•</span>
                  <span>iOS & Android</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-[950] text-slate-900 leading-tight tracking-tight mb-4">
                  Leve a Clube FM no seu bolso
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-medium">
                  Baixe gratuitamente o aplicativo oficial da Rádio Clube FM Criciúma. Ouça a programação ao vivo com qualidade digital HD, peça suas músicas favoritas e participe de todas as promoções onde quer que você esteja.
                </p>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <a
                    href="https://apps.apple.com/us/app/r%C3%A1dio-clube-crici%C3%BAma/id6777545744"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-98"
                  >
                    <AppleIcon className="w-6 h-6 text-white" />
                    <div className="flex flex-col items-start leading-none text-left">
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Baixar na
                      </span>
                      <span className="text-white font-black text-sm tracking-tight">
                        App Store
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=br.com.radioclubecriciuma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-98"
                  >
                    <PlayStoreIcon className="w-5 h-5 text-white" />
                    <div className="flex flex-col items-start leading-none text-left">
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Disponível no
                      </span>
                      <span className="text-white font-black text-sm tracking-tight">
                        Google Play
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Official Station Mascot */}
              <div className="hidden lg:flex items-center justify-center shrink-0 -my-6 self-end">
                <img
                  src="https://radioclubecriciuma.com/imagens/mascote.png"
                  alt="Mascote Clube FM Criciúma"
                  className="h-52 xl:h-60 w-auto object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105 select-none"
                />
              </div>

              {/* Right Feature Highlights */}
              <div className="w-full lg:w-80 shrink-0 bg-white rounded-xl p-6 border border-slate-200 text-sm space-y-4 shadow-sm">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                  Vantagens do App
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs">
                      ✓
                    </div>
                    <span className="text-slate-700 font-medium text-xs leading-relaxed">
                      Transmissão 24h sem cortes com áudio em alta definição
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs">
                      ✓
                    </div>
                    <span className="text-slate-700 font-medium text-xs leading-relaxed">
                      Acesso rápido para pedir música diretamente no WhatsApp
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs">
                      ✓
                    </div>
                    <span className="text-slate-700 font-medium text-xs leading-relaxed">
                      Notificações exclusivas de sorteios, prêmios e shows
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grade de Programação Estilo EPG / Streaming Guide */}
        <ProgramacaoGuide isPlaying={isPlaying} onTogglePlay={togglePlay} />

        {/* Previsão do Tempo Criciúma Section */}
        <section id="previsao" className="max-w-7xl mx-auto px-4 pt-10 pb-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left w-full md:w-auto">
              {/* Weather icon */}
              <div className="flex items-center justify-center shrink-0 select-none p-3 bg-slate-50 border border-slate-100 rounded-xl">
                {weather ? (
                  renderWeatherIcon(
                    getWeatherCondition(weather.code).icon,
                    "w-10 h-10 drop-shadow-sm",
                  )
                ) : (
                  <Sun className="w-10 h-10 text-amber-500 animate-spin [animation-duration:20s]" />
                )}
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded">
                    Clima Criciúma / SC
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Tempo Real
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mt-1 tracking-tight">
                  Estação Meteorológica Regional
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Informações meteorológicas para Criciúma e Região Carbonífera
                </p>
              </div>
            </div>

            {/* Weather values */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 w-full md:w-auto">
              {weatherLoading ? (
                <div className="flex items-center gap-2 py-3 px-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-[#ff3e5e] animate-spin"></div>
                  <span>Atualizando dados do tempo...</span>
                </div>
              ) : weather ? (
                <>
                  {/* Temperature Pill */}
                  <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/80 flex items-center gap-3">
                    <div>
                      <span className="text-2xl sm:text-3xl font-black text-[#ff3e5e] tracking-tight">
                        {weather.temp}°C
                      </span>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-200"></div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800">
                        {getWeatherCondition(weather.code).text}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-slate-400" />
                        Sensação: <span className="font-bold text-slate-700">{weather.apparentTemp}°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Humidity Pill */}
                  <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/80 flex flex-col justify-center text-left min-w-[100px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-sky-500" />
                      Umidade
                    </span>
                    <span className="text-sm font-black text-slate-800 mt-0.5">
                      {weather.humidity}%
                    </span>
                  </div>

                  {/* Wind Pill */}
                  <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/80 flex flex-col justify-center text-left min-w-[100px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Wind className="w-3 h-3 text-slate-500" />
                      Vento
                    </span>
                    <span className="text-sm font-black text-slate-800 mt-0.5">
                      {weather.windSpeed} km/h
                    </span>
                  </div>

                  {/* Manual trigger refresh button */}
                  <button
                    onClick={fetchWeather}
                    disabled={isRefreshingWeather}
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center border border-slate-200 transition-colors cursor-pointer"
                    title="Atualizar dados climáticos"
                    aria-label="Atualizar dados climáticos"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isRefreshingWeather ? "animate-spin text-[#ff3e5e]" : ""}`}
                    />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {/* Portal Vitrine do Sul - Editorial News Section */}
        <section id="noticias" className="max-w-7xl mx-auto px-4 py-12">
          {/* Editorial Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-slate-200/80 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#ff3e5e] bg-[#ff3e5e]/10 px-2.5 py-0.5 rounded">
                  Jornalismo Regional
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-slate-500 text-xs font-semibold">Criciúma & Sul Catarinense</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Notícias do Portal Vitrine do Sul
              </h2>
              <p className="text-slate-600 text-sm mt-0.5">
                Cobertura diária dos principais acontecimentos com credibilidade e apuração local
              </p>
            </div>

            <a
              href="https://www.vitrinedosul.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-0 text-xs font-bold text-slate-700 hover:text-[#ff3e5e] transition-colors flex items-center gap-1.5 uppercase tracking-wider group"
            >
              <span>Acessar portal completo</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-[#ff3e5e]"></div>
              <span className="text-xs font-semibold uppercase tracking-wider">Carregando notícias da redação...</span>
            </div>
          ) : error ? (
            <div className="bg-amber-50 text-amber-800 p-6 rounded-xl flex items-center gap-4 border border-amber-200/80">
              <ShieldAlert className="w-6 h-6 flex-shrink-0 text-amber-600" />
              <p className="text-sm font-medium">
                Não conseguimos atualizar o feed de notícias neste instante. Acesse diretamente o{" "}
                <a
                  href="https://www.vitrinedosul.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-amber-900"
                >
                  Portal Vitrine do Sul
                </a>
                .
              </p>
            </div>
          ) : news.length > 0 ? (
            <div className="space-y-8">
              {/* Lead Feature Story (First Item) */}
              {news[0] && (
                <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <a
                      href={news[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-slate-100 relative block"
                    >
                      <img
                        src={news[0].imageUrl || VITRINE_SEM_FOTO}
                        alt={news[0].title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = VITRINE_SEM_FOTO;
                        }}
                      />
                      <span className="absolute top-4 left-4 bg-slate-900/85 text-white text-[10px] font-bold uppercase px-3 py-1 rounded backdrop-blur-sm">
                        Destaque da Redação
                      </span>
                    </a>

                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                          <span className="font-bold text-[#ff3e5e] uppercase tracking-wider text-[11px]">
                            Vitrine do Sul
                          </span>
                          <span>•</span>
                          <span>{new Date(news[0].pubDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                        </div>

                        <a
                          href={news[0].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#ff3e5e] transition-colors leading-tight mb-3">
                            {news[0].title}
                          </h3>
                        </a>

                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                          {news[0].description
                            ? news[0].description.replace(/<[^>]*>/g, "").substring(0, 220) + "..."
                            : ""}
                        </p>
                      </div>

                      <div>
                        <a
                          href={news[0].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-[#ff3e5e] text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors"
                        >
                          <span>Ler Matéria Completa</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Secondary Stories Grid */}
              {news.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.slice(1, 7).map((item, idx) => {
                    const imagem = item.imageUrl || VITRINE_SEM_FOTO;
                    const cleanDesc = item.description
                      ? item.description.replace(/<[^>]*>/g, "").substring(0, 140) + "..."
                      : "";

                    return (
                      <article
                        key={idx}
                        className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                      >
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full aspect-[16/10] overflow-hidden bg-slate-100 relative block shrink-0"
                        >
                          <img
                            src={imagem}
                            alt={item.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = VITRINE_SEM_FOTO;
                            }}
                          />
                          <span className="absolute bottom-2.5 right-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                            {new Date(item.pubDate).toLocaleDateString("pt-BR")}
                          </span>
                        </a>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff3e5e] mb-2">
                              Notícia Local
                            </div>

                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <h4 className="text-base font-bold text-slate-900 group-hover:text-[#ff3e5e] transition-colors leading-snug line-clamp-2 mb-2">
                                {item.title}
                              </h4>
                            </a>

                            <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
                              {cleanDesc}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-400 text-[11px]">Portal Vitrine do Sul</span>
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-900 group-hover:text-[#ff3e5e] transition-colors inline-flex items-center gap-1 text-xs font-bold"
                            >
                              <span>Acessar</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}
        </section>
      </main>

      {/* Mobile Versatile Floating Player Capsule (Accompany navigation smoothly, same colors and style) */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-[60] bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] border border-slate-200/90 p-2 sm:p-2.5 flex items-center justify-between gap-2.5 select-none transition-all">
        {/* Left: Tappable Show Avatar & Titles -> opens full show card */}
        <div
          onClick={() => setIsMobileCardOpen(true)}
          className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer active:opacity-80"
          title="Toque para ver o card completo do programa"
        >
          <div className="relative shrink-0">
            <img
              src={liveProgram.cardBgImage || CLUBE_LOGO}
              alt={liveProgram.title}
              className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs border border-slate-200">
              <ChevronUp className="w-2.5 h-2.5 text-slate-600" />
            </span>
          </div>

          <div className="flex flex-col text-left min-w-0">
            <span className="text-[10px] font-black tracking-wide text-amber-600 uppercase leading-none truncate">
              {liveProgram.host ? liveProgram.host : "NO AR AGORA"}
            </span>
            <span className="font-[1000] text-xs text-slate-900 leading-snug truncate mt-0.5">
              {liveProgram.title}
            </span>
          </div>
        </div>

        {/* Right: Same Red Live Dot + Purple 87.9 FM + Red Play/Pause Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex flex-col text-right leading-none">
            <div className="flex items-center justify-end gap-1 text-[10px] font-extrabold text-[#ff3e5e] uppercase">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#ff3e5e] animate-pulse" : "bg-slate-400"}`}></span>
              <span>AO VIVO</span>
            </div>
            <span className="text-[#4b2766] font-[1000] text-base leading-none mt-1">
              87.9 FM
            </span>
          </div>

          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#ff3e5e] hover:bg-[#e62e4e] text-white flex items-center justify-center shadow-lg ring-4 ring-[#ff3e5e]/25 active:scale-95 transition-all cursor-pointer shrink-0"
            title={isPlaying ? "Pausar transmissão" : "Ouvir rádio ao vivo"}
            aria-label={isPlaying ? "Pausar transmissão" : "Ouvir rádio ao vivo"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Expanded Full Card Modal (Opened on tapping show thumbnail) */}
      {isMobileCardOpen && (
        <div
          onClick={() => setIsMobileCardOpen(false)}
          className="md:hidden fixed inset-0 z-[70] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-72 max-w-[85vw] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 select-none animate-in zoom-in-95 duration-200"
          >
            {/* Top: Show Poster */}
            <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
              <img
                src={liveProgram.cardBgImage}
                alt={liveProgram.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={() => setIsMobileCardOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Presenter & Title */}
              <div className="absolute bottom-3.5 left-4 right-4 text-left pointer-events-none">
                <span className="block text-[11px] font-black text-amber-300 uppercase tracking-widest leading-none drop-shadow">
                  {liveProgram.host ? liveProgram.host : "NO AR AGORA"}
                </span>
                <h4 className="text-white font-[1000] text-base uppercase tracking-tight leading-tight mt-1 drop-shadow-md">
                  {liveProgram.title}
                </h4>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-4 bg-white flex items-center justify-between gap-3">
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-[#ff3e5e] hover:bg-[#e62e4e] text-white flex items-center justify-center shadow-lg ring-4 ring-[#ff3e5e]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                title={isPlaying ? "Pausar transmissão" : "Ouvir rádio ao vivo"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-1" />
                )}
              </button>

              <div className="flex flex-col text-right min-w-0 pr-1">
                <div className="flex items-center justify-end gap-1.5 text-[11px] font-extrabold text-[#ff3e5e] leading-none uppercase">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#ff3e5e] animate-pulse" : "bg-slate-400"}`}></span>
                  <span>AO VIVO</span>
                </div>
                <span className="text-[#4b2766] font-[1000] text-xl tracking-tight leading-none mt-1">
                  87.9 FM
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Side Floating Player (Matches image_c4ae59ed.png exactly) */}
      <aside
        aria-label="Player de Rádio ao Vivo"
        className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-[60] w-52 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden border border-slate-100 transition-all hover:scale-102 select-none"
      >
        {/* Top: Dynamic Show Background Image & Presenter/Show Title */}
        <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
          <img
            key={liveProgram.id}
            src={liveProgram.cardBgImage}
            alt={liveProgram.title}
            className="w-full h-full object-cover object-center transition-all duration-700"
          />
          {/* Gradient Overlay for Typography Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none"></div>

          {/* Presenter / Live Typography */}
          <div className="absolute bottom-3 left-3.5 right-3.5 text-left pointer-events-none">
            <span className="block text-[10px] font-black text-amber-300 uppercase tracking-widest leading-none drop-shadow">
              {liveProgram.host ? liveProgram.host : "NO AR AGORA"}
            </span>
            <h4 className="text-white font-[1000] text-sm uppercase tracking-tight leading-tight mt-1 drop-shadow-md line-clamp-2">
              {liveProgram.title}
            </h4>
          </div>
        </div>

        {/* Bottom: Play Button and Frequency */}
        <div className="p-3.5 bg-white flex items-center justify-between gap-2.5">
          {/* Circular Red Play/Pause Button with soft outer ring */}
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-[#ff3e5e] hover:bg-[#e62e4e] text-white flex items-center justify-center shadow-lg ring-4 ring-[#ff3e5e]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            title={isPlaying ? "Pausar transmissão" : "Ouvir rádio ao vivo"}
            aria-label={isPlaying ? "Pausar transmissão" : "Ouvir rádio ao vivo"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>

          {/* Frequency & Live Indicator */}
          <div className="flex flex-col text-right min-w-0 pr-1">
            <div className="flex items-center justify-end gap-1.5 text-[11px] font-extrabold text-[#ff3e5e] leading-none uppercase">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#ff3e5e] animate-pulse" : "bg-slate-400"}`}></span>
              <span>AO VIVO</span>
            </div>
            <span className="text-[#4b2766] font-[1000] text-xl tracking-tight leading-none mt-1">
              87.9 FM
            </span>
          </div>
        </div>
      </aside>

      {/* Comunidade VIP Clube FM (Matching image_c0b85fc6.png) */}
      <section
        id="vip"
        className="relative bg-[#fce315] py-14 sm:py-16 px-4 sm:px-6 overflow-hidden select-none"
      >
        {/* Ambient Studio Background Photo */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://radioclubecriciuma.com/imagens/estudioclubefm.png')",
          }}
        ></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Official Station Mascot in VIP */}
          <div className="relative mb-3 inline-flex items-center justify-center">
            <img
              src="https://radioclubecriciuma.com/imagens/mascote.png"
              alt="Mascote Clube FM Criciúma"
              className="h-28 sm:h-36 md:h-40 w-auto object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105 select-none"
            />
            {/* Friendly Mascot Badge */}
            <span className="absolute -top-1 -right-6 sm:-right-8 bg-[#3d1b54] text-[#fce315] text-[10px] sm:text-xs font-black px-3 py-1 rounded-full shadow-lg border-2 border-[#fce315]/40 whitespace-nowrap animate-bounce [animation-duration:3s]">
              Vem pro VIP! 🎁
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[950] text-[#3d1b54] tracking-tight mb-2">
            Comunidade VIP Clube FM Criciúma
          </h2>
          <div className="w-16 h-1 bg-[#3d1b54] mx-auto mb-4 rounded-full"></div>

          <p className="text-[#3d1b54] font-bold text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Cadastre-se na Rádio Clube FM Criciúma e concorra a prêmios incríveis, ingressos e brindes exclusivos da nossa promoção.
          </p>

          <div className="relative max-w-4xl mx-auto">
            {isSubmitting && (
              <div className="absolute inset-0 z-20 bg-[#3d1b54]/95 text-white rounded-3xl flex flex-col justify-center items-center gap-3 p-6 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#fce315] animate-spin"></div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white">Preparando seu cadastro...</h3>
                  <p className="text-xs text-slate-300">Redirecionando para o WhatsApp do ouvinte.</p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleClubeSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <input
                type="text"
                required
                placeholder="Seu nome*"
                value={clubeName}
                onChange={(e) => setClubeName(e.target.value)}
                className="w-full sm:w-auto flex-1 px-5 py-3.5 rounded-full bg-white text-slate-900 placeholder:text-slate-400 text-sm font-bold shadow-md outline-none border border-amber-200/50 focus:ring-2 focus:ring-[#3d1b54]"
              />
              <input
                type="email"
                required
                placeholder="Seu melhor email*"
                value={clubeEmail}
                onChange={(e) => setClubeEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 px-5 py-3.5 rounded-full bg-white text-slate-900 placeholder:text-slate-400 text-sm font-bold shadow-md outline-none border border-amber-200/50 focus:ring-2 focus:ring-[#3d1b54]"
              />
              <input
                type="tel"
                required
                placeholder="Seu telefone whatsapp*"
                value={clubePhone}
                onChange={handlePhoneChange}
                maxLength={15}
                className="w-full sm:w-auto flex-1 px-5 py-3.5 rounded-full bg-white text-slate-900 placeholder:text-slate-400 text-sm font-bold shadow-md outline-none border border-amber-200/50 focus:ring-2 focus:ring-[#3d1b54]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#ff3e5e] hover:bg-pink-600 text-white font-[950] text-xs uppercase tracking-wider rounded-full py-3.5 px-7 transition-all shadow-lg hover:shadow-xl hover:scale-103 active:scale-95 shrink-0 cursor-pointer"
              >
                CADASTRE-SE NO VIP
              </button>
            </form>
          </div>

          <p className="text-[#3d1b54]/80 text-xs mt-4 font-bold">
            Ao se cadastrar você concorda em enviar o convite pelo WhatsApp.
          </p>
        </div>
      </section>

      {/* Vibrant Magenta Divider Stripe */}
      <div className="h-2 bg-[#ff3e5e] w-full"></div>

      {/* Corporate Footer (Matching image_c0b85fc6.png) */}
      <footer className="relative bg-[#3a1b4d] text-white pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Studio Background Photo Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10 bg-cover bg-center mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80')",
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start pb-10 border-b border-white/10">
            {/* LEFT COLUMN: Logo & Address & Partners */}
            <div className="space-y-4 text-left">
              <a href="#" className="inline-block">
                <img
                  src={CLUBE_LOGO}
                  alt="Rádio Clube FM Criciúma 87.9"
                  className="h-16 w-auto object-contain"
                />
              </a>

              <div className="space-y-1 text-xs text-slate-300 font-medium">
                <h3 className="text-white font-[950] text-base tracking-tight">
                  Rádio Clube FM Criciúma
                </h3>
                <p>Rua Vendramino Dajori, 85 - Bairro Imigrantes</p>
                <p>Fundos da Cermoful - Criciúma, SC, Brasil</p>
              </div>

              <div className="pt-2 border-t border-white/10 max-w-md">
                <h4 className="text-[#fce315] font-[950] text-[11px] uppercase tracking-widest mb-3">
                  PARCEIROS & OPORTUNIDADES
                </h4>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.vitrinedosul.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all shadow-sm"
                  >
                    <img
                      src={VITRINE_LOGO}
                      alt="Vitrine do Sul"
                      className="h-6 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = LOCAL_VITRINE_LOGO;
                      }}
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-white font-black text-xs leading-none">Vitrine do Sul</span>
                      <span className="text-[10px] text-[#fce315] font-extrabold uppercase tracking-wider mt-0.5">VER NOTÍCIAS</span>
                    </div>
                  </a>

                  <button
                    onClick={() => setShowAnunciarModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ff3e5e] hover:bg-pink-600 text-white font-[950] text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-all cursor-pointer"
                  >
                    <Megaphone className="w-4 h-4 fill-current" />
                    <span>DEPARTAMENTO COMERCIAL</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Headline, Subtitle & Social Networks */}
            <div className="flex flex-col items-start md:items-end text-left md:text-right space-y-3">
              <h2 className="text-[#fce315] font-[1000] text-2xl sm:text-3xl uppercase tracking-wider leading-tight">
                A NÚMERO UM EM CRICIÚMA!
              </h2>

              <p className="text-slate-200 text-xs sm:text-sm font-semibold max-w-md leading-relaxed">
                Sintonize na frequência da alegria. Informação local, prêmios e a melhor seleção musical da sua vida.
              </p>

              <div className="pt-4">
                <span className="block text-slate-300 text-[11px] font-black uppercase tracking-widest mb-2">
                  SIGA NOSSAS REDES
                </span>

                <div className="flex items-center justify-start md:justify-end gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=61593649783878"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#ff3e5e] text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                    title="Facebook Oficial"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 fill-current" />
                  </a>
                  <a
                    href="https://www.instagram.com/radioclubefmcriciuma/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#ff3e5e] text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                    title="Instagram Oficial"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@radioclubefmcriciuma/streams"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#ff3e5e] text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                    title="YouTube Oficial"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 font-semibold gap-4">
            <p>© {new Date().getFullYear()} Rádio Clube FM. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1">
              <span>Desenvolvido com ❤️ por</span>
              <a
                href="https://www.innovetecnologia.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fce315] font-black hover:underline ml-1"
              >
                Innove Tecnologia
              </a>
            </p>
          </div>
        </div>
      </footer>


      {/* Modal Como Anunciar */}
      {showAnunciarModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          {/* Modal Container */}
          <div className="relative bg-white text-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Red accent top bar */}
            <div className="h-1.5 bg-[#ff3e5e]"></div>
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ff3e5e]/10 text-[#ff3e5e] rounded-xl flex items-center justify-center shrink-0">
                  <Megaphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-200/80 text-slate-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider">
                      Oportunidade Comercial
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Atendimento Ativo
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 leading-none">
                    Como Anunciar na Clube FM
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Divulgue sua marca na rádio número um de Criciúma e Região
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowAnunciarModal(false)}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh] space-y-6">
              {/* Main Banner pitch */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-800">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff3e5e]" />
                  Acelere os Resultados da Sua Empresa
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Anunciar na <strong>Clube FM Criciúma</strong> é ter a certeza de que a sua marca estará presente no dia a dia da região carbonífera. Através do rádio convencional, aplicativo oficial, e redes integradas, alcançamos milhares de clientes em potencial todos os dias, com alta retenção e retorno garantido.
                </p>
              </div>

              {/* Grid section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#ff3e5e]" />
                    Vantagens da Nossa Rádio
                  </h4>
                  <ul className="space-y-3.5">
                    <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-[#ff3e5e]/10 text-[#ff3e5e] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      </div>
                      <div>
                        <strong className="text-slate-800">Audiência Altamente Fiel:</strong> Ouvintes apaixonados que confiam nas recomendações dos nossos comunicadores.
                      </div>
                    </li>
                    <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-[#ff3e5e]/10 text-[#ff3e5e] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      </div>
                      <div>
                        <strong className="text-slate-800">Localização Estratégica:</strong> Presentes no coração do sul catarinense, cobrindo Criciúma e cidades vizinhas.
                      </div>
                    </li>
                    <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-[#ff3e5e]/10 text-[#ff3e5e] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      </div>
                      <div>
                        <strong className="text-slate-800">Presença Multiplataforma:</strong> Sua marca no rádio FM regional, app oficial e mídias sociais.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#5c337c]" />
                    Formatos de Anúncio
                  </h4>
                  <ul className="space-y-3.5">
                    <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-[#5c337c]/10 text-[#5c337c] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      </div>
                      <div>
                        <strong className="text-slate-800">Spots Comerciais (30" e 15"):</strong> Inserções profissionais distribuídas estrategicamente na programação.
                      </div>
                    </li>
                    <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-[#5c337c]/10 text-[#5c337c] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      </div>
                      <div>
                        <strong className="text-slate-800">Patrocínio Promocional:</strong> Sua marca associada aos prêmios mais desejados de Criciúma.
                      </div>
                    </li>
                    <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-[#5c337c]/10 text-[#5c337c] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      </div>
                      <div>
                        <strong className="text-slate-800">Merchandising & Flashes:</strong> Divulgações ao vivo e ações sob medida para datas sazonais.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Commercial WhatsApp Contact CTA Area */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-black rounded-full uppercase tracking-wider">
                    Fale Direto com o Consultor
                  </span>
                  <h4 className="text-lg font-black text-slate-800 mt-1">
                    Gostaria de Receber Planos Comerciais?
                  </h4>
                  <p className="text-slate-500 text-xs font-medium max-w-sm md:max-w-md">
                    Clique no botão para falar conosco no WhatsApp. Criamos pacotes ideais para o tamanho da sua empresa.
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2.5 w-full md:w-auto">
                  <a
                    href="https://wa.me/5548991950093?text=Olá!%20Gostaria%20de%20anunciar%20minha%20empresa%20na%20Clube%20FM%20Criciúma.%20Poderia%20me%20enviar%20os%20planos%20comerciais%20e%20formatos%20disponíveis?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 hover:scale-103 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-5 h-5 shrink-0"
                    >
                      <path d="M12.031 0A12 12 0 0 0 0 12c0 2.115.553 4.108 1.542 5.867L.18 23.518l5.807-1.514A11.972 11.972 0 0 0 12.031 24c6.627 0 12-5.373 12-12s-5.373-12-12-12zm6.657 17.15c-.279.79-1.343 1.517-2.072 1.637-.73.12-1.748.337-5.597-1.258-4.63-1.92-7.653-6.666-7.882-6.974-.23-.307-1.884-2.508-1.884-4.786s1.173-3.398 1.583-3.834c.41-.437.892-.547 1.19-.547.297 0 .596.012.86.026.275.014.646-.107.994.733.364.876 1.19 2.909 1.295 3.126.107.218.18.472.046.732-.132.261-.202.424-.4.636-.2.21-.418.468-.598.648-.198.196-.407.411-.18 2.015.632 1.748 1.83 2.998 3.018 3.996C14.07 15.358 14.887 15.228 15.118 14.935c.23-.294 1.01-1.178 1.288-1.582.277-.405.553-.338.92-.203.367.135 2.327 1.096 2.723 1.294.397.198.66.297.755.462.097.165.097.962-.182 1.75z" />
                    </svg>
                    <span>Falar no WhatsApp</span>
                  </a>
                  <span className="text-[13px] font-extrabold text-slate-700 tracking-wide flex items-center gap-1.5 justify-center">
                    <Phone className="w-3.5 h-3.5 text-emerald-500 fill-current shrink-0" />
                    +55 48 99195-0093
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer with quick contacts */}
            <div className="bg-gradient-to-b from-white to-slate-50 p-6 sm:px-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#ff3e5e]" />
                comercial@innovetecnologia.com.br
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#5c337c]" />
                Rua Vendramino Dajori, 85 - Criciúma, SC
              </span>
            </div>
          </div>
        </div>
      )}

      {playingVideoId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setPlayingVideoId(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
               <X className="w-6 h-6" />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {selectedNewsUrl && (
        <div className="fixed inset-0 z-[50] flex flex-col bg-white">
          <div className="h-14 bg-[#4b2766] flex items-center justify-between px-4 shrink-0 shadow-md relative z-10">
            <h3 className="text-white font-bold tracking-wide truncate pr-4">Clube FM - Notícias do Portal</h3>
            <div className="flex items-center gap-2">
              <a
                href={selectedNewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors shrink-0"
                title="Abrir diretamente no Portal Vitrine do Sul"
              >
                <span>Abrir no Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={() => setSelectedNewsUrl(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close news"
              >
                 <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full bg-slate-50 relative pb-[76px] md:pb-0">
            <iframe
              src={selectedNewsUrl}
              className="w-full h-full border-none"
              title="Notícia"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            ></iframe>
          </div>
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={STREAM_URL}
        preload="auto"
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
