import React from "react";
import { X, Megaphone, Phone, ExternalLink, CheckCircle2, TrendingUp, Users, Radio } from "lucide-react";
import { Link } from "react-router-dom";

interface AnuncieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnuncieModal({ isOpen, onClose }: AnuncieModalProps) {
  if (!isOpen) return null;

  const benefits = [
    "Alcance mais de 100 mil ouvintes na Grande Criciúma e Sul Catarinense",
    "Spots comerciais de 15s e 30s na rádio número 1",
    "Divulgação integrada no Portal Vitrine do Sul e redes sociais",
    "Ações promocionais ao vivo, sorteios e blitz nos seus estabelecimentos",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-700/20 to-indigo-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#2152ff] rounded-2xl text-white shadow-lg">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Anuncie na Clube FM
              </h2>
              <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">
                Sua marca no coração de Criciúma
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
            <p className="font-semibold text-white text-base">
              Coloque seu negócio em destaque na rádio mais ouvida e com maior engajamento do Sul de Santa Catarina!
            </p>
            <p>
              Temos planos comerciais sob medida para empresas de todos os portes: de patrocínio de programas a spots rotativos e ações especiais.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-2.5 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <h4 className="text-xs font-black uppercase tracking-wider text-blue-400 mb-2">
              Vantagens Exclusivas:
            </h4>
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href="https://wa.me/5548991950093?text=Olá!%20Gostaria%20de%20anunciar%20minha%20empresa%20na%20Clube%20FM%20Criciúma.%20Poderia%20me%20enviar%20os%20planos%20comerciais?"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 hover:scale-102 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Chamar no WhatsApp Comercial</span>
            </a>

            <Link
              to="/anuncie"
              onClick={onClose}
              className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-102 transition-all"
            >
              <span>Ver Página Completa</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
