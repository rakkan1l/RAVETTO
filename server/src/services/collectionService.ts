import { prisma } from '../prisma';
import { NotFoundError } from '../utils/errors';

export class CollectionService {
  async getAllCollections() {
    return prisma.collection.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  async getCollectionBySlug(slug: string) {
    const col = await prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: 'ACTIVE' },
          include: {
            images: { orderBy: { sortOrder: 'asc' }, include: { color: true } },
            variants: { include: { color: true, size: true } },
          },
        },
      },
    });

    if (!col) {
      throw new NotFoundError(`Collection '${slug}' not found`);
    }

    return col;
  }
}

export const collectionService = new CollectionService();
