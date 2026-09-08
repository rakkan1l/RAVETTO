import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const RavettoThread: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const stages = [
    {
      id: 0,
      title: 'MATERIAL',
      spec: '100% Combed Supima Cotton',
      desc: 'Single-origin extra long staple fibers selected for natural tensile strength and velvet hand.',
    },
    {
      id: 1,
      title: 'WEIGHT',
      spec: '240–280 GSM Density',
      desc: 'Calibrated weight that drapes away from the body without clinging or sheer transparency.',
    },
    {
      id: 2,
      title: 'FIT',
      spec: 'Architectural Balance',
      desc: 'Formulated with precise chest-to-shoulder ratios for clean vertical silhouette geometry.',
    },
    {
      id: 3,
      title: 'CUT',
      spec: 'Laser Grain Geometry',
      desc: 'Patterned along the true warp grain of the cotton knit to prevent helical seam twisting.',
    },
    {
      id: 4,
      title: 'STITCH',
      spec: 'Twin-Needle Tension',
      desc: 'Precision 6mm coverstitching and internal herringbone tape maintaining shape forever.',
    },
    {
      id: 5,
      title: 'FINISH',
      spec: 'Mechanical Steam Stabilized',
      desc: 'Bio-polished with plant enzymes for zero surface fuzz and permanent color fastness.',
    },
    {
      id: 6,
      title: 'RAVETTO',
      spec: 'Quiet Confidence',
      desc: 'A permanent foundational uniform worn without effort, day after day.',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      end: 'bottom 40%',
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        if (lineRef.current) {
          gsap.set(lineRef.current, { height: `${self.progress * 95}%` });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const activeStageIndex = Math.min(
    stages.length - 1,
    Math.floor(scrollProgress * stages.length)
  );

  return (
    <section
      ref={sectionRef}
      className="py-28 sm:py-36 bg-ravetto-teal text-white border-b border-ravetto-teal-dark overflow-hidden relative"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 relative z-10">
        {/* Intro */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
          <span className="micro-caps text-ravetto-mint block">
            Signature Lineage
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-white">
            The Ravetto Thread
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 font-mono">
            Scroll to follow the line of craft
          </p>
        </div>

        {/* Story Thread Architecture */}
        <div className="relative max-w-2xl mx-auto">
          {/* Subtle Background Guide Line */}
          <div className="absolute top-4 bottom-4 left-6 sm:left-1/2 sm:-translate-x-1/2 w-px bg-white/20 z-0" />

          {/* Thin Deep Teal / Mint Drawing Line */}
          <motion.div
            ref={lineRef}
            className="absolute top-4 left-6 sm:left-1/2 sm:-translate-x-1/2 w-[2px] bg-ravetto-mint z-0 origin-top"
            style={{
              height: `${scrollProgress * 95}%`,
            }}
          />

          {/* Stages */}
          <div className="space-y-12 sm:space-y-16 relative z-10">
            {stages.map((stage, idx) => {
              const isPassed = idx <= activeStageIndex;
              const isCurrent = idx === activeStageIndex;

              return (
                <div
                  key={stage.id}
                  className={`flex items-start transition-all duration-300 ${
                    idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content Column */}
                  <div
                    className={`pl-14 sm:pl-0 sm:w-1/2 ${
                      idx % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'
                    } text-left`}
                  >
                    <span
                      className={`text-[11px] font-mono tracking-[0.2em] uppercase block transition-colors duration-300 ${
                        isCurrent
                          ? 'text-ravetto-mint font-bold'
                          : isPassed
                          ? 'text-white'
                          : 'text-white/40'
                      }`}
                    >
                      {stage.title}
                    </span>
                    <h3
                      className={`text-sm uppercase tracking-wider font-medium mt-0.5 transition-colors ${
                        isPassed ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {stage.spec}
                    </h3>
                    <p
                      className={`text-xs mt-1.5 leading-relaxed font-sans max-w-xs transition-colors ${
                        isPassed ? 'text-white/80' : 'text-white/30'
                      }`}
                    >
                      {stage.desc}
                    </p>
                  </div>

                  {/* Minimal Bullet Node - No glow, no neon */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 mt-1">
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isCurrent
                          ? 'bg-ravetto-mint scale-125'
                          : isPassed
                          ? 'bg-white'
                          : 'bg-ravetto-teal-dark border border-white/30'
                      }`}
                    >
                      {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-ravetto-teal" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Concluding Statement */}
        <div className="text-center pt-24 border-t border-white/15 mt-20 space-y-2">
          <p className="font-editorial text-2xl sm:text-4xl font-medium tracking-tight text-white">
            EVERY DETAIL HAS A PURPOSE.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-ravetto-mint/90 font-mono">
            RAVETTO ATELIER &bull; TIRUPPUR, INDIA
          </p>
        </div>
      </div>
    </section>
  );
};
