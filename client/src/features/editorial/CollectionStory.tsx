import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CollectionStoryProps {
  onNavigate: (path: string) => void;
}

export const CollectionStory: React.FC<CollectionStoryProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 sm:py-32 bg-ravetto-offwhite border-b border-ravetto-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Editorial Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-ravetto-border gap-6">
          <div>
            <span className="micro-caps text-ravetto-teal block mb-2">
              01 &bull; Curated Editions
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
              The Architecture of Cotton
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-ravetto-muted max-w-sm leading-relaxed">
            Every garment begins with yarn density. We engineer tension at the loom before cutting a single pattern.
          </p>
        </div>

        {/* Feature Story 01: The Essential Tee (Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center pt-16">
          {/* Left Large Fashion Image */}
          <div className="lg:col-span-7 relative aspect-[4/5] bg-ravetto-offwhite-paper overflow-hidden group cursor-pointer"
            onClick={() => onNavigate('/products/essential-tee')}
          >
            <img
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1400&q=85"
              alt="The Essential Tee Editorial"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-ravetto-text">
              Plate 01 &bull; Tiruppur Knit
            </div>
          </div>

          {/* Right Editorial Copy & Spec Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ravetto-teal">
                01 / THE FOUNDATIONS
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-ravetto-text">
                The Essential Tee
              </h3>
              <p className="text-xs font-mono text-ravetto-muted uppercase tracking-widest">
                240 GSM &bull; 100% Combed Supima Cotton &bull; ₹1,499
              </p>
            </div>

            <p className="text-xs sm:text-sm text-ravetto-muted leading-relaxed">
              Knitted from single-origin Supima cotton fibers that measure 35% longer than standard cotton. The result is a substantial 240 GSM fabric that resists pilling, maintains zero torque through machine washing, and falls in a clean, vertical line.
            </p>

            {/* Spec Attributes Box */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-ravetto-border text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-ravetto-muted block">
                  Collar
                </span>
                <span className="font-medium text-ravetto-text text-xs">
                  Double-Rib Reinforced
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-ravetto-muted block">
                  Silhouette
                </span>
                <span className="font-medium text-ravetto-text text-xs">
                  Structured Regular
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-ravetto-muted block">
                  Finish
                </span>
                <span className="font-medium text-ravetto-text text-xs">
                  Bio-Polished Pre-Shrunk
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-ravetto-muted block">
                  Weight
                </span>
                <span className="font-medium text-ravetto-text text-xs">
                  240 Grams / Sq Meter
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={() => onNavigate('/products/essential-tee')}
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.18em] font-medium text-ravetto-teal hover:text-ravetto-teal-dark group select-none"
              >
                <span>Inspect The Essential Tee</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Story 02: The Heavyweight Atelier (Inverted Asymmetrical Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center pt-24">
          {/* Left Text */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-8 text-left">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ravetto-teal">
                02 / ARCHITECTURAL KNIT
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-ravetto-text">
                Heavyweight Oversized
              </h3>
              <p className="text-xs font-mono text-ravetto-muted uppercase tracking-widest">
                280 GSM &bull; Interlock Knit &bull; ₹1,899
              </p>
            </div>

            <p className="text-xs sm:text-sm text-ravetto-muted leading-relaxed">
              At 280 GSM, this garment occupies the space between a structured T-shirt and light outerwear. Cut with an intentional drop shoulder and a generous chest box that stands away from the body rather than clinging.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-ravetto-border text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-ravetto-muted block">
                  Knit Type
                </span>
                <span className="font-medium text-ravetto-text text-xs">
                  280 GSM Interlock
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-ravetto-muted block">
                  Drape
                </span>
                <span className="font-medium text-ravetto-text text-xs">
                  Sculptural Box Cut
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={() => onNavigate('/products/heavyweight-oversized-tee')}
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.18em] font-medium text-ravetto-teal hover:text-ravetto-teal-dark group select-none"
              >
                <span>Inspect Heavyweight Edition</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Fashion Image */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative aspect-[4/5] bg-ravetto-offwhite-paper overflow-hidden group cursor-pointer"
            onClick={() => onNavigate('/products/heavyweight-oversized-tee')}
          >
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85"
              alt="Heavyweight Oversized Tee Campaign"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-ravetto-text">
              Plate 02 &bull; 280 GSM Interlock
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
