import React from 'react';
import { Button } from '../components/ui/Button';

interface StaticPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-ravetto-offwhite py-16 sm:py-24 text-left">
      <div className="max-w-[880px] mx-auto px-6 sm:px-12 space-y-12">
        <div className="space-y-3 pb-8 border-b border-ravetto-border">
          <span className="micro-caps text-ravetto-teal block">The Atelier Story</span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-ravetto-text">
            Quiet Confidence
          </h1>
          <p className="text-xs uppercase tracking-[0.16em] text-ravetto-muted font-mono">
            TIRUPPUR, INDIA &bull; FOUNDED ON ESSENTIAL RESTRAINT
          </p>
        </div>

        <div className="aspect-[16/9] bg-ravetto-offwhite-paper border border-ravetto-border overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=85"
            alt="Ravetto Atelier Workshop"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 text-sm text-ravetto-text leading-relaxed font-sans">
          <p className="font-editorial text-xl italic text-ravetto-teal">
            "We do not build seasonal wardrobes to be discarded. We engineer foundational uniforms built around the tactile weight of pure combed cotton."
          </p>
          <p>
            Ravetto was established with a singular conviction: the everyday T-shirt is the most worn garment in modern life, yet it is almost universally treated as an afterthought by mass fashion. Thin fibers, poorly stabilized collar ribs, and synthetic blends cause shirts to twist, sag, and degrade within weeks.
          </p>
          <p>
            Based in Tiruppur—the textile craftsmanship capital of southern India—we work directly with heritage circular knitting ateliers. We oversee every stage of the lifecycle: from selecting extra-long staple Supima cotton yarns, to calibrated gauge knitting, mechanical pre-shrinking, and precision twin-needle construction.
          </p>
        </div>

        <div className="pt-8 border-t border-ravetto-border">
          <Button onClick={() => onNavigate('/shop')} variant="primary" size="md">
            Discover the Garments
          </Button>
        </div>
      </div>
    </div>
  );
};

