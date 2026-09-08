import { prisma } from '../prisma';
import { NotFoundError } from '../utils/errors';

export class JournalService {
  async getArticles() {
    return prisma.journalPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async getArticleBySlug(slug: string) {
    const post = await prisma.journalPost.findUnique({
      where: { slug },
    });

    if (!post || !post.isPublished) {
      throw new NotFoundError(`Journal piece '${slug}' not found`);
    }

    return post;
  }
}

export const journalService = new JournalService();
