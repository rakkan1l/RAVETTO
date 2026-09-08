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
              Beyond Checkout
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
              Arrives as intended.
            </h2>
            <p className="text-xs sm:text-sm text-ravetto-muted leading-relaxed font-sans">
              The tactile experience of luxury begins the moment your parcel is delivered. Each garment is steam-pressed at the atelier, folded inside acid-free tissue wrap, and secured within a rigid kraft shipping box.
            </p>

            <div className="space-y-4 pt-4 border-t border-ravetto-border text-xs text-ravetto-muted">
              <div className="flex items-start space-x-3">
                <span className="font-mono text-ravetto-teal font-semibold text-xs">01</span>
                <span>Rigid post-consumer recycled mailer box engineered against crush deformation.</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-mono text-ravetto-teal font-semibold text-xs">02</span>
                <span>Zero plastic single-use polybags. Uncoated paper garment seal only.</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-mono text-ravetto-teal font-semibold text-xs">03</span>
                <span>Hand-numbered atelier inspection card confirming knit tension check.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
