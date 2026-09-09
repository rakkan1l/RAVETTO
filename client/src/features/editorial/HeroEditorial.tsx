import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroEditorialProps {
  onExplore: () => void;
  onBrandStory?: () => void;
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({ onExplore, onBrandStory }) => {
  // Micro parallax using mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const moveX1 = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const moveY1 = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const moveX2 = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const moveY2 = useTransform(springY, [-0.5, 0.5], [12, -12]);

  const moveX3 = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const moveY3 = useTransform(springY, [-0.5, 0.5], [-16, 16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-32 overflow-hidden bg-[#FDFCF5]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT SIDE: Typography & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-8 text-left z-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#5C4033]/10 shadow-[0_2px_10px_rgba(92,64,51,0.04)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#879E57] animate-pulse" />
              <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#8C7E7E]">
                PREMIUM EVERYDAY ESSENTIALS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-outfit text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#5C4033] tracking-tight leading-[1.08]">
                Made for <br />
                <span className="text-[#879E57] italic font-normal">Everyday Living.</span>
              </h1>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#5C4033]/85 text-base sm:text-lg lg:text-[17px] leading-relaxed max-w-lg font-sans font-normal"
            >
              Premium T-shirts built around fabric quality, comfortable fits,
              thoughtful construction and everyday versatility.
            </motion.p>

            {/* Dual Pill Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onExplore}
                className="px-8 py-4 rounded-full bg-[#879E57] text-white font-outfit font-medium text-xs sm:text-sm tracking-[0.12em] uppercase hover:bg-[#728848] transition-all duration-300 shadow-[0_4px_16px_rgba(135,158,87,0.3)] hover:shadow-[0_6px_22px_rgba(135,158,87,0.4)] hover:-translate-y-0.5 active:scale-95 flex items-center space-x-2.5"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBrandStory || onExplore}
                className="px-7 py-4 rounded-full bg-white text-[#5C4033] border border-[#5C4033]/20 font-outfit font-medium text-xs sm:text-sm tracking-[0.12em] uppercase hover:bg-[#5C4033] hover:text-[#FDFCF5] hover:border-[#5C4033] transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95"
              >
                <span>Explore the Brand</span>
              </button>
            </motion.div>

            {/* Micro Highlights Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 flex items-center space-x-6 sm:space-x-8 text-xs font-outfit text-[#8C7E7E]"
            >
              <div className="flex items-center space-x-2">
                <span className="text-[#879E57] font-bold">&bull;</span>
                <span>240–280 GSM Cotton</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#879E57] font-bold">&bull;</span>
                <span>Zero Shrinkage</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#879E57] font-bold">&bull;</span>
                <span>Pre-Shrunk Finish</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Layered Fashion Photography Collage */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full pt-4 pb-8 sm:py-6">
            <div className="relative w-full max-w-[540px] mx-auto aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] flex items-center justify-center">
              
              {/* Photo 1: Main Model Wearing T-Shirt (0deg rotation) */}
              <motion.div
                style={{ x: moveX1, y: moveY1 }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative z-20 w-[68%] sm:w-[62%] aspect-[3/4] rounded-[28px] overflow-hidden bg-white p-2 sm:p-2.5 shadow-[0_16px_40px_rgba(92,64,51,0.12)] border border-white"
              >
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#F7F6EE]">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85"
                    alt="Main model wearing everyday cotton T-shirt"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-outfit text-[#5C4033] font-semibold shadow-sm">
                  Heavyweight Relaxed Tee
                </div>
              </motion.div>

              {/* Photo 2: Secondary Lifestyle / Model Photograph (+4deg rotation) */}
              <motion.div
                style={{ x: moveX2, y: moveY2, rotate: 4 }}
                initial={{ opacity: 0, x: 30, rotate: 0 }}
                animate={{ opacity: 1, x: 0, rotate: 4 }}
                transition={{ duration: 1, delay: 0.35 }}
                className="absolute right-0 sm:right-2 top-4 sm:top-8 z-10 w-[50%] sm:w-[46%] aspect-[3/4] rounded-[24px] overflow-hidden bg-white p-2 shadow-[0_12px_32px_rgba(92,64,51,0.10)] border border-white"
              >
                <div className="w-full h-full rounded-[18px] overflow-hidden bg-[#F7F6EE]">
                  <img
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=85"
                    alt="Lifestyle everyday wear"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-[#879E57] text-white px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-outfit font-semibold shadow-sm">
                  240 GSM
                </div>
              </motion.div>

              {/* Photo 3: Fabric / Stitching Close-up Detail (-5deg rotation) */}
              <motion.div
                style={{ x: moveX3, y: moveY3, rotate: -5 }}
                initial={{ opacity: 0, x: -30, rotate: 0 }}
                animate={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-0 sm:left-2 bottom-2 sm:bottom-6 z-30 w-[46%] sm:w-[42%] aspect-[4/3] rounded-[24px] overflow-hidden bg-white p-2 shadow-[0_14px_36px_rgba(92,64,51,0.14)] border border-white"
              >
                <div className="w-full h-full rounded-[18px] overflow-hidden bg-[#F7F6EE] relative">
                  <img
                    src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85"
                    alt="Close up fabric texture and twin needle stitch"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5C4033]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 text-left">
                    <span className="text-[10px] font-outfit font-semibold text-white tracking-wide block">
                      Macro Dense Knit
                    </span>
                    <span className="text-[8px] font-sans text-white/80 block">
                      Twin-needle reinforced hem
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
