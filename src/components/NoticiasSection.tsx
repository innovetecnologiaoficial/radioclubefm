import React, { useState } from "react";
import { Newspaper, Calendar, ArrowRight, ExternalLink, Sparkles, Filter } from "lucide-react";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl: string;
  category?: string;
}

interface NoticiasSectionProps {
  news: NewsItem[];
  loading: boolean;
  onOpenModal?: () => void;
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    title: "Criciúma E.C. anuncia novidades para o elenco da temporada com apoio da torcida",
    link: "https://www.vitrinedosul.com.br",
    pubDate: new Date().toISOString(),
    description: "Equipe carvoeira intensifica treinamentos e diretoria confirma contratações estratégicas para as próximas disputas no Majestoso.",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    category: "Esportes",
  },
  {
    title: "Obras de infraestrutura avançam no Centro e bairros de Criciúma nesta semana",
    link: "https://www.vitrinedosul.com.br",
    pubDate: new Date().toISOString(),
    description: "Prefeitura e órgãos de trânsito orientam motoristas sobre novas pavimentações, sinalizações e melhorias no fluxo viário da cidade.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    category: "Criciúma",
  },
  {
    title: "Festival Gastronômico e Cultural reúne famílias e movimenta o Sul Catarinense",
    link: "https://www.vitrinedosul.com.br",
    pubDate: new Date().toISOString(),
    description: "Com muita música ao vivo, gastronomia típica italiana e atrações artísticas, o evento celebra as tradições da região carbonífera.",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    category: "Cultura & Lazer",
  },
  {
    title: "Previsão do tempo indica dias de sol e temperaturas amenas em Santa Catarina",
    link: "https://www.vitrinedosul.com.br",
    pubDate: new Date().toISOString(),
    description: "Meteorologistas confirmam massa de ar estável trazendo manhãs frescas e tardes agradáveis para toda a região Sul do estado.",
    imageUrl: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80",
    category: "Geral",
  },
];

export default function NoticiasSection({ news, loading }: NoticiasSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  // Display items: use fetched news if available, or fallbacks
  const displayNews: NewsItem[] = (news && news.length > 0)
    ? news.map((item, idx) => ({
        ...item,
        category: idx % 3 === 0 ? "Criciúma" : idx % 3 === 1 ? "Esportes" : "Região Sul",
      }))
    : FALLBACK_NEWS;

  const categories = ["Todas", "Criciúma", "Esportes", "Região Sul"];

  const filteredItems = selectedCategory === "Todas"
    ? displayNews
    : displayNews.filter((item) => (item.category || "").toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="noticias" className="relative py-20 bg-[#08090e] text-white border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-display font-black text-xs uppercase tracking-widest mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>PORTAL VITRINE DO SUL & CLUBE FM</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              ÚLTIMAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">NOTÍCIAS</span>
            </h2>
            <p className="text-zinc-400 font-medium text-sm sm:text-base mt-2 max-w-2xl">
              Fique por dentro dos principais acontecimentos de Criciúma, da região carbonífera e do Sul Catarinense em tempo real.
            </p>
          </div>

          <a
            href="https://www.vitrinedosul.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/20 text-white text-xs font-black uppercase tracking-wider transition-all duration-300"
          >
            <span>Ver Portal Completo</span>
            <ExternalLink className="w-4 h-4 text-amber-400" />
          </a>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 font-extrabold"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.slice(0, 8).map((item, index) => {
            const formattedDate = item.pubDate
              ? new Date(item.pubDate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })
              : "Hoje";

            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#121420] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/60 shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Image & Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-black">
                  <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121420] via-transparent to-transparent"></div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                      {item.category || "Notícia"}
                    </span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] font-mono">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{formattedDate}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {item.description.replace(/<[^>]*>?/gm, "")}
                    </p>
                  </div>

                  {/* Read more action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-black text-amber-400 group-hover:text-amber-300 transition-colors uppercase tracking-wider">
                    <span>Leia Mais</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
