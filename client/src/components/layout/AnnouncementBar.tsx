import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="bg-[#5C4033] text-[#FDFCF5] py-2 px-4 text-center select-none font-outfit border-b border-[#5C4033]/20">
      <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase">
        Complimentary Delivery on Orders Over ₹2,000 &bull; Crafted in Tiruppur &bull; 100% Combed Cotton
      </p>
    </aside>
  );
};
