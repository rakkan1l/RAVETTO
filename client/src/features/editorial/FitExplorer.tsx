import React, { useState } from 'react';

export const FitExplorer: React.FC = () => {
  const [activeFit, setActiveFit] = useState<'structured' | 'relaxed' | 'tailored'>('structured');

  const fits = {
    structured: {
      name: 'STRUCTURED REGULAR',
      subtitle: 'The Classic Foundation',
      gsm: '240 GSM',
      drape: 'Clean torso line with gentle chest ease. Designed to stand away from the stomach.',
      model: "Model is 6'1\" (185cm), 76kg, wearing Size M",
      bestFor: 'Daily wear, layered under blazers or worn solo with trousers.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
      measurements: { chestEase: '+4.0 inches', shoulderSlope: 'Natural', sleeveDrop: 'Mid-Bicep' },
    },
    relaxed: {
      name: 'ARCHITECTURAL OVERSIZED',
      subtitle: 'Sculptural Modernism',
      gsm: '280 GSM',
      drape: 'Dropped shoulder seam with wide torso box. Heavyweight fabric eliminates fabric drape cling.',
      model: "Model is 6'2\" (188cm), 80kg, wearing Size L",
      bestFor: 'Modern street tailoring, paired with wide-leg denim or pleated chinos.',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85',
      measurements: { chestEase: '+7.5 inches', shoulderSlope: 'Extended Drop', sleeveDrop: 'Near Elbow' },
    },
    tailored: {
      name: 'TAILORED MOCK NECK',
      subtitle: 'Elevated Posture',
      gsm: '260 GSM',
      drape: 'Trim through the shoulders with an engineered 3.5cm architectural collar band.',
      model: "Model is 6'0\" (183cm), 74kg, wearing Size M",
      bestFor: 'Transitional evenings, smart casual uniform, outerwear pairing.',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85',
      measurements: { chestEase: '+2.5 inches', shoulderSlope: 'Square Structured', sleeveDrop: 'Fitted Armhole' },
    },
  };

  const current = fits[activeFit];

  return (
    <section className="py-24 sm:py-32 bg-ravetto-offwhite border-b border-ravetto-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-ravetto-border gap-6">
          <div>
            <span className="micro-caps text-ravetto-teal block mb-2">
              Proportion & Form
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
              Fit Architecture
            </h2>
          </div>
          <div className="flex items-center space-x-2 border border-ravetto-border bg-ravetto-offwhite-paper p-1">
            <button
              onClick={() => setActiveFit('structured')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeFit === 'structured' ? 'bg-ravetto-teal text-white' : 'text-ravetto-muted hover:text-ravetto-text'
              }`}
            >
              Structured Regular
            </button>
            <button
              onClick={() => setActiveFit('relaxed')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeFit === 'relaxed' ? 'bg-ravetto-teal text-white' : 'text-ravetto-muted hover:text-ravetto-text'
              }`}
            >
              Architectural Oversized
            </button>
            <button
              onClick={() => setActiveFit('tailored')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeFit === 'tailored' ? 'bg-ravetto-teal text-white' : 'text-ravetto-muted hover:text-ravetto-text'
              }`}
            >
              Tailored Mock
            </button>
          </div>
        </div>

        {/* Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-16">
          {/* Visual Model Portrait */}
          <div className="lg:col-span-6 relative aspect-[3/4] bg-ravetto-offwhite-paper border border-ravetto-border overflow-hidden">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 text-xs text-ravetto-text flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ravetto-muted">{current.model}</span>
              <span className="font-mono text-[11px] font-bold text-ravetto-teal">{current.gsm}</span>
            </div>
          </div>

          {/* Details & Specs */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div>
              <span className="font-mono text-xs text-ravetto-teal uppercase tracking-widest block">
                {current.subtitle}
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-ravetto-text mt-1">
                {current.name}
              </h3>
              <p className="text-xs sm:text-sm text-ravetto-muted mt-3 leading-relaxed font-sans">
                {current.drape}
              </p>
            </div>

            {/* Measurement Diagnostics */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-ravetto-offwhite-paper border border-ravetto-border">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-ravetto-muted block">
                  Chest Ease
                </span>
                <span className="text-xs font-mono font-bold text-ravetto-text">
                  {current.measurements.chestEase}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-ravetto-muted block">
                  Shoulder Slope
                </span>
                <span className="text-xs font-mono font-bold text-ravetto-text">
                  {current.measurements.shoulderSlope}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-ravetto-muted block">
                  Sleeve Drop
                </span>
                <span className="text-xs font-mono font-bold text-ravetto-text">
                  {current.measurements.sleeveDrop}
                </span>
              </div>
            </div>

            {/* Best For */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-ravetto-text block">
                Ideal Usage
              </span>
              <p className="text-xs text-ravetto-muted leading-relaxed">
                {current.bestFor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
