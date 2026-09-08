import { prisma } from '../prisma';
import { NotFoundError } from '../utils/errors';

export class ProductService {
  async getProducts(filter: {
    collectionSlug?: string;
    categorySlug?: string;
    fit?: string;
    gsmMin?: number;
    gsmMax?: number;
    colorSlug?: string;
    sizeCode?: string;
    sort?: string;
    isFeatured?: boolean;
  }) {
    const where: any = {
      status: 'ACTIVE',
    };

    if (filter.isFeatured !== undefined) {
      where.isFeatured = filter.isFeatured;
    }

    if (filter.collectionSlug) {
      where.collection = { slug: filter.collectionSlug };
    }

    if (filter.categorySlug) {
      where.category = { slug: filter.categorySlug };
    }

    if (filter.fit) {
      where.fit = { contains: filter.fit };
    }

    if (filter.gsmMin || filter.gsmMax) {
      where.gsm = {};
      if (filter.gsmMin) where.gsm.gte = filter.gsmMin;
      if (filter.gsmMax) where.gsm.lte = filter.gsmMax;
    }

    if (filter.colorSlug || filter.sizeCode) {
      where.variants = {
        some: {
          ...(filter.colorSlug ? { color: { slug: filter.colorSlug } } : {}),
          ...(filter.sizeCode ? { size: { code: filter.sizeCode } } : {}),
        },
      };
    }

    let orderBy: any = { createdAt: 'desc' };
    if (filter.sort === 'price_asc') orderBy = { price: 'asc' };
    if (filter.sort === 'price_desc') orderBy = { price: 'desc' };
    if (filter.sort === 'newest') orderBy = { createdAt: 'desc' };

    return prisma.product.findMany({
      where,
      orderBy,
      include: {
        collection: { select: { id: true, name: true, slug: true } },
        category: { select: { id: true, name: true, slug: true } },
        images: {
          orderBy: { sortOrder: 'asc' },
          include: { color: true },
        },
        variants: {
          include: {
            color: true,
            size: true,
          },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });
  }

  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        collection: true,
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          include: { color: true },
        },
        variants: {
          include: {
            color: true,
            size: true,
          },
        },
        reviews: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundError(`Garment '${slug}' not found in atelier catalog`);
    }

    return product;
  }

  async searchProducts(query: string) {
    if (!query || query.trim().length === 0) return [];

    const q = query.trim().toLowerCase();

    return prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { name: { contains: q } },
          { shortDescription: { contains: q } },
          { fabricComposition: { contains: q } },
          { story: { contains: q } },
          { fit: { contains: q } },
        ],
      },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        variants: {
          include: { color: true, size: true },
        },
      },
      take: 8,
    });
  }
}

export const productService = new ProductService();
