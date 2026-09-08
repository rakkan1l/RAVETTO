import React, { useState } from 'react';
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

  // Filter images for selected color, falling back to all images
  const colorFiltered = selectedColorId
    ? images.filter((img) => img.colorId === selectedColorId || !img.colorId)
    : images;

  const displayImages = colorFiltered.length > 0 ? colorFiltered : images;

  return (
    <>
      <div className="w-full flex flex-col space-y-4">
        {/* Gallery Stack */}
        <div className="grid grid-cols-1 gap-4">
          {displayImages.map((img, idx) => (
            <div
              key={img.id || idx}
              className="relative aspect-[3/4] bg-ravetto-offwhite-paper border border-ravetto-border overflow-hidden group cursor-zoom-in select-none"
              onClick={() => setFullscreenImage(img.url)}
            >
              <img
                src={img.url}
                alt={img.alt || `${productName} - Plate 0${idx + 1}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover transition-all duration-400 ease-out group-hover:scale-[1.01]"
              />

              {/* Angle Tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase font-mono tracking-widest text-ravetto-text pointer-events-none">
                {idx === 0 ? 'Editorial Studio' : idx === 1 ? 'Profile Drape' : 'Texture Detail'}
              </div>

              {/* Fullscreen Trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenImage(img.url);
                }}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-ravetto-text hover:bg-white"
                aria-label="Enlarge image"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenImage}
            alt={productName}
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
};
