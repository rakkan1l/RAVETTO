import { FALLBACK_PRODUCTS, FALLBACK_COLLECTIONS, FALLBACK_JOURNAL } from './catalogData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

export class ApiError extends Error {
  statusCode: number;
  errors?: any;
  constructor(message: string, statusCode: number, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new ApiError(data.error || 'Atelier request failed', res.status, data.errors);
    }

    return data.data !== undefined ? data.data : data;
  } catch (err: any) {
    // If running in standalone static mode (like Vercel before backend URL is linked)
    return handleOfflineFallback<T>(endpoint, options, err);
  }
}

function handleOfflineFallback<T>(endpoint: string, options: RequestInit, originalError: any): T {
  const method = options.method || 'GET';

  if (endpoint.startsWith('/products')) {
    if (endpoint.includes('/products/')) {
      const slug = endpoint.split('/products/')[1]?.split('?')[0];
      const found = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
      if (found) return found as unknown as T;
    }
    return FALLBACK_PRODUCTS as unknown as T;
  }

  if (endpoint.startsWith('/collections')) {
    if (endpoint.includes('/collections/')) {
      const slug = endpoint.split('/collections/')[1]?.split('?')[0];
      const col = FALLBACK_COLLECTIONS.find((c) => c.slug === slug);
      if (col) {
        return {
          ...col,
          products: FALLBACK_PRODUCTS.filter((p) => p.collectionId === col.id),
        } as unknown as T;
      }
    }
    return FALLBACK_COLLECTIONS as unknown as T;
  }

  if (endpoint.startsWith('/journal')) {
    if (endpoint.includes('/journal/')) {
      const slug = endpoint.split('/journal/')[1]?.split('?')[0];
      const post = FALLBACK_JOURNAL.find((j) => j.slug === slug);
      if (post) return post as unknown as T;
    }
    return FALLBACK_JOURNAL as unknown as T;
  }

  if (endpoint.startsWith('/search')) {
    return FALLBACK_PRODUCTS.slice(0, 4) as unknown as T;
  }

  if (endpoint.startsWith('/cart')) {
    return {
      id: 'local-cart',
      cartToken: 'local-token',
      items: [],
      itemCount: 0,
      subtotal: 0,
      shippingFee: 0,
      isFreeShipping: false,
      amountNeededForFreeShipping: 2000,
      freeShippingProgress: 0,
      threshold: 2000,
      total: 0,
    } as unknown as T;
  }

  if (endpoint.startsWith('/admin/analytics')) {
    return {
      totalRevenue: 12092,
      totalOrders: 4,
      averageOrderValue: 3023,
      totalCustomers: 2,
      lowStockCount: 1,
      lowStockVariants: [],
      recentOrders: [],
      topProducts: [{ name: 'The Essential Tee', quantity: 4, revenue: 5996 }],
    } as unknown as T;
  }

  if (endpoint.startsWith('/admin/products')) {
    return FALLBACK_PRODUCTS as unknown as T;
  }

  if (endpoint.startsWith('/admin/orders')) {
    return [] as unknown as T;
  }

  throw originalError;
}

export const api = {
  getProducts: (params?: Record<string, any>) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, String(val));
        }
      });
    }
    const qs = query.toString();
    return request<any[]>(`/products${qs ? `?${qs}` : ''}`);
  },

  getProductBySlug: (slug: string) => request<any>(`/products/${slug}`),

  search: (q: string) => request<any[]>(`/search?q=${encodeURIComponent(q)}`),

  getCollections: () => request<any[]>('/collections'),

  getCollectionBySlug: (slug: string) => request<any>(`/collections/${slug}`),

  getCart: () => request<any>('/cart'),

  addToCart: (variantId: string, quantity = 1) =>
    request<any>('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ variantId, quantity }),
    }),

  updateCartItem: (itemId: string, quantity: number) =>
    request<any>(`/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    }),

  removeFromCart: (itemId: string) =>
    request<any>(`/cart/items/${itemId}`, {
      method: 'DELETE',
    }),

  register: (body: any) =>
    request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  login: (body: any) =>
    request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  logout: () =>
    request<any>('/auth/logout', {
      method: 'POST',
    }),

  getMe: () => request<any>('/auth/me'),

  createPaymentOrder: (couponCode?: string) =>
    request<any>('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ couponCode }),
    }),

  verifyPayment: (payload: any) =>
    request<any>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getOrderById: (id: string) => request<any>(`/account/orders/${id}`),

  trackOrder: (orderNumber: string) => request<any>(`/shipping/track/${orderNumber}`),

  getMyOrders: () => request<any[]>('/account/orders'),

  getWishlist: () => request<any[]>('/wishlist'),

  toggleWishlist: (productId: string, preferredColorId?: string, preferredSizeId?: string) =>
    request<any>('/wishlist/toggle', {
      method: 'POST',
      body: JSON.stringify({ productId, preferredColorId, preferredSizeId }),
    }),

  getJournal: () => request<any[]>('/journal'),

  getJournalArticle: (slug: string) => request<any>(`/journal/${slug}`),

  subscribeNewsletter: (email: string) =>
    request<any>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  getAdminMetrics: () => request<any>('/admin/analytics'),

  getAdminProducts: () => request<any[]>('/admin/products'),

  updateAdminInventory: (variantId: string, stock: number) =>
    request<any>(`/admin/inventory/${variantId}`, {
      method: 'PATCH',
      body: JSON.stringify({ stock }),
    }),

  getAdminOrders: () => request<any[]>('/admin/orders'),

  updateAdminOrderStatus: (orderId: string, status: string, trackingNumber?: string) =>
    request<any>(`/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, trackingNumber }),
    }),

  getAdminCustomers: () => request<any[]>('/admin/customers'),

  getAdminCoupons: () => request<any[]>('/admin/coupons'),
};
