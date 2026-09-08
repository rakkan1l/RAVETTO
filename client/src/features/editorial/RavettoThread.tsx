import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const RavettoThread: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      id: 0,
      title: 'MATERIAL',
      spec: '100% Combed Supima',
      desc: 'Single-origin extra long staple fibers selected for natural tensile strength and velvet hand.',
    },
    {
      id: 1,
      title: 'FIT',
      spec: 'Architectural Balance',
      desc: 'Formulated with precise chest-to-shoulder ratio that drapes cleanly without body cling.',
    },
    {
      id: 2,
      title: 'CUT',
      spec: 'Laser Pattern Geometry',
      desc: 'Patterned along the true warp grain of the fabric to guarantee zero helical seam twisting.',
    },
    {
      id: 3,
      title: 'STITCH',
      spec: 'Twin-Needle Tension',
      desc: 'Precision 6mm coverstitching and internal herringbone tape maintaining shape forever.',
    },
    {
      id: 4,
      title: 'FINISH',
      spec: 'Mechanical Pre-Shrunk',
      desc: 'Bio-polished with plant enzymes for zero surface fuzz and permanent color fastness.',
    },
    {
      id: 5,
      title: 'RAVETTO',
      spec: 'Quiet Confidence',
      desc: 'A permanent foundational uniform worn without effort, day after day.',
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-ravetto-teal text-white border-b border-ravetto-teal-dark overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 relative z-10">
        {/* Intro */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
          <span className="micro-caps text-ravetto-mint block">
            Signature Lineage
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-white">
            The Ravetto Thread
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">
            From single fiber to finished silhouette
          </p>
        </div>

        {/* Story Thread Architecture */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute top-4 bottom-4 left-6 sm:left-1/2 sm:-translate-x-1/2 w-px bg-white/20 z-0" />
          {/* Active indicator line */}
          <motion.div
            className="absolute top-4 left-6 sm:left-1/2 sm:-translate-x-1/2 w-px bg-ravetto-mint z-0"
            animate={{
              height: `${(activeStep / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Steps */}
          <div className="space-y-12 sm:space-y-16 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPast = idx <= activeStep;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-start cursor-pointer transition-all duration-300 ${
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
                      className={`text-[11px] font-mono tracking-[0.2em] uppercase block transition-colors ${
                        isActive ? 'text-ravetto-mint font-semibold' : 'text-white/60'
                      }`}
                    >
                      {step.title}
                    </span>
                    <h3 className="text-sm uppercase tracking-wider font-medium text-white mt-0.5">
                      {step.spec}
                    </h3>
                    <p className="text-xs text-white/75 mt-1.5 leading-relaxed font-sans max-w-xs">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bullet Node */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 mt-1">
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? 'bg-ravetto-mint ring-4 ring-ravetto-mint/30 scale-125'
                          : isPast
                          ? 'bg-white'
                          : 'bg-ravetto-teal-dark border border-white/40'
                      }`}
                    >
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-ravetto-teal" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Concluding Statement */}
        <div className="text-center pt-20 border-t border-white/10 mt-20 space-y-2">
          <p className="font-editorial text-2xl sm:text-4xl font-medium tracking-tight text-white">
            Every detail has a purpose.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-ravetto-mint/90 font-mono">
            RAVETTO ATELIER &bull; TIRUPPUR, INDIA
          </p>
        </div>
      </div>
    </section>
  );
};
