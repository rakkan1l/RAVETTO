import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { useUIStore } from '../../stores/uiStore';

export const SizeGuideDrawer: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useUIStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  // Exact garment measurements in inches
  const measurementsInches = [
    { size: 'XS', chest: '38.0', length: '27.0', shoulder: '17.5', sleeve: '8.0' },
    { size: 'S', chest: '40.0', length: '28.0', shoulder: '18.2', sleeve: '8.5' },
    { size: 'M', chest: '42.0', length: '29.0', shoulder: '19.0', sleeve: '9.0' },
    { size: 'L', chest: '44.5', length: '30.0', shoulder: '20.0', sleeve: '9.5' },
    { size: 'XL', chest: '47.0', length: '31.0', shoulder: '21.0', sleeve: '10.0' },
    { size: 'XXL', chest: '50.0', length: '32.0', shoulder: '22.0', sleeve: '10.5' },
  ];

  // Convert to CM
  const measurementsCm = measurementsInches.map((m) => ({
    size: m.size,
    chest: (parseFloat(m.chest) * 2.54).toFixed(1),
    length: (parseFloat(m.length) * 2.54).toFixed(1),
    shoulder: (parseFloat(m.shoulder) * 2.54).toFixed(1),
    sleeve: (parseFloat(m.sleeve) * 2.54).toFixed(1),
  }));

  const data = unit === 'inches' ? measurementsInches : measurementsCm;

  return (
    <Drawer
      isOpen={isSizeGuideOpen}
      onClose={closeSizeGuide}
      title="Garment Sizing Architecture"
      subtitle="Engineered for clean silhouette and drape"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Unit Switcher */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-ravetto-muted uppercase tracking-[0.14em]">
            Measurements taken flat
          </p>
          <div className="inline-flex border border-ravetto-border">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs uppercase tracking-wider font-mono transition-colors ${
                unit === 'inches' ? 'bg-ravetto-teal text-white' : 'text-ravetto-text'
              }`}
            >
              IN
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs uppercase tracking-wider font-mono transition-colors ${
                unit === 'cm' ? 'bg-ravetto-teal text-white' : 'text-ravetto-text'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Measurement Diagram Illustration */}
        <div className="border border-ravetto-border bg-ravetto-offwhite-paper p-6 text-center">
          <svg
            viewBox="0 0 300 240"
            className="w-56 h-44 mx-auto stroke-ravetto-text fill-none"
            strokeWidth="1.2"
          >
            {/* T-Shirt Outline */}
            <path
              d="M100 40 Q150 55 200 40 L260 70 L230 110 L200 95 L200 210 L100 210 L100 95 L70 110 L40 70 Z"
              strokeLinejoin="round"
            />
            {/* Collar Rib */}
            <path d="M120 40 Q150 62 180 40" strokeWidth="1" strokeDasharray="2,2" />

            {/* Chest measurement line */}
            <line x1="95" y1="120" x2="205" y2="120" stroke="#0D4F4A" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="100" cy="120" r="2.5" fill="#0D4F4A" />
            <circle cx="200" cy="120" r="2.5" fill="#0D4F4A" />
            <text x="150" y="114" fill="#0D4F4A" fontSize="9" textAnchor="middle" fontFamily="monospace">
              CHEST WIDTH
            </text>

            {/* Length line */}
            <line x1="225" y1="40" x2="225" y2="210" stroke="#0D4F4A" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="225" cy="40" r="2.5" fill="#0D4F4A" />
            <circle cx="225" cy="210" r="2.5" fill="#0D4F4A" />
            <text x="245" y="130" fill="#0D4F4A" fontSize="9" textAnchor="middle" fontFamily="monospace" transform="rotate(90, 245, 130)">
              BODY LENGTH
            </text>
          </svg>
          <p className="text-[11px] text-ravetto-muted mt-2">
            For relaxed styling, order your standard size. For an intentional oversized drape, size up once.
          </p>
        </div>

        {/* Sizing Table */}
        <div className="overflow-x-auto border border-ravetto-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-ravetto-offwhite-paper border-b border-ravetto-border text-[11px] uppercase tracking-[0.16em] text-ravetto-muted">
              <tr>
                <th className="py-2.5 px-3.5 font-medium">Size</th>
                <th className="py-2.5 px-3.5 font-medium">Chest ({unit})</th>
                <th className="py-2.5 px-3.5 font-medium">Length ({unit})</th>
                <th className="py-2.5 px-3.5 font-medium">Shoulder ({unit})</th>
                <th className="py-2.5 px-3.5 font-medium">Sleeve ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ravetto-border font-mono">
              {data.map((row) => (
                <tr key={row.size} className="hover:bg-ravetto-offwhite-paper/60 transition-colors">
                  <td className="py-2.5 px-3.5 font-bold font-sans text-ravetto-text">{row.size}</td>
                  <td className="py-2.5 px-3.5 text-ravetto-muted">{row.chest}</td>
                  <td className="py-2.5 px-3.5 text-ravetto-muted">{row.length}</td>
                  <td className="py-2.5 px-3.5 text-ravetto-muted">{row.shoulder}</td>
                  <td className="py-2.5 px-3.5 text-ravetto-muted">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Assistance Note */}
        <div className="p-4 bg-ravetto-mint-subtle border border-ravetto-mint text-ravetto-text text-xs space-y-1">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-ravetto-teal block">
            Atelier Recommendation
          </span>
          <p className="leading-relaxed">
            All Ravetto garments are pre-shrunk through mechanical steam stabilization. Post-wash shrinkage is under 1.5% when washed cold.
          </p>
        </div>
      </div>
    </Drawer>
  );
};
