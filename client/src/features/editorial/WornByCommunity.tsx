import React from 'react';
import { Star } from 'lucide-react';

export const WornByCommunity: React.FC = () => {
  const communityPosts = [
    {
      author: 'Arjun M.',
      product: 'The Heavyweight 280 GSM Tee',
      review: 'The collar hasn’t stretched or warped after multiple washes. The fabric drape is genuinely exceptional.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=85',
      fit: 'Wearing Size L',
    },
    {
      author: 'Vikram S.',
      product: 'The Oversized Relaxed Tee',
      review: 'Finally a brand that understands proper drop-shoulder proportions without looking sloppy.',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=85',
      fit: 'Wearing Size XL',
    },
    {
      author: 'Rohan K.',
      product: 'The Raw Supima Foundation Tee',
      review: 'Hands down the softest yet most substantial T-shirt in my rotation. Zero shrinkage as promised.',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=85',
      fit: 'Wearing Size M',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FDFCF5] border-t border-[#5C4033]/06">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span className="font-outfit text-xs font-semibold uppercase tracking-[0.18em] text-[#879E57] block">
            HOW OUR COMMUNITY WEARS IT
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#5C4033] tracking-tight">
            Worn By You
          </h2>
          <p className="text-sm text-[#8C7E7E] font-sans">
            Real impressions from owners who value craftsmanship over fleeting trends.
          </p>
        </div>

        {/* 3-Column Community Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {communityPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[28px] overflow-hidden p-3 sm:p-4 border border-[#5C4033]/08 shadow-[0_4px_20px_rgba(92,64,51,0.04)] flex flex-col justify-between text-left"
            >
              <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-[#F7F6EE] mb-4">
                <img
                  src={post.image}
                  alt={post.product}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-outfit font-semibold text-[#5C4033]">
                  {post.fit}
                </div>
              </div>

              <div className="p-2 space-y-2.5">
                <div className="flex items-center space-x-1 text-[#879E57]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-[13px] text-[#5C4033]/85 font-sans leading-relaxed italic">
                  "{post.review}"
                </p>
                <div className="pt-2 border-t border-[#5C4033]/08 flex items-center justify-between">
                  <span className="font-outfit text-xs font-bold text-[#5C4033]">
                    {post.author}
                  </span>
                  <span className="text-[11px] font-outfit text-[#8C7E7E] truncate max-w-[160px]">
                    {post.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
