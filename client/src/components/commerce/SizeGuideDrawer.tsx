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
      title="FIND YOUR SIZE"
      subtitle="Garment dimensions taken flat with zero tension"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6 text-left font-outfit">
        {/* Unit Switcher */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs uppercase tracking-wider font-bold text-[#5C4033] block">
              Reference Standards
            </span>
            <p className="text-xs text-[#8C7E7E]">
              Model is 6'1" (185 cm) &bull; Wearing Size M
            </p>
          </div>
          <div className="inline-flex rounded-full p-1 bg-[#FFFFFF] border border-[#5C4033]/15 shadow-sm">
            <button
              onClick={() => setUnit('inches')}
              className={`px-4 py-1 text-xs uppercase tracking-wider font-bold rounded-full transition-colors ${
                unit === 'inches' ? 'bg-[#879E57] text-white' : 'text-[#5C4033] hover:text-[#879E57]'
              }`}
            >
              IN
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-4 py-1 text-xs uppercase tracking-wider font-bold rounded-full transition-colors ${
                unit === 'cm' ? 'bg-[#879E57] text-white' : 'text-[#5C4033] hover:text-[#879E57]'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* HOW TO MEASURE with clean T-shirt illustration */}
        <div className="rounded-[24px] border border-[#5C4033]/10 bg-white p-6 text-center space-y-3 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#879E57] block">
            HOW TO MEASURE
          </span>

          <svg
            viewBox="0 0 300 230"
            className="w-56 h-40 mx-auto stroke-[#5C4033] fill-none"
            strokeWidth="1.2"
          >
            {/* T-Shirt Outline */}
            <path
              d="M100 40 Q150 55 200 40 L260 70 L230 110 L200 95 L200 210 L100 210 L100 95 L70 110 L40 70 Z"
              strokeLinejoin="round"
            />
            {/* Collar Rib */}
            <path d="M120 40 Q150 62 180 40" strokeWidth="1" strokeDasharray="2,2" />

            {/* Shoulder measurement line */}
            <line x1="70" y1="58" x2="230" y2="58" stroke="#879E57" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="150" y="52" fill="#879E57" fontSize="8" textAnchor="middle" fontWeight="bold">
              SHOULDER
            </text>

            {/* Chest measurement line */}
            <line x1="95" y1="120" x2="205" y2="120" stroke="#879E57" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="100" cy="120" r="2.5" fill="#879E57" />
            <circle cx="200" cy="120" r="2.5" fill="#879E57" />
            <text x="150" y="114" fill="#879E57" fontSize="9" textAnchor="middle" fontWeight="bold">
              CHEST WIDTH
            </text>

            {/* Length line */}
            <line x1="225" y1="40" x2="225" y2="210" stroke="#879E57" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="225" cy="40" r="2.5" fill="#879E57" />
            <circle cx="225" cy="210" r="2.5" fill="#879E57" />
            <text x="245" y="130" fill="#879E57" fontSize="9" textAnchor="middle" fontWeight="bold" transform="rotate(90, 245, 130)">
              LENGTH
            </text>
          </svg>

          <p className="text-xs text-[#8C7E7E] font-sans">
            Lay your favorite-fitting garment flat on a level surface. Measure straight across chest 2.5cm below armhole.
          </p>
        </div>

        {/* Sizing Table */}
        <div className="overflow-x-auto rounded-[20px] border border-[#5C4033]/10 bg-white">
          <table className="w-full text-left text-xs font-outfit">
            <thead className="bg-[#FDFCF5] border-b border-[#5C4033]/10 text-xs uppercase tracking-wider text-[#8C7E7E]">
              <tr>
                <th className="py-3 px-4 font-bold">Size</th>
                <th className="py-3 px-4 font-bold">CHEST ({unit})</th>
                <th className="py-3 px-4 font-bold">LENGTH ({unit})</th>
                <th className="py-3 px-4 font-bold">SHOULDER ({unit})</th>
                <th className="py-3 px-4 font-bold">SLEEVE ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5C4033]/08 font-sans">
              {data.map((row) => (
                <tr key={row.size} className="hover:bg-[#FDFCF5]/60 transition-colors">
                  <td className="py-3 px-4 font-bold font-outfit text-[#5C4033]">{row.size}</td>
                  <td className="py-3 px-4 text-[#5C4033]/80">{row.chest}</td>
                  <td className="py-3 px-4 text-[#5C4033]/80">{row.length}</td>
                  <td className="py-3 px-4 text-[#5C4033]/80">{row.shoulder}</td>
                  <td className="py-3 px-4 text-[#5C4033]/80">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pre-Shrunk Guarantee Card */}
        <div className="p-4 rounded-[20px] bg-[#879E57]/10 border border-[#879E57]/20 text-[#5C4033] text-xs space-y-1">
          <span className="font-bold uppercase tracking-wider text-xs text-[#879E57] block">
            Pre-Shrunk Precision Guarantee
          </span>
          <p className="leading-relaxed text-xs text-[#5C4033]/85 font-sans">
            All Ravetto cotton yardage undergoes vacuum steam stabilization prior to pattern cutting. Post-wash shrinkage is guaranteed under 1.5% when washed cold.
          </p>
        </div>
      </div>
    </Drawer>
  );
};
