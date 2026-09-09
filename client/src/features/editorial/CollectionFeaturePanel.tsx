import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CollectionFeaturePanelProps {
  onExplore: () => void;
}

export const CollectionFeaturePanel: React.FC<CollectionFeaturePanelProps> = ({ onExplore }) => {
  return (
    <section className="py-12 sm:py-20 bg-[#FDFCF5]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Wide Rounded Editorial Promotional Panel (rounded-[36px] with barely noticeable cream -> pale olive gradient) */}
        <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-gradient-to-br from-[#FDFCF5] via-[#F9F8F0] to-[#EFF3E6] border border-[#5C4033]/08 p-6 sm:p-12 lg:p-16 shadow-[0_4px_24px_rgba(92,64,51,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left/Right Lifestyle Image */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[26px] overflow-hidden bg-white p-2 shadow-[0_12px_32px_rgba(92,64,51,0.08)] border border-white">
                <div className="w-full h-full rounded-[20px] overflow-hidden bg-[#F7F6EE]">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85"
                    alt="The Everyday Collection Lifestyle"
                    loading="lazy"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-outfit font-semibold text-[#5C4033] shadow-sm">
                  100% Combed Heavyweight Cotton
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <div className="space-y-3">
                <span className="font-outfit text-xs font-semibold uppercase tracking-[0.18em] text-[#879E57] block">
                  THE EVERYDAY COLLECTION
                </span>
                <h2 className="font-outfit text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#5C4033] tracking-tight leading-[1.12]">
                  Built for how you <br />
                  <span className="italic font-normal text-[#879E57]">actually live.</span>
                </h2>
              </div>

              <div className="space-y-2 text-[#5C4033]/85 text-base sm:text-lg font-sans font-normal leading-relaxed">
                <p>Premium cotton.</p>
                <p>Relaxed silhouettes.</p>
                <p>Thoughtful details.</p>
              </div>

              <p className="text-xs sm:text-sm text-[#8C7E7E] leading-relaxed max-w-md">
                No loud graphics or fragile fabrics. Every garment is crafted with calibrated weight and pre-shrunk resilience to retain its clean silhouette wear after wear.
              </p>

              <div className="pt-2">
                <button
                  onClick={onExplore}
                  className="px-8 py-4 rounded-full bg-[#879E57] text-white font-outfit font-medium text-xs sm:text-sm tracking-[0.12em] uppercase hover:bg-[#728848] transition-all duration-300 shadow-[0_4px_16px_rgba(135,158,87,0.3)] hover:-translate-y-0.5 active:scale-95 inline-flex items-center space-x-2.5"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
