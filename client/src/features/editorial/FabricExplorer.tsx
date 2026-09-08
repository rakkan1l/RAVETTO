import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FabricExplorer: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const MACRO_IMAGE_URL = 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1600&q=95';

  const hotspots = [
    {
      id: 0,
      number: '01',
      title: 'DENSE KNIT',
      badge: '24 Loops/Inch',
      x: '32%',
      y: '30%',
      desc: 'High-tension 24-gauge knitting creates an opaque, substantial weave that eliminates sheer transparency and resists warping.',
    },
    {
      id: 1,
      number: '02',
      title: 'SOFT HAND FEEL',
      badge: 'Long-Staple Supima',
      x: '60%',
      y: '42%',
      desc: 'Combed long-staple cotton yarns produce a buttery tactile finish that softens further with every wear and wash cycle.',
    },
    {
      id: 2,
      number: '03',
      title: 'BREATHABLE CONSTRUCTION',
      badge: '100% Cellulose',
      x: '40%',
      y: '68%',
      desc: 'Pure organic cotton matrix promotes natural thermal circulation, remaining cool in summer and insulating in trans-seasonal weather.',
    },
    {
      id: 3,
      number: '04',
      title: 'PRE-SHRUNK FINISH',
      badge: '<1.5% Shrinkage',
      x: '76%',
      y: '70%',
      desc: 'Stabilized with mechanical steam calendars and natural plant enzymes for permanent dimensional stability wash after wash.',
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const current = hotspots[activeHotspot];

  return (
    <section className="py-24 sm:py-32 bg-ravetto-offwhite-paper border-b border-ravetto-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="micro-caps text-ravetto-teal block">
            Material Architecture
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
            Fabric Explorer
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-ravetto-muted font-mono">
            240 GSM &bull; 100% Premium Cotton
          </p>
        </div>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {['240 GSM', '100% Premium Cotton', 'Dense Knit', 'Soft Hand Feel', 'Breathable Construction', 'Pre-Shrunk Finish'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-ravetto-offwhite border border-ravetto-border text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-medium text-ravetto-text"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Interactive Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Macro Fabric Image with Desktop Cursor Magnification Lens */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setMousePos(null);
            }}
            className="lg:col-span-8 relative aspect-[16/10] bg-ravetto-offwhite border border-ravetto-border overflow-hidden select-none cursor-crosshair group"
          >
            {/* Base Macro Image */}
            <img
              src={MACRO_IMAGE_URL}
              alt="Macro 240 GSM Fabric Texture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-ravetto-text/5 pointer-events-none" />

            {/* Desktop Magnifying Loupe Lens */}
            {isHovering && mousePos && (
              <div
                className="hidden md:block absolute w-36 h-36 rounded-full border-2 border-white shadow-2xl pointer-events-none overflow-hidden z-20 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                  backgroundImage: `url(${MACRO_IMAGE_URL})`,
                  backgroundSize: '300%',
                  backgroundPosition: `${(mousePos.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePos.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
                }}
              />
            )}

            {/* Interactive Hotspot Pins */}
            {hotspots.map((spot) => {
              const isActive = activeHotspot === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot.id)}
                  aria-label={`Inspect ${spot.title}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin focus:outline-none z-10"
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
                  <span className="hidden sm:inline-block ml-2 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-ravetto-teal text-white text-[9px] uppercase tracking-wider px-2 py-0.5 pointer-events-none">
                    {spot.title}
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-ravetto-muted pointer-events-none">
              Hover to magnify knit gauge &bull; Tap pins to inspect
            </div>
          </div>

          {/* Right: Active Detail Card */}
          <div className="lg:col-span-4 bg-ravetto-offwhite border border-ravetto-border p-8 text-left space-y-6 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-ravetto-border">
                <span className="font-mono text-xs font-semibold text-ravetto-teal uppercase tracking-widest">
                  Detail {current.number}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-ravetto-mint-subtle px-2.5 py-0.5 text-ravetto-teal border border-ravetto-mint">
                  {current.badge}
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
                    {current.desc}
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
