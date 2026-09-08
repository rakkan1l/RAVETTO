import React, { useState, useEffect } from 'react';
import { Drawer } from '../ui/Drawer';
import { Price } from '../ui/Price';
import { Button } from '../ui/Button';
import { ColorSelector } from './ColorSelector';
import { SizeSelector } from './SizeSelector';
import { QuantitySelector } from '../ui/QuantitySelector';
import { useUIStore } from '../../stores/uiStore';
import { useCartStore } from '../../stores/cartStore';
import { Color, Size } from '../../types';

interface QuickShopDrawerProps {
  onNavigate: (path: string) => void;
}

export const QuickShopDrawer: React.FC<QuickShopDrawerProps> = ({ onNavigate }) => {
  const { isQuickShopOpen, closeQuickShop, quickShopProduct, openSizeGuide, showToast } = useUIStore();
  const { addItem, isLoading } = useCartStore();

  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Initialize selected color and size when product changes
  useEffect(() => {
    if (quickShopProduct && quickShopProduct.variants.length > 0) {
      const firstVariant = quickShopProduct.variants[0];
      setSelectedColor(firstVariant.color);
      setSelectedSize(firstVariant.size);
      setQuantity(1);
    }
  }, [quickShopProduct]);

  if (!quickShopProduct) return null;

  // Extract unique colors and sizes
  const colors = Array.from(
    new Map(quickShopProduct.variants.map((v) => [v.color.id, v.color])).values()
  );

  const sizes = Array.from(
    new Map(quickShopProduct.variants.map((v) => [v.size.id, v.size])).values()
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  // Filter available sizes for current selected color
  const availableVariants = quickShopProduct.variants.filter(
    (v) => v.colorId === selectedColor?.id && v.stock > 0
  );
  const availableSizeIds = availableVariants.map((v) => v.sizeId);

  // Find exact selected variant
  const selectedVariant = quickShopProduct.variants.find(
    (v) => v.colorId === selectedColor?.id && v.sizeId === selectedSize?.id
  );

  const activeImage =
    quickShopProduct.images.find((img) => img.colorId === selectedColor?.id) ||
    quickShopProduct.images[0];

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      showToast('Please choose color and size', 'error');
      return;
    }

    try {
      await addItem(selectedVariant.id, quantity);
      showToast(`Added ${quickShopProduct.name} to bag`, 'success');
      closeQuickShop();
    } catch (err: any) {
      showToast(err.message || 'Could not add to bag', 'error');
    }
  };

  return (
    <Drawer
      isOpen={isQuickShopOpen}
      onClose={closeQuickShop}
      title="Quick Shop"
      subtitle="Select variant and quantity"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col space-y-6">
        {/* Product Overview Header */}
        <div className="flex space-x-4">
          <div className="w-24 h-32 bg-ravetto-offwhite-paper flex-shrink-0 overflow-hidden">
            <img
              src={activeImage?.url}
              alt={quickShopProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-1">
            <span className="text-[10px] uppercase tracking-[0.18em] text-ravetto-muted font-medium">
              {quickShopProduct.gsm} GSM &bull; {quickShopProduct.fit}
            </span>
            <h3 className="text-sm uppercase tracking-[0.14em] font-medium text-ravetto-text">
              {quickShopProduct.name}
            </h3>
            <Price
              amount={quickShopProduct.price}
              compareAtPrice={quickShopProduct.compareAtPrice}
              size="sm"
            />
            <p className="text-[11px] text-ravetto-muted line-clamp-2 pt-1">
              {quickShopProduct.fabricComposition}
            </p>
          </div>
        </div>

        {/* Color Picker */}
        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          onSelect={(c) => {
            setSelectedColor(c);
            // Reset selected size if not in new color
            const hasSize = quickShopProduct.variants.some(
              (v) => v.colorId === c.id && v.sizeId === selectedSize?.id && v.stock > 0
            );
            if (!hasSize) {
              const firstAvail = quickShopProduct.variants.find(
                (v) => v.colorId === c.id && v.stock > 0
              );
              setSelectedSize(firstAvail ? firstAvail.size : null);
            }
          }}
        />

        {/* Size Picker */}
        <SizeSelector
          sizes={sizes}
          selectedSize={selectedSize}
          availableSizeIds={availableSizeIds}
          onSelect={setSelectedSize}
          onOpenSizeGuide={openSizeGuide}
        />

        {/* Quantity & Stock Status */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="block text-[11px] uppercase tracking-[0.14em] text-ravetto-muted font-medium mb-1.5">
              Quantity
            </span>
            <QuantitySelector
              quantity={quantity}
              max={selectedVariant ? selectedVariant.stock : 10}
              onChange={setQuantity}
            />
          </div>

          <div className="text-right">
            {selectedVariant ? (
              selectedVariant.stock > 0 ? (
                <span className="text-[11px] uppercase tracking-[0.14em] text-ravetto-teal font-medium">
                  {selectedVariant.stock < 8 ? `Only ${selectedVariant.stock} left` : 'In Stock'}
                </span>
              ) : (
                <span className="text-[11px] uppercase tracking-[0.14em] text-red-600 font-medium">
                  Sold Out
                </span>
              )
            ) : null}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-4 space-y-2.5">
          <Button
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock <= 0 || isLoading}
            isLoading={isLoading}
            variant="primary"
            size="md"
            className="w-full"
          >
            Add to Bag &bull; ₹{(quickShopProduct.price * quantity).toLocaleString('en-IN')}
          </Button>

          <button
            type="button"
            onClick={() => {
              closeQuickShop();
              onNavigate(`/products/${quickShopProduct.slug}`);
            }}
            className="w-full py-2.5 text-[11px] uppercase tracking-[0.16em] font-medium text-ravetto-muted hover:text-ravetto-text text-center transition-colors"
          >
            View Full Garment Story &rarr;
          </button>
        </div>
      </div>
    </Drawer>
  );
};
