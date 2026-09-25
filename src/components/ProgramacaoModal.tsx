import React, { useState } from "react";
import { X, Clock, Calendar, Radio, Sparkles } from "lucide-react";
import NextGameCountdown from "./NextGameCountdown";

interface ProgramacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgramacaoModal({ isOpen, onClose }: ProgramacaoModalProps) {
  const [selectedDay, setSelectedDay] = useState<"seg-sex" | "sab" | "dom">("seg-sex");

  if (!isOpen) return null;

  const scheduleData = {
    "seg-sex": [
      { time: "05:00 - 08:00", name: "Amanhecer no Sertão", host: "Zé da Viola", desc: "Os grandes clássicos do sertanejo raiz para começar o dia." },
      { time: "08:00 - 12:00", name: "Manhã Clube", host: "Lucas Andrade", desc: "Música, notícias em tempo real, prêmios e a participação do ouvinte." },
      { time: "12:00 - 13:00", name: "Jornal da Clube & Vitrine", host: "Equipe de Jornalismo", desc: "O resumo dos principais acontecimentos de Criciúma e do Sul de SC." },
      { time: "13:00 - 17:00", name: "Tarde Show", host: "Camila Rocha", desc: "Os maiores sucessos pop, sertanejo universitário e fofocas dos famosos." },
      { time: "17:00 - 19:00", name: "Clube Esporte", host: "Marco Silva", desc: "Tudo sobre o Tigre (Criciúma E.C.), Brasileirão e bastidores do esporte." },
      { time: "19:00 - 22:00", name: "As Mais Pedidas", host: "DJ Rick", desc: "A parada de sucessos votada pelo WhatsApp oficial dos ouvintes." },
      { time: "22:00 - 05:00", name: "Clube Love & Madrugada", host: "Programação Musical", desc: "Músicas românticas e tranquilas para embalar a sua noite." },
    ],
    sab: [
      { time: "06:00 - 09:00", name: "Rancho da Clube", host: "Beto Gaúcho", desc: "Tradição gaúcha, vanerão e muita alegria no fim de semana." },
      { time: "09:00 - 13:00", name: "Sabadão Premiado", host: "Equipe Clube", desc: "Sorteios ao vivo, prêmios exclusivos e hits dançantes." },
      { time: "13:00 - 18:00", name: "Conexão Criciúma", host: "Felipe Costa", desc: "O melhor da música jovem e flashes dos eventos da cidade." },
      { time: "18:00 - 00:00", name: "Balada Clube FM", host: "DJs Convidados", desc: "As melhores tracks de eletrônica, funk e pop para esquentar a noite." },
    ],
    dom: [
      { time: "07:00 - 11:00", name: "Domingo Especial", host: "Música e Fé", desc: "Mensagens de paz, esperança e boa música para toda a família." },
      { time: "11:00 - 15:00", name: "Churrascão da Clube", host: "Carlinhos Show", desc: "Pagode, sertanejo e samba para o melhor churrasco em família." },
      { time: "15:00 - 19:00", name: "Jornada Esportiva", host: "Equipe de Esportes", desc: "Transmissão completa das partidas do Criciúma E.C. ao vivo." },
      { time: "19:00 - 00:00", name: "Noite Retrô", host: "Flashback Clube", desc: "As músicas inesquecíveis dos anos 80, 90 e 2000." },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-orange-600/20 to-red-600/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#ff5e14] rounded-2xl text-white shadow-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Grade de Programação
              </h2>
              <p className="text-xs text-orange-300 font-bold uppercase tracking-wider">
                Clube 87,9 FM • Criciúma
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

        {/* Day Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-2 text-xs font-black uppercase tracking-wider">
          <button
            onClick={() => setSelectedDay("seg-sex")}
            className={`flex-1 py-3 rounded-xl transition-all ${
              selectedDay === "seg-sex"
                ? "bg-[#ff5e14] text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Segunda a Sexta
          </button>
          <button
            onClick={() => setSelectedDay("sab")}
            className={`flex-1 py-3 rounded-xl transition-all ${
              selectedDay === "sab"
                ? "bg-[#ff5e14] text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Sábado
          </button>
          <button
            onClick={() => setSelectedDay("dom")}
            className={`flex-1 py-3 rounded-xl transition-all ${
              selectedDay === "dom"
                ? "bg-[#ff5e14] text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Domingo
          </button>
        </div>

        {/* Schedule List */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {scheduleData[selectedDay].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-black">
                    {item.time}
                  </span>
                  <h4 className="font-bold text-white text-base">{item.name}</h4>
                </div>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                <span className="text-[11px] font-bold text-slate-300 bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-orange-400" />
                  {item.host}
                </span>
              </div>
            </div>
          ))}

          {/* Criciúma Next Game Embed */}
          <div className="pt-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Transmissão Esportiva Especial Clube FM
            </h3>
            <NextGameCountdown />
          </div>
        </div>

      </div>
    </div>
  );
}
