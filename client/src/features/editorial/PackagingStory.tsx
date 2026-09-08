import React from 'react';

export const PackagingStory: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-ravetto-offwhite border-b border-ravetto-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Packaging Imagery */}
          <div className="lg:col-span-7 relative aspect-[4/3] bg-ravetto-offwhite-paper border border-ravetto-border overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
              alt="Ravetto Atelier Unboxing Experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-ravetto-teal">
              Recycled Board &bull; FSC Certified
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="micro-caps text-ravetto-teal block">
              Packaging Architecture
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text uppercase">
              ARRIVES AS INTENDED.
            </h2>
            <p className="text-xs sm:text-sm text-ravetto-muted leading-relaxed font-sans">
              The tactile experience of luxury begins the moment your parcel is delivered. Every order is prepared with deliberate restraint using recyclable materials.
            </p>

            <div className="space-y-3 pt-4 border-t border-ravetto-border text-xs">
              {[
                { name: 'Ravetto Box', desc: 'Custom rigid kraft box engineered against crush deformation.' },
                { name: 'Garment', desc: 'Steam-pressed and precision-folded at the atelier.' },
                { name: 'Tissue', desc: 'Acid-free unbleached tissue wrap with subtle embossing.' },
                { name: 'Hang Tag', desc: 'Heavyweight FSC paper tag with natural cotton cord.' },
                { name: 'Thank-You Card', desc: 'Hand-numbered inspector card with garment lot details.' },
              ].map((item, idx) => (
                <div key={item.name} className="flex items-start space-x-3 py-1 border-b border-ravetto-border/40 last:border-b-0">
                  <span className="font-mono text-ravetto-teal font-semibold text-xs min-w-[20px]">
                    0{idx + 1}
                  </span>
                  <div className="space-y-0.5">
                    <span className="font-medium uppercase tracking-wider text-ravetto-text text-[11px] block">
                      {item.name}
                    </span>
                    <span className="text-ravetto-muted text-xs block">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
