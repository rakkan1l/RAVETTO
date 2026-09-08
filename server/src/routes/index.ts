import { Router } from 'express';
import { authController } from '../controllers/authController';
import { productController, collectionController } from '../controllers/productController';
import { cartController } from '../controllers/cartController';
import { orderController } from '../controllers/orderController';
import { wishlistController, journalController, newsletterController } from '../controllers/miscControllers';
import { adminController } from '../controllers/adminController';
import { authenticate, optionalAuth } from '../middleware/authenticate';
import { authorizeRole } from '../middleware/authorize';

export const apiRouter = Router();

// Healthcheck
apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok', brand: 'RAVETTO', timestamp: new Date().toISOString() });
});

// Auth Routes
apiRouter.post('/auth/register', authController.register);
apiRouter.post('/auth/login', authController.login);
apiRouter.post('/auth/logout', authController.logout);
apiRouter.get('/auth/me', optionalAuth, authController.getMe);

// Catalog Routes
apiRouter.get('/products', productController.getProducts);
apiRouter.get('/products/:slug', productController.getProductBySlug);
apiRouter.get('/search', productController.search);

apiRouter.get('/collections', collectionController.getCollections);
apiRouter.get('/collections/:slug', collectionController.getCollectionBySlug);

// Cart Routes
apiRouter.get('/cart', optionalAuth, cartController.getCart);
apiRouter.post('/cart/items', optionalAuth, cartController.addItem);
apiRouter.patch('/cart/items/:id', optionalAuth, cartController.updateItem);
apiRouter.delete('/cart/items/:id', optionalAuth, cartController.removeItem);

// Order & Checkout Routes
apiRouter.post('/payments/create-order', optionalAuth, orderController.initiateCheckout);
apiRouter.post('/payments/verify', optionalAuth, orderController.completeOrder);
apiRouter.get('/account/orders', authenticate, orderController.getMyOrders);
apiRouter.get('/account/orders/:id', optionalAuth, orderController.getOrderById);
apiRouter.get('/shipping/track/:orderNumber', orderController.trackOrder);

// Wishlist / Saved Pieces Routes
apiRouter.get('/wishlist', authenticate, wishlistController.getWishlist);
apiRouter.post('/wishlist/toggle', authenticate, wishlistController.toggleWishlist);

// Journal & Editorial Routes
apiRouter.get('/journal', journalController.getArticles);
apiRouter.get('/journal/:slug', journalController.getArticleBySlug);

// Newsletter
apiRouter.post('/newsletter/subscribe', newsletterController.subscribe);

// Admin Routes (Protected by ADMIN role)
const adminRouter = Router();
adminRouter.use(authenticate, authorizeRole('ADMIN'));

adminRouter.get('/analytics', adminController.getMetrics);
adminRouter.get('/products', adminController.getProducts);
adminRouter.patch('/inventory/:variantId', adminController.updateInventory);
adminRouter.get('/orders', adminController.getOrders);
adminRouter.patch('/orders/:id/status', adminController.updateOrderStatus);
adminRouter.get('/customers', adminController.getCustomers);
adminRouter.get('/coupons', adminController.getCoupons);
adminRouter.post('/coupons', adminController.createCoupon);

apiRouter.use('/admin', adminRouter);
