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

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // essential for HTTP-only cookies
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.error || 'Atelier request failed', res.status, data.errors);
  }

  return data.data !== undefined ? data.data : data;
}

export const api = {
  // Products & Collections
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

  // Cart
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

  // Auth
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

  // Checkout & Payments
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

  // Wishlist
  getWishlist: () => request<any[]>('/wishlist'),

  toggleWishlist: (productId: string, preferredColorId?: string, preferredSizeId?: string) =>
    request<any>('/wishlist/toggle', {
      method: 'POST',
      body: JSON.stringify({ productId, preferredColorId, preferredSizeId }),
    }),

  // Journal
  getJournal: () => request<any[]>('/journal'),

  getJournalArticle: (slug: string) => request<any>(`/journal/${slug}`),

  // Newsletter
  subscribeNewsletter: (email: string) =>
    request<any>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Admin
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
