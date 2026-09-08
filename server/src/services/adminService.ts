import { prisma } from '../prisma';
import { BadRequestError, NotFoundError } from '../utils/errors';

export class AdminService {
  async getDashboardMetrics() {
    const orders = await prisma.order.findMany({
      where: { status: { not: 'CANCELLED' } },
      include: { items: true },
    });

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    const totalCustomers = await prisma.user.count({
      where: { role: 'CUSTOMER' },
    });

    // Low stock variants (< 10 units)
    const lowStockVariants = await prisma.productVariant.findMany({
      where: { stock: { lt: 10 } },
      include: {
        product: { select: { name: true, slug: true } },
        color: { select: { name: true } },
        size: { select: { code: true } },
      },
    });

    // Recent orders
    const recentOrders = await prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      },
    });

    // Top selling products calculated from real order items
    const orderItems = await prisma.orderItem.findMany();
    const productSalesMap: Record<string, { name: string; quantity: number; revenue: number }> = {};

    for (const item of orderItems) {
      if (!productSalesMap[item.productName]) {
        productSalesMap[item.productName] = { name: item.productName, quantity: 0, revenue: 0 };
      }
      productSalesMap[item.productName].quantity += item.quantity;
      productSalesMap[item.productName].revenue += item.total;
    }

    const topProducts = Object.values(productSalesMap)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      totalCustomers,
      lowStockCount: lowStockVariants.length,
      lowStockVariants,
      recentOrders: recentOrders.map((o) => ({
        ...o,
        shippingAddress: JSON.parse(o.shippingAddressJson || '{}'),
      })),
      topProducts,
    };
  }

  async getAllProducts() {
    return prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        collection: true,
        category: true,
        images: { orderBy: { sortOrder: 'asc' }, include: { color: true } },
        variants: {
          include: { color: true, size: true },
          orderBy: [{ colorId: 'asc' }, { size: { sortOrder: 'asc' } }],
        },
      },
    });
  }

  async updateVariantInventory(variantId: string, stock: number) {
    if (stock < 0) {
      throw new BadRequestError('Stock cannot be negative');
    }

    const variant = await prisma.productVariant.update({
      where: { id: variantId },
      data: { stock },
      include: {
        product: true,
        color: true,
        size: true,
      },
    });

    return variant;
  }

  async getAllOrders() {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        shipments: true,
        payments: true,
      },
    });

    return orders.map((o) => ({
      ...o,
      shippingAddress: JSON.parse(o.shippingAddressJson || '{}'),
    }));
  }

  async updateOrderStatus(orderId: string, status: string, trackingNumber?: string) {
    const validStatuses = ['CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestError(`Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}`);
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { shipments: true },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(trackingNumber ? { trackingNumber } : {}),
      },
      include: {
        items: true,
        shipments: true,
        payments: true,
      },
    });

    // Update shipment status
    if (updated.shipments.length > 0) {
      await prisma.shipment.update({
        where: { id: updated.shipments[0].id },
        data: {
          trackingStatus: status,
          ...(trackingNumber ? { trackingNumber } : {}),
          ...(status === 'SHIPPED' ? { shippedAt: new Date() } : {}),
          ...(status === 'DELIVERED' ? { deliveredAt: new Date() } : {}),
        },
      });
    }

    return {
      ...updated,
      shippingAddress: JSON.parse(updated.shippingAddressJson || '{}'),
    };
  }

  async getAllCustomers() {
    return prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true,
        _count: {
          select: { orders: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllCoupons() {
    return prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCoupon(data: {
    code: string;
    discountType: string;
    discountValue: number;
    minOrderValue?: number;
    maxDiscount?: number;
  }) {
    return prisma.coupon.create({
      data: {
        code: data.code.toUpperCase().trim(),
        discountType: data.discountType,
        discountValue: data.discountValue,
        minOrderValue: data.minOrderValue || 0,
        maxDiscount: data.maxDiscount,
        isActive: true,
      },
    });
  }
}

export const adminService = new AdminService();
