import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/productService';
import { collectionService } from '../services/collectionService';
import { sendSuccess } from '../utils/apiResponse';

export const productController = {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        collection,
        category,
        fit,
        gsmMin,
        gsmMax,
        color,
        size,
        sort,
        featured,
      } = req.query;

      const products = await productService.getProducts({
        collectionSlug: collection as string,
        categorySlug: category as string,
        fit: fit as string,
        gsmMin: gsmMin ? parseInt(gsmMin as string, 10) : undefined,
        gsmMax: gsmMax ? parseInt(gsmMax as string, 10) : undefined,
        colorSlug: color as string,
        sizeCode: size as string,
        sort: sort as string,
        isFeatured: featured === 'true' ? true : undefined,
      });

      return sendSuccess(res, products);
    } catch (err) {
      return next(err);
    }
  },

  async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProductBySlug(req.params.slug);
      return sendSuccess(res, product);
    } catch (err) {
      return next(err);
    }
  },

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const query = (req.query.q as string) || '';
      const results = await productService.searchProducts(query);
      return sendSuccess(res, results);
    } catch (err) {
      return next(err);
    }
  },
};

export const collectionController = {
  async getCollections(_req: Request, res: Response, next: NextFunction) {
    try {
      const collections = await collectionService.getAllCollections();
      return sendSuccess(res, collections);
    } catch (err) {
      return next(err);
    }
  },

  async getCollectionBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const collection = await collectionService.getCollectionBySlug(req.params.slug);
      return sendSuccess(res, collection);
    } catch (err) {
      return next(err);
    }
  },
};
