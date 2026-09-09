import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalBrandCTAProps {
  onShopAll: () => void;
  onDiscoverStory: () => void;
}

export const FinalBrandCTA: React.FC<FinalBrandCTAProps> = ({
  onShopAll,
  onDiscoverStory,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FDFCF5]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Large Rounded Brand Section (rounded-[36px] with warm editorial atmosphere) */}
        <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-[#5C4033] text-[#FDFCF5] p-8 sm:p-14 lg:p-20 shadow-[0_12px_40px_rgba(92,64,51,0.18)]">
          {/* Subtle Background Pattern / Vignette */}
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=85"
              alt="Ravetto Garment Detail"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#5C4033] via-[#5C4033]/90 to-transparent z-0" />

          {/* Foreground Content */}
          <div className="relative z-10 max-w-2xl text-left space-y-6 sm:space-y-8">
            <span className="font-outfit text-xs font-semibold uppercase tracking-[0.22em] text-[#879E57] block">
              THE DETAILS MAKE THE DIFFERENCE.
            </span>

            <h2 className="font-outfit text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#FDFCF5] tracking-tight leading-[1.1]">
              Every stitch has a purpose.
            </h2>

            <p className="text-base sm:text-lg text-[#FDFCF5]/85 font-sans leading-relaxed max-w-xl">
              From combed yarn spinning in Tiruppur to pre-shrunk steam finishing, every Ravetto piece is crafted to redefine your everyday foundational wardrobe.
            </p>

            {/* Dual Pill Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopAll}
                className="px-8 py-4 rounded-full bg-[#879E57] text-white font-outfit font-semibold text-xs sm:text-sm tracking-[0.12em] uppercase hover:bg-[#728848] transition-all duration-300 shadow-md hover:-translate-y-0.5 active:scale-95 inline-flex items-center space-x-2"
              >
                <span>Shop All Garments</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDiscoverStory}
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white text-[#FDFCF5] hover:text-[#5C4033] border border-white/20 font-outfit font-semibold text-xs sm:text-sm tracking-[0.12em] uppercase transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 active:scale-95"
              >
                <span>Discover Our Story</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
