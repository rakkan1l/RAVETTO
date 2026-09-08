import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface HeroEditorialProps {
  onExplore: () => void;
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({ onExplore }) => {
  return (
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-between bg-ravetto-offwhite overflow-hidden">
      {/* Background Cinematic Editorial Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=2000&q=90"
          alt="Ravetto Atelier Campaign Hero"
          className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.03]"
        />
        {/* Editorial Paper Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-ravetto-text/70 via-ravetto-text/20 to-transparent" />
      </div>

      {/* Top Margin Spacer */}
      <div className="relative z-10 pt-12 px-6 sm:px-12 max-w-[1440px] mx-auto w-full flex justify-between items-start text-white/90">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="editorial-label text-white"
        >
          Permanent Collection 01
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="editorial-label text-white/80 hidden sm:block font-mono"
        >
          240 &bull; 280 GSM ATELIER
        </motion.div>
      </div>

      {/* Center/Bottom Statement */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-12 pb-16 sm:pb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-4"
        >
          <span className="micro-caps text-ravetto-mint font-semibold block">
            Quiet Confidence
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
            Designed for every day. <br />
            <span className="italic font-normal">Made beyond ordinary.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <button
            onClick={onExplore}
            className="px-8 py-4 bg-white text-ravetto-text text-xs uppercase tracking-[0.18em] font-medium hover:bg-ravetto-mint hover:text-ravetto-teal transition-all duration-300 shadow-xl flex items-center space-x-3 select-none"
          >
            <span>Explore the Collection</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
