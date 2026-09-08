import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FindYourRavettoProps {
  onNavigate: (path: string) => void;
}

export const FindYourRavetto: React.FC<FindYourRavettoProps> = ({ onNavigate }) => {
  const comparison = [
    {
      name: 'The Essential Tee',
      slug: 'essential-tee',
      gsm: '240 GSM',
      weight: 'Medium-Heavy',
      fit: 'Structured Regular',
      feel: 'Smooth, dense, combed Supima',
      neck: '1x1 Double-Ribbed Crew',
      structure: 'High shape retention',
      bestUse: 'Daily foundational uniform',
      price: '₹1,499',
    },
    {
      name: 'Heavyweight Oversized',
      slug: 'heavyweight-oversized-tee',
      gsm: '280 GSM',
      weight: 'Substantial Heavy',
      fit: 'Architectural Drop-Shoulder',
      feel: 'Velvety carbon-washed interlock',
      neck: '30mm High-Gauge Rib',
      structure: 'Rigid architectural silhouette',
      bestUse: 'Statement outerwear layer',
      price: '₹1,899',
    },
    {
      name: 'Structured Mock Neck',
      slug: 'structured-mock-neck',
      gsm: '260 GSM',
      weight: 'Medium-Heavy',
      fit: 'Tailored Form',
      feel: 'Silken bio-polished cotton',
      neck: '35mm Architectural Mock',
      structure: 'Firm upright collar line',
      bestUse: 'Transitional tailoring',
      price: '₹1,999',
    },
    {
      name: 'Atelier Relaxed Tee',
      slug: 'atelier-relaxed-tee',
      gsm: '250 GSM',
      weight: 'Medium',
      fit: 'Box Cut Relaxed',
      feel: 'Reverse French Terry loops',
      neck: 'Self-Fabric Bound',
      structure: 'Fluid effortless drape',
      bestUse: 'Warm weather ventilation',
      price: '₹1,699',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-ravetto-offwhite-paper border-b border-ravetto-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="micro-caps text-ravetto-teal block">
            Comparative Matrix
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
            Find Your Ravetto
          </h2>
          <p className="text-xs uppercase tracking-[0.18em] text-ravetto-muted">
            Select the exact weight and silhouette engineered for your cadence
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-ravetto-border bg-ravetto-offwhite shadow-sm">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-ravetto-border bg-ravetto-offwhite-paper text-[11px] uppercase tracking-[0.18em] text-ravetto-muted">
                <th className="p-4 sm:p-5 font-semibold">Dimension</th>
                {comparison.map((item) => (
                  <th key={item.slug} className="p-4 sm:p-5 font-semibold text-ravetto-text">
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ravetto-border text-xs">
              {/* GSM */}
              <tr className="hover:bg-ravetto-offwhite-paper/50 transition-colors">
                <td className="p-4 sm:p-5 font-mono text-[11px] uppercase tracking-wider text-ravetto-muted font-semibold">
                  GSM
                </td>
                {comparison.map((item) => (
                  <td key={item.slug} className="p-4 sm:p-5 font-mono font-bold text-ravetto-teal">
                    {item.gsm}
                  </td>
                ))}
              </tr>

              {/* FIT */}
              <tr className="hover:bg-ravetto-offwhite-paper/50 transition-colors">
                <td className="p-4 sm:p-5 font-mono text-[11px] uppercase tracking-wider text-ravetto-muted font-semibold">
                  FIT
                </td>
                {comparison.map((item) => (
                  <td key={item.slug} className="p-4 sm:p-5 font-medium text-ravetto-text">
                    {item.fit}
                  </td>
                ))}
              </tr>

              {/* WEIGHT */}
              <tr className="hover:bg-ravetto-offwhite-paper/50 transition-colors">
                <td className="p-4 sm:p-5 font-mono text-[11px] uppercase tracking-wider text-ravetto-muted font-semibold">
                  WEIGHT
                </td>
                {comparison.map((item) => (
                  <td key={item.slug} className="p-4 sm:p-5 text-ravetto-text">
                    {item.weight}
                  </td>
                ))}
              </tr>

              {/* FEEL */}
              <tr className="hover:bg-ravetto-offwhite-paper/50 transition-colors">
                <td className="p-4 sm:p-5 font-mono text-[11px] uppercase tracking-wider text-ravetto-muted font-semibold">
                  FEEL
                </td>
                {comparison.map((item) => (
                  <td key={item.slug} className="p-4 sm:p-5 text-ravetto-muted">
                    {item.feel}
                  </td>
                ))}
              </tr>

              {/* STRUCTURE */}
              <tr className="hover:bg-ravetto-offwhite-paper/50 transition-colors">
                <td className="p-4 sm:p-5 font-mono text-[11px] uppercase tracking-wider text-ravetto-muted font-semibold">
                  STRUCTURE
                </td>
                {comparison.map((item) => (
                  <td key={item.slug} className="p-4 sm:p-5 text-ravetto-text">
                    {item.structure}
                  </td>
                ))}
              </tr>

              {/* BEST FOR */}
              <tr className="hover:bg-ravetto-offwhite-paper/50 transition-colors">
                <td className="p-4 sm:p-5 font-mono text-[11px] uppercase tracking-wider text-ravetto-muted font-semibold">
                  BEST FOR
                </td>
                {comparison.map((item) => (
                  <td key={item.slug} className="p-4 sm:p-5 text-ravetto-muted">
                    {item.bestUse}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-mono text-[11px] uppercase tracking-wider text-ravetto-muted">
                  Action
                </td>
                {comparison.map((item) => (
                  <td key={item.slug} className="p-4 sm:p-5">
                    <button
                      onClick={() => onNavigate(`/products/${item.slug}`)}
                      className="inline-flex items-center space-x-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ravetto-teal hover:underline group"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
