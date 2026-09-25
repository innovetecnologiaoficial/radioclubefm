import React, { useState } from "react";
import { X, Newspaper, ExternalLink, Calendar, Search } from "lucide-react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl: string;
}

interface NoticiasModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem[];
  loading: boolean;
}

export default function NoticiasModal({
  isOpen,
  onClose,
  news,
  loading,
}: NoticiasModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-red-600/20 to-rose-600/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#ff1e38] rounded-2xl text-white shadow-lg">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Últimas Notícias
              </h2>
              <p className="text-xs text-red-300 font-bold uppercase tracking-wider">
                Portal Vitrine do Sul & Clube FM Criciúma
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

        {/* Search bar inside modal */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Filtrar notícias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 pl-9 text-xs text-white placeholder-white/50 focus:outline-none focus:border-red-500"
            />
            <Search className="w-4 h-4 text-white/50 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* News List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {loading ? (
            <div className="text-center py-12 text-slate-400">
              <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="font-bold text-sm">Carregando notícias do Sul de SC...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="font-bold text-sm">Nenhuma notícia encontrada para &ldquo;{searchTerm}&rdquo;.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNews.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all"
                >
                  {item.imageUrl && (
                    <div className="h-44 w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-red-400" />
                        {new Date(item.pubDate).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  )}

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <h4 className="font-bold text-white text-sm group-hover:text-red-400 transition-colors line-clamp-2">
                      {item.title}
                    </h4>

                    <div className="pt-2 flex items-center justify-between text-xs font-bold text-red-400">
                      <span>Ler no Portal Vitrine</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
