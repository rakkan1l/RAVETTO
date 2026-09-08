import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="bg-ravetto-teal text-white py-2 px-4 text-center border-b border-ravetto-teal-dark select-none">
      <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase">
        COMPLIMENTARY SHIPPING ON ORDERS OVER ₹2,000 &bull; CRAFTED IN TIRUPPUR &bull; QUIET LUXURY
      </p>
    </aside>
  );
};
