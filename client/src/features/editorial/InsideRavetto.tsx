import React, { useState } from 'react';

export const InsideRavetto: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const pillars = [
    {
      number: '01',
      title: 'THE MATERIAL',
      heading: 'Long-Staple Supima Cotton',
      description:
        'Grown under rigorous standards, our extra-long staple cotton yields silkier yarns with twice the tensile strength of conventional fibers.',
      image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=85',
    },
    {
      number: '02',
      title: 'THE WEIGHT',
      heading: '240–280 GSM Architecture',
      description:
        'Substantial knit density that completely eliminates transparency and drapes cleanly away from the body for an intentional silhouette.',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
    },
    {
      number: '03',
      title: 'THE CUT',
      heading: 'Balanced Posture Geometry',
      description:
        'Cut along true grain lines. Sits square on the clavicle with balanced armscye angles that eliminate underarm bunching.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
    },
    {
      number: '04',
      title: 'THE STITCH',
      heading: 'Double-Ribbed Permanence',
      description:
        'Herringbone taped shoulders and high-recovery collar ribbing ensure our necklines never bacon-curl after washing.',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85',
    },
    {
      number: '05',
      title: 'THE FINISH',
      heading: 'Enzymatic Bio-Polish',
      description:
        'Treated with organic biological washes rather than chemical silicons. Velvety hand feel that improves as you wear and wash it.',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  const current = pillars[activeStep];

  return (
    <section className="py-24 sm:py-32 bg-ravetto-offwhite-paper border-b border-ravetto-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="micro-caps text-ravetto-teal block">
            The Atelier Manifesto
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text uppercase">
            NOT JUST ANOTHER T-SHIRT.
          </h2>
          <p className="text-xs uppercase tracking-[0.18em] text-ravetto-muted">
            The five foundational disciplines of the Ravetto garment
          </p>
        </div>

        {/* Dynamic Pillar Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Pillar List */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.number}
                onClick={() => setActiveStep(idx)}
                className={`p-5 border cursor-pointer transition-all text-left ${
                  activeStep === idx
                    ? 'border-ravetto-teal bg-ravetto-offwhite shadow-sm'
                    : 'border-ravetto-border/60 hover:border-ravetto-border bg-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-ravetto-teal">
                    {pillar.number}
                  </span>
                  <h3
                    className={`text-xs uppercase tracking-[0.16em] font-semibold transition-colors ${
                      activeStep === idx ? 'text-ravetto-text' : 'text-ravetto-muted'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                </div>
                {activeStep === idx && (
                  <p className="text-xs text-ravetto-muted mt-2 pl-7 leading-relaxed">
                    {pillar.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right: Macro Image Projection */}
          <div className="lg:col-span-7 relative aspect-[16/10] bg-ravetto-offwhite border border-ravetto-border overflow-hidden">
            <img
              src={current.image}
              alt={current.heading}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 text-xs">
              <span className="font-mono text-[10px] text-ravetto-teal uppercase tracking-widest block font-bold">
                Pillar {current.number}
              </span>
              <span className="font-editorial text-sm text-ravetto-text font-medium">
                {current.heading}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
