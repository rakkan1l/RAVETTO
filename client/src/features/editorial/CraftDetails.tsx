import React from 'react';

export const CraftDetails: React.FC = () => {
  const craftPoints = [
    {
      number: '01',
      title: 'REINFORCED DOUBLE-RIB COLLAR',
      description:
        'Engineered 1x1 high-density ribbed knit with internal elastomeric stabilization. Keeps the neckline crisp, flush against the neck, and completely resistant to rippling.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85',
    },
    {
      number: '02',
      title: 'PRECISION TWIN-NEEDLE STITCHING',
      description:
        'Evenly calibrated tension across all hems. Double-needle coverstitching spaced at 6mm gives elastic give during movement while preventing frayed edge curling.',
      image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=85',
    },
    {
      number: '03',
      title: 'HERRINGBONE SHOULDER TAPING',
      description:
        'Continuous interior tape runs from shoulder to shoulder behind the neck. It neutralizes gravity on hangers and preserves the architectural slope of the garment.',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=85',
    },
    {
      number: '04',
      title: 'HEAT-PRESSED ATELIER STAMP',
      description:
        'Zero scratchy woven or polyester neck labels. Garment specifications and care protocols are applied via water-based micro-transfer inks directly to the inner cotton.',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-ravetto-offwhite border-b border-ravetto-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-ravetto-border gap-6">
          <div>
            <span className="micro-caps text-ravetto-teal block mb-2">
              The Architecture of Details
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
              Craftsmanship in Focus
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-ravetto-muted max-w-sm leading-relaxed">
            Luxury lives in the millimeters you never consciously notice, but would immediately miss if absent.
          </p>
        </div>

        {/* 4 Editorial Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
          {craftPoints.map((point) => (
            <div key={point.number} className="flex flex-col text-left space-y-4 group">
              <div className="relative aspect-[4/5] bg-ravetto-offwhite-paper overflow-hidden">
                <img
                  src={point.image}
                  alt={point.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 bg-white/90 px-2 py-0.5 text-[10px] font-mono font-medium text-ravetto-teal">
                  {point.number}
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs uppercase tracking-[0.14em] font-semibold text-ravetto-text">
                  {point.title}
                </h3>
                <p className="text-xs text-ravetto-muted leading-relaxed font-sans">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