export const MaterialsPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-ravetto-offwhite py-16 sm:py-24 text-left">
      <div className="max-w-[880px] mx-auto px-6 sm:px-12 space-y-12">
        <div className="space-y-3 pb-8 border-b border-ravetto-border">
          <span className="micro-caps text-ravetto-teal block">Material Philosophy</span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-ravetto-text">
            Fiber Science & GSM
          </h1>
          <p className="text-xs uppercase tracking-[0.16em] text-ravetto-muted font-mono">
            WEIGHT CREATES SILHOUETTE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-3">
            <span className="font-mono text-sm font-bold text-ravetto-teal">240 GSM &bull; THE FOUNDATION</span>
            <h3 className="font-editorial text-xl font-medium text-ravetto-text">Single-Origin Supima</h3>
            <p className="text-xs text-ravetto-muted leading-relaxed">
              35% longer staple fibers than conventional cotton. Knitted at high tension for a smooth face that never rolls or ripples. Perfect for effortless daily wear.
            </p>
          </div>

          <div className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-3">
            <span className="font-mono text-sm font-bold text-ravetto-teal">280 GSM &bull; INTERLOCK ATELIER</span>
            <h3 className="font-editorial text-xl font-medium text-ravetto-text">Architectural Density</h3>
            <p className="text-xs text-ravetto-muted leading-relaxed">
              Substantial double-knit interlock structure that stands away from the body with intentional sculptural poise. 100% opaque under any lighting conditions.
            </p>
          </div>
        </div>

        <div className="p-8 bg-ravetto-mint-subtle border border-ravetto-mint text-xs text-ravetto-text space-y-2">
          <span className="font-mono uppercase font-bold text-ravetto-teal text-[11px] block">
            Zero Silicone Guarantee
          </span>
          <p className="leading-relaxed">
            Many commercial brands coat inferior cotton with chemical silicones to simulate softness. This washes away after two cycles. Ravetto garments achieve velvet hand-feel through mechanical enzyme bio-polishing that permanently refines the cotton yarn.
          </p>
        </div>

        <div className="pt-8 border-t border-ravetto-border">
          <Button onClick={() => onNavigate('/shop')} variant="primary" size="md">
            Explore All Pieces
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CraftPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-ravetto-offwhite py-16 sm:py-24 text-left">
      <div className="max-w-[880px] mx-auto px-6 sm:px-12 space-y-12">
        <div className="space-y-3 pb-8 border-b border-ravetto-border">
          <span className="micro-caps text-ravetto-teal block">Construction Standards</span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-ravetto-text">
            Craftsmanship in Millimeters
          </h1>
          <p className="text-xs uppercase tracking-[0.16em] text-ravetto-muted font-mono">
            PRECISION AT THE SEAM
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-ravetto-text leading-relaxed">
          <div className="p-6 border border-ravetto-border space-y-2">
            <h3 className="font-editorial text-lg font-medium text-ravetto-teal">01 / The Double-Ribbed Collar</h3>
            <p className="text-ravetto-muted">
              Knitted on specialized 1x1 circular rib needles with embedded elastomeric memory. Backed with an internal herringbone neck tape that disperses tension when pulling the garment overhead.
            </p>
          </div>

          <div className="p-6 border border-ravetto-border space-y-2">
            <h3 className="font-editorial text-lg font-medium text-ravetto-teal">02 / Balanced Armscye Angles</h3>
            <p className="text-ravetto-muted">
              We eliminated the excess fabric that typically bundles underneath the armpit. Our sleeve pitch is ergonomically calibrated to your natural arm rest position.
            </p>
          </div>

          <div className="p-6 border border-ravetto-border space-y-2">
            <h3 className="font-editorial text-lg font-medium text-ravetto-teal">03 / Pre-Shrunk Mechanical Steam Setting</h3>
            <p className="text-ravetto-muted">
              Before cutting, all cotton yardage undergoes vacuum steam decatizing to pre-relax the knit matrix. This guarantees shrinkage remains under 1.5% under domestic laundering.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-ravetto-border">
          <Button onClick={() => onNavigate('/shop')} variant="primary" size="md">
            View The Garments
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ShippingReturnsPage: React.FC<StaticPageProps> = () => {
  return (
    <div className="min-h-screen bg-ravetto-offwhite py-16 sm:py-24 text-left">
      <div className="max-w-[880px] mx-auto px-6 sm:px-12 space-y-12">
        <div className="space-y-3 pb-8 border-b border-ravetto-border">
          <span className="micro-caps text-ravetto-teal block">Client Care</span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-ravetto-text">
            Shipping & Quiet Returns
          </h1>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-ravetto-text">
          <div className="space-y-3">
            <h3 className="font-editorial text-xl font-medium text-ravetto-teal">Complimentary Domestic Dispatch</h3>
            <p className="text-ravetto-muted leading-relaxed">
              All orders over ₹2,000 enjoy complimentary express dispatch via Bluedart Air. Orders below ₹2,000 are delivered at a standard flat rate of ₹150 across all Indian PIN codes.
            </p>
            <p className="text-ravetto-muted leading-relaxed">
              Orders placed before 2:00 PM IST are packaged and handed over to our courier partner the same business day. Delivery is completed within 2 to 4 business days.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-ravetto-border">
            <h3 className="font-editorial text-xl font-medium text-ravetto-teal">14-Day Quiet Returns Policy</h3>
            <p className="text-ravetto-muted leading-relaxed">
              If the fit, weight, or drape is not as you envisioned, we accept returns within 14 calendar days of receipt. Garments must remain unwashed and unworn with original atelier tags intact.
            </p>
            <p className="text-ravetto-muted leading-relaxed">
              Contact atelier@ravetto.com or use your Account Portal to schedule complimentary reverse pickup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqPage: React.FC<StaticPageProps> = () => {
  const faqs = [
    {
      q: 'How does Ravetto sizing compare to standard high-street brands?',
      a: 'Our silhouettes are engineered with architectural intent. The Essential Tee features a structured regular fit that falls true to size. If you desire a classic, sharp drape, order your true size. For a modern oversized street drape, choose our Heavyweight Oversized edition or size up once.',
    },
    {
      q: 'Will my Ravetto T-shirt shrink after the first machine wash?',
      a: 'Because our cotton yardage is pre-shrunk via high-pressure industrial steam calendars, domestic washing produces negligible shrinkage (less than 1.5%). We recommend washing cold (30°C) inside-out and line drying in the shade.',
    },
    {
      q: 'What makes 240 GSM different from a standard 160 GSM T-shirt?',
      a: 'Grams per square meter (GSM) denotes fabric weight and yarn density. Standard commercial tees (140-160 GSM) are thin and prone to sheer transparency. At 240 GSM, the cotton holds its own structural shape, framing the body cleanly without clinging to the midsection.',
    },
    {
      q: 'Where are Ravetto garments produced?',
      a: 'All garments are knitted, dyed, and constructed in Tiruppur, India—the heart of international cotton tailoring. We work with certified ateliers maintaining fair living wages and closed-loop wastewater purification.',
    },
  ];

  return (
    <div className="min-h-screen bg-ravetto-offwhite py-16 sm:py-24 text-left">
      <div className="max-w-[880px] mx-auto px-6 sm:px-12 space-y-12">
        <div className="space-y-3 pb-8 border-b border-ravetto-border">
          <span className="micro-caps text-ravetto-teal block">Inquiries</span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-ravetto-text">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="divide-y divide-ravetto-border">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-6 space-y-2">
              <h3 className="font-editorial text-lg font-medium text-ravetto-text">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-ravetto-muted leading-relaxed font-sans">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-ravetto-teal">
        404 &bull; PATTERN UNRECOGNIZED
      </span>
      <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-ravetto-text">
        The Pattern Does Not Exist.
      </h1>
      <p className="text-xs text-ravetto-muted max-w-sm">
        The piece or page you are seeking has either moved or was never drafted in this collection.
      </p>
      <Button onClick={() => onNavigate('/')} variant="primary" size="md">
        Return to Atelier
      </Button>
    </div>
  );
};
