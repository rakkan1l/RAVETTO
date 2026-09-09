import React, { useState, useEffect } from 'react';
import { ProductImage } from '../../types';
import { Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  selectedColorId?: string | null;
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  selectedColorId,
  productName,
}) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeImages, setActiveImages] = useState<ProductImage[]>(images);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      const filtered = selectedColorId
        ? images.filter((img) => img.colorId === selectedColorId || !img.colorId)
        : images;
      setActiveImages(filtered.length > 0 ? filtered : images);
      setActiveMobileIndex(0);

      const sharpenTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, 160);
      return () => clearTimeout(sharpenTimer);
    }, 160);

    return () => clearTimeout(timer);
  }, [selectedColorId, images]);

  return (
    <>
      <div className="w-full flex flex-col space-y-4">
        {/* Desktop Layout: Large Hero + 2-Column Grid */}
        <div className="hidden sm:grid grid-cols-2 gap-4">
          {activeImages.map((img, idx) => {
            const isHero = idx === 0;
            return (
              <div
                key={img.id || idx}
                className={`relative rounded-[26px] bg-white p-2 border border-[#5C4033]/08 shadow-[0_2px_12px_rgba(92,64,51,0.03)] overflow-hidden group cursor-zoom-in select-none ${
                  isHero ? 'col-span-2 aspect-[4/3] sm:aspect-[16/11]' : 'col-span-1 aspect-[3/4]'
                }`}
                onClick={() => setFullscreenImage(img.url)}
              >
                <div className="w-full h-full rounded-[20px] overflow-hidden bg-[#F7F6EE] relative">
                  <img
                    src={img.url}
                    alt={img.alt || `${productName} - Shot 0${idx + 1}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className={`w-full h-full object-cover object-center transition-all duration-350 ease-out group-hover:scale-[1.02] ${
                      isTransitioning ? 'opacity-35 blur-sm scale-[0.99]' : 'opacity-100 blur-0 scale-100'
                    }`}
                  />

                  {/* Micro Angle Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-outfit uppercase tracking-wider text-[#5C4033] font-semibold shadow-sm border border-[#5C4033]/05">
                    {idx === 0 ? 'Studio Front' : idx === 1 ? 'Profile Drape' : 'Fabric & Stitch'}
                  </div>

                  {/* Zoom Action Icon */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFullscreenImage(img.url);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/85 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-[#5C4033] hover:bg-white shadow-sm"
                    aria-label="Enlarge image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipeable Gallery with Indicator */}
        <div className="sm:hidden relative">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none rounded-[28px] bg-white p-2 border border-[#5C4033]/08 shadow-sm"
            onScroll={(e) => {
              const target = e.currentTarget;
              const index = Math.round(target.scrollLeft / target.offsetWidth);
              setActiveMobileIndex(index);
            }}
          >
            {activeImages.map((img, idx) => (
              <div
                key={img.id || idx}
                className="w-full shrink-0 snap-center aspect-[3/4] rounded-[22px] overflow-hidden bg-[#F7F6EE] relative"
                onClick={() => setFullscreenImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.alt || `${productName} - Shot 0${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Mobile Image Counter / Dots */}
          <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-outfit font-bold text-[#5C4033] shadow-md border border-[#5C4033]/08">
            {activeMobileIndex + 1} / {activeImages.length}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-[#5C4033]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white rounded-full bg-black/20"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenImage}
            alt={productName}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-[20px] shadow-2xl"
          />
        </div>
      )}
    </>
  );
};
