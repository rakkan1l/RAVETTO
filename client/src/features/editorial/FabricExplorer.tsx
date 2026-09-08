import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FabricExplorer: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const hotspots = [
    {
      id: 0,
      number: '01',
      title: 'DENSE 24-GAUGE KNIT',
      x: '35%',
      y: '32%',
      detail:
        'Knitted at ultra-high gauge to prevent yarn shifting. The weave is uniform and opaque, completely eliminating transparency even under harsh direct light.',
      metric: '24 Loops/Inch',
    },
    {
      id: 1,
      number: '02',
      title: 'COMBED SUPIMA HAND-FEEL',
      x: '62%',
      y: '45%',
      detail:
        'Only extra-long staple fibers survive our mechanical combing process. Short, prickly fibers are removed, yielding a butter-smooth tactile surface that softens with each wash.',
      metric: '35% Longer Staple',
    },
    {
      id: 2,
      number: '03',
      title: 'NATURAL BREATHABILITY',
      x: '42%',
      y: '65%',
      detail:
        'Zero synthetic blending. Pure 100% long-staple cellulose fibers allow air to circulate freely between the micro-ribs, maintaining thermal comfort across all seasons.',
      metric: '100% Cellulose',
    },
    {
      id: 3,
      number: '04',
      title: 'PRE-SHRUNK BIO-FINISH',
      x: '75%',
      y: '72%',
      detail:
        'Finished with natural plant-derived enzymes and heat-stabilized steam calendars. Garment dimensions remain true wash after wash without chemical resin coats.',
      metric: '<1.5% Shrinkage',
    },
  ];

  const current = hotspots[activeHotspot];

  return (
    <section className="py-24 sm:py-32 bg-ravetto-offwhite-paper border-b border-ravetto-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="micro-caps text-ravetto-teal block">
            Signature Innovation
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
            Explore the Fabric
          </h2>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-ravetto-muted">
            240 GSM &bull; 100% Single-Origin Supima Cotton
          </p>
        </div>

        {/* Interactive Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Macro Fabric Image with Hotspots */}
          <div className="lg:col-span-8 relative aspect-[16/10] bg-ravetto-offwhite border border-ravetto-border overflow-hidden select-none">
            <img
              src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1600&q=90"
              alt="Macro Fabric Weave Texture"
              className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Contrast Filter */}
            <div className="absolute inset-0 bg-ravetto-text/10" />

            {/* Interactive Hotspot Pins */}
            {hotspots.map((spot) => {
              const isActive = activeHotspot === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot.id)}
                  aria-label={`Inspect ${spot.title}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                  style={{ left: spot.x, top: spot.y }}
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-mono font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-ravetto-teal text-white ring-4 ring-ravetto-mint scale-110 shadow-lg'
                        : 'bg-white/90 text-ravetto-text border border-ravetto-border hover:bg-white hover:scale-105'
                    }`}
                  >
                    {spot.number}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Detail Card */}
          <div className="lg:col-span-4 bg-ravetto-offwhite border border-ravetto-border p-8 text-left space-y-6 flex flex-col justify-between min-h-[360px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-ravetto-border">
                <span className="font-mono text-xs font-semibold text-ravetto-teal uppercase tracking-widest">
                  Hotspot {current.number}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-ravetto-mint-subtle px-2 py-0.5 text-ravetto-teal border border-ravetto-mint">
                  {current.metric}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="pt-6 space-y-3"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ravetto-text">
                    {current.title}
                  </h3>
                  <p className="text-xs text-ravetto-muted leading-relaxed font-sans">
                    {current.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Micro Tabs */}
            <div className="grid grid-cols-4 gap-2 pt-6 border-t border-ravetto-border">
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot.id)}
                  className={`py-2 text-[10px] font-mono tracking-widest uppercase transition-all ${
                    activeHotspot === spot.id
                      ? 'border-b-2 border-ravetto-teal text-ravetto-teal font-bold'
                      : 'text-ravetto-muted hover:text-ravetto-text'
                  }`}
                >
                  {spot.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
