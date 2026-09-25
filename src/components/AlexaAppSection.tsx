import React, { useState } from "react";
import alexaImg from "../assets/images/alexa_app_section_1789835509573.jpg";
import ClubeLogo from "./ClubeLogo";

// Apple Icon SVG
const AppleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

// Play Store Icon SVG
const PlayStoreIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
);

export default function AlexaAppSection() {
  const [copiedAlexa, setCopiedAlexa] = useState(false);

  const handleCopyAlexaCommand = () => {
    navigator.clipboard?.writeText("Alexa, tocar Clube 87.9 FM");
    setCopiedAlexa(true);
    setTimeout(() => setCopiedAlexa(false), 2500);
  };

  return (
    <section id="app-alexa" className="relative my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0c1326] text-white p-8 sm:p-12 lg:p-16 border border-blue-500/20 shadow-2xl">
        {/* Background Image Texture */}
        <div className="absolute inset-0 z-0">
          <img
            src={alexaImg}
            alt="Ouça no App e na Alexa"
            className="w-full h-full object-cover opacity-50 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b18] via-[#091124]/90 to-[#070b18]/70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent"></div>
        </div>

        {/* Dynamic Glowing Circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Side: Typography & Download Badges */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[44px] tracking-tight leading-[1.05] uppercase">
                OUÇA NO APP <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400">
                  E NA ALEXA
                </span>
              </h2>
              <p className="font-extrabold text-xs sm:text-sm text-blue-200 tracking-wider uppercase">
                A CLUBE 87,9 FM SEMPRE COM VOCÊ, EM TODO LUGAR!
              </p>
            </div>

            {/* App Store / Play Store Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=br.com.radioclubecriciuma"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
              >
                <PlayStoreIcon className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[10px] uppercase font-bold text-white/70">
                    Disponível no
                  </span>
                  <span className="text-sm font-black text-white">Google Play</span>
                </div>
              </a>

              {/* App Store */}
              <a
                href="https://apps.apple.com/us/app/r%C3%A1dio-clube-crici%C3%BAma/id6777545744"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
              >
                <AppleIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[10px] uppercase font-bold text-white/70">
                    Disponível na
                  </span>
                  <span className="text-sm font-black text-white">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Center: Alexa Speech Bubble & Interactive Trigger */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
            {/* Alexa Speech Bubble */}
            <button
              onClick={handleCopyAlexaCommand}
              className="group relative bg-white text-slate-900 rounded-full px-6 py-3.5 shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 border-cyan-400 cursor-pointer"
              title="Clique para copiar o comando"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-500 animate-ping"></div>
              <span className="font-display font-black text-sm sm:text-base text-slate-900">
                &ldquo;Alexa, Tocar Clube 87,9 FM&rdquo;
              </span>
              
              {/* Little speech tail pointer */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r-2 border-b-2 border-cyan-400"></div>
            </button>

            {/* Hand-drawn doodle: É SÓ PEDIR! */}
            <div className="flex items-center gap-2 pt-2">
              <span className="font-marker text-lg sm:text-xl text-amber-300 tracking-wider transform -rotate-6">
                {copiedAlexa ? "COMANDO COPIADO! ✅" : "É SÓ PEDIR! 🎙️"}
              </span>
            </div>
          </div>

          {/* Right Side: Clube Heart Logo & Life slogan */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right space-y-3">
            <ClubeLogo size="lg" />
            
            <div className="space-y-1">
              <p className="font-marker text-xl sm:text-2xl text-white tracking-wide leading-tight">
                MAIS QUE RÁDIO, <br />
                <span className="text-[#ff3b56]">FAZ PARTE DA SUA VIDA!</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
