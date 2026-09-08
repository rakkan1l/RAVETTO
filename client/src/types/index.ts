export interface Color {
  id: string;
  name: string;
  slug: string;
  hexCode: string;
}

export interface Size {
  id: string;
  name: string;
  code: string;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  colorId: string;
  color: Color;
  sizeId: string;
  size: Size;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  colorId?: string | null;
  color?: Color | null;
  url: string;
  alt?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  heroHeadline?: string;
  isFeatured: boolean;
  _count?: { products: number };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  story?: string;
  price: number;
  compareAtPrice?: number;
  fabricComposition: string;
  gsm: number;
  fit: string;
  neckType: string;
  sleeveType: string;
  finish: string;
  washCare: string;
  origin: string;
  modelHeight?: string;
  modelSize?: string;
  craftsmanshipDetails?: string;
  status: string;
  isFeatured: boolean;
  collectionId?: string;
  collection?: Collection;
  variants: ProductVariant[];
  images: ProductImage[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  color: string;
  colorHex: string;
  size: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  quantity: number;
  total: number;
  image: string;
  fabric: string;
  gsm: number;
}

export interface Cart {
  id: string;
  cartToken: string;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  isFreeShipping: boolean;
  amountNeededForFreeShipping: number;
  freeShippingProgress: number;
  threshold: number;
  total: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
  createdAt?: string;
  addresses?: Address[];
  orders?: Order[];
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productName: string;
  colorName: string;
  sizeName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  carrier: string;
  trackingStatus: 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  estimatedDelivery?: string;
  trackingNumber?: string;
  items: OrderItem[];
  shipments?: Shipment[];
  createdAt: string;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  readTime: string;
  coverImage: string;
  author: string;
  publishedAt: string;
}

export interface AdminMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
  lowStockCount: number;
  lowStockVariants: any[];
  recentOrders: Order[];
  topProducts: { name: string; quantity: number; revenue: number }[];
}
