import React, { useState } from 'react';
import { Layers, Scissors, ShieldCheck, HeartHandshake } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fabric' | 'fit' | 'craft' | 'care'>('fabric');

  const content = {
    fabric: {
      badge: 'MATERIAL INTEGRITY',
      title: '240 & 280 GSM Combed Cotton',
      description:
        'Standard retail tees weigh 140–160 GSM and degrade after five washes. Ravetto knits with high-gauge combed cotton yarns for a substantial hand-feel that drapes architecturally without clinging.',
      bullets: [
        'Dense 24-gauge single jersey knit',
        'Long-staple fibers prevent pilling',
        'Zero synthetics, 100% natural breathability',
      ],
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85',
      caption: 'High-gauge single jersey knit macro close-up',
    },
    fit: {
      badge: 'ARCHITECTURAL DRAPE',
      title: 'Engineered Silhouettes',
      description:
        'A great T-shirt is a masterclass in subtle geometry. We balance dropped shoulders with clean sleeve pitch and proportioned chest measurements so the garment holds its shape naturally.',
      bullets: [
        'Relaxed & Oversized silhouettes with calibrated drop',
        'Pre-washed drape that stays consistent after laundering',
        'Designed to be layered or worn as a standalone statement',
      ],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
      caption: 'Everyday relaxed silhouette drape test',
    },
    craft: {
      badge: 'PRECISION TAILORING',
      title: 'Lycra-Ribbed Collars & Twin Stitching',
      description:
        'T-shirt necks ruin faster than any other part. We construct our 1x1 neckbands with integrated Lycra core threads and secure the shoulders with twin-needle herringbone seam tape.',
      bullets: [
        'No bacon-neck: 100% collar retention guarantee',
        'Twin-needle hem and sleeve cuff stitching',
        'Internal bound shoulder-to-shoulder seam tape',
      ],
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85',
      caption: 'Collar ribbing and twin-needle reinforcement',
    },
    care: {
      badge: 'LIFELONG RETENTION',
      title: 'Zero Shrinkage Promise',
      description:
        'Every fabric bolt is pre-shrunk through industrial steam stabilization before pattern cutting. What fits you on day one will fit identically on day one hundred.',
      bullets: [
        'Steam stabilized to under 1% dimensional variation',
        'Machine wash cold (30°C) inside out',
        'Hang dry in shade to preserve color richness',
      ],
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85',
      caption: 'Pre-shrunk fabric testing in Tiruppur',
    },
  };

  const current = content[activeTab];

  return (
    <section className="py-16 sm:py-28 bg-[#FDFCF5] border-t border-[#5C4033]/06">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-2xl text-left mb-10 sm:mb-16">
          <span className="font-outfit text-xs font-semibold uppercase tracking-[0.18em] text-[#879E57] block mb-2">
            FABRIC & CRAFTSMANSHIP
          </span>
          <h2 className="font-outfit text-3xl sm:text-5xl font-bold text-[#5C4033] tracking-tight leading-[1.12]">
            Built Beyond <br />
            <span className="text-[#879E57] italic font-normal">the Basics.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C4033]/80 font-sans">
            Every millimeter is intentional. We spent over 18 months calibrating yarn gauge, collar elasticity, and drape before releasing a single tee.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none">
          {[
            { key: 'fabric', label: 'FABRIC', icon: Layers },
            { key: 'fit', label: 'FIT', icon: Scissors },
            { key: 'craft', label: 'CRAFT', icon: ShieldCheck },
            { key: 'care', label: 'CARE', icon: HeartHandshake },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-outfit text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 flex items-center space-x-2 shrink-0 select-none ${
                  isSelected
                    ? 'bg-[#879E57] text-white shadow-md'
                    : 'bg-white text-[#5C4033] border border-[#5C4033]/10 hover:border-[#879E57] hover:text-[#879E57]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Photo + Content Module (Rounded 32px with soft border) */}
        <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-14 border border-[#5C4033]/08 shadow-[0_6px_28px_rgba(92,64,51,0.05)] transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Image Side */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden bg-[#F7F6EE] relative shadow-inner">
                <img
                  src={current.image}
                  alt={current.title}
                  key={current.image}
                  className="w-full h-full object-cover object-center animate-fadeIn"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5C4033]/50 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-white text-xs font-outfit font-medium tracking-wide">
                    {current.caption}
                  </span>
                </div>
              </div>
            </div>

            {/* Text & Bullets Side */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[11px] font-outfit font-semibold uppercase tracking-[0.18em] text-[#879E57]">
                  {current.badge}
                </span>
                <h3 className="font-outfit text-2xl sm:text-3xl font-bold text-[#5C4033] tracking-tight">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#5C4033]/85 font-sans leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-3 pt-2">
                {current.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-[#5C4033] font-outfit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#879E57] shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
