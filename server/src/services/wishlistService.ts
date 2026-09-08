import { prisma } from '../prisma';

export class WishlistService {
  async getWishlist(userId: string) {
    let wishlist = await prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
                variants: { include: { color: true, size: true } },
              },
            },
          },
        },
      },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: { where: { isPrimary: true }, take: 1 },
                  variants: { include: { color: true, size: true } },
                },
              },
            },
          },
        },
      });
    }

    return wishlist.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      preferredColorId: item.preferredColorId,
      preferredSizeId: item.preferredSizeId,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        price: item.product.price,
        compareAtPrice: item.product.compareAtPrice,
        shortDescription: item.product.shortDescription,
        fabricComposition: item.product.fabricComposition,
        gsm: item.product.gsm,
        primaryImage: item.product.images[0]?.url || '',
        variants: item.product.variants,
      },
    }));
  }

  async toggleWishlist(userId: string, productId: string, preferredColorId?: string, preferredSizeId?: string) {
    let wishlist = await prisma.wishlist.findUnique({ where: { userId } });
    if (!wishlist) {
      wishlist = await prisma.wishlist.create({ data: { userId } });
    }

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      return { saved: false, productId };
    }

    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
        preferredColorId,
        preferredSizeId,
      },
    });

    return { saved: true, productId };
  }
}

export const wishlistService = new WishlistService();
