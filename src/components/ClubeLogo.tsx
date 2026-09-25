import React from "react";
import logoImgFallback from "../assets/images/clube_fm_logo_heart_1789835525136.jpg";

interface ClubeLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const OFFICIAL_LOGO_URL = "https://radioclubecriciuma.com/imagens/logoclubepng.png";

export default function ClubeLogo({
  className = "",
  showSubtitle = false,
  size = "md",
}: ClubeLogoProps) {
  const sizeClasses = {
    sm: "h-9 w-auto",
    md: "h-12 sm:h-14 w-auto",
    lg: "h-16 sm:h-20 w-auto",
    xl: "h-24 sm:h-32 w-auto",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative group">
        {/* Subtle glow behind logo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#ff1e56] to-[#ffb703] rounded-2xl blur-md opacity-30 group-hover:opacity-75 transition duration-500"></div>
        
        {/* Logo container */}
        <div className="relative flex items-center justify-center">
          <img
            src={OFFICIAL_LOGO_URL}
            alt="Clube 87,9 FM"
            onError={(e) => {
              e.currentTarget.src = logoImgFallback;
            }}
            className={`${sizeClasses[size]} object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105`}
          />
        </div>
      </div>

      {showSubtitle && (
        <div className="flex flex-col text-left">
          <span className="font-display font-black text-white text-base tracking-tight leading-none">
            Clube 87,9 FM
          </span>
          <span className="text-[#ffb703] font-bold text-xs tracking-wider uppercase">
            A rádio do coração
          </span>
        </div>
      )}
    </div>
  );
}

