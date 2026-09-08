import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding RAVETTO Platform Database ---');

  // Clear existing
  await prisma.review.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();
  await prisma.size.deleteMany();
  await prisma.color.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.journalPost.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  // 1. Users
  const passwordAdmin = await bcrypt.hash('ravettoAdmin2026!', 10);
  const passwordCustomer = await bcrypt.hash('ravettoCustomer2026!', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@ravetto.com',
      passwordHash: passwordAdmin,
      firstName: 'Atelier',
      lastName: 'Director',
      role: 'ADMIN',
      phone: '+91 98450 12345',
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      email: 'client@ravetto.com',
      passwordHash: passwordCustomer,
      firstName: 'Arjun',
      lastName: 'Mehta',
      role: 'CUSTOMER',
      phone: '+91 98110 56789',
    },
  });

  // Customer Address
  await prisma.address.create({
    data: {
      userId: customerUser.id,
      fullName: 'Arjun Mehta',
      street: 'Flat 402, Altius Residences, Indiranagar 12th Main',
      landmark: 'Near 100ft Road junction',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India',
      phone: '+91 98110 56789',
      isDefault: true,
    },
  });

  // 2. Colors
  const deepTeal = await prisma.color.create({
    data: { name: 'Deep Teal', slug: 'deep-teal', hexCode: '#0D4F4A' },
  });
  const chalkBlack = await prisma.color.create({
    data: { name: 'Chalk Black', slug: 'chalk-black', hexCode: '#172B2A' },
  });
  const offWhite = await prisma.color.create({
    data: { name: 'Off White', slug: 'off-white', hexCode: '#F5F4EF' },
  });
  const washedMint = await prisma.color.create({
    data: { name: 'Washed Mint', slug: 'washed-mint', hexCode: '#B8E0D2' },
  });
  const slateGrey = await prisma.color.create({
    data: { name: 'Slate Grey', slug: 'slate-grey', hexCode: '#5C6B69' },
  });

  // 3. Sizes
  const sizeXS = await prisma.size.create({ data: { name: 'Extra Small', code: 'XS', sortOrder: 1 } });
  const sizeS = await prisma.size.create({ data: { name: 'Small', code: 'S', sortOrder: 2 } });
  const sizeM = await prisma.size.create({ data: { name: 'Medium', code: 'M', sortOrder: 3 } });
  const sizeL = await prisma.size.create({ data: { name: 'Large', code: 'L', sortOrder: 4 } });
  const sizeXL = await prisma.size.create({ data: { name: 'Extra Large', code: 'XL', sortOrder: 5 } });
  const sizeXXL = await prisma.size.create({ data: { name: 'Double Extra Large', code: 'XXL', sortOrder: 6 } });

  const allSizes = [sizeXS, sizeS, sizeM, sizeL, sizeXL, sizeXXL];

  // 4. Categories & Collections
  const catTees = await prisma.category.create({
    data: { name: 'T-Shirts', slug: 't-shirts', description: 'Heavyweight, combed, structured luxury T-shirts.' },
  });
  const catLongSleeve = await prisma.category.create({
    data: { name: 'Long Sleeves', slug: 'long-sleeves', description: 'Architectural long-sleeve essentials.' },
  });

  const colFoundations = await prisma.collection.create({
    data: {
      name: 'The Foundations',
      slug: 'the-foundations',
      description: 'The core permanent collection. 240 GSM Supima cotton engineered for daily wear without deformation.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=85',
      heroHeadline: 'TIMELESS CUTS. UNCOMPROMISING WEIGHT.',
      isFeatured: true,
    },
  });

  const colHeavyweight = await prisma.collection.create({
    data: {
      name: 'Heavyweight Atelier',
      slug: 'heavyweight-atelier',
      description: '280 GSM dense knit architecture. Clean shoulder drape with substantial presence.',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1400&q=85',
      heroHeadline: '280 GSM ARCHITECTURAL DRAPE.',
      isFeatured: true,
    },
  });

  const colRawDyed = await prisma.collection.create({
    data: {
      name: 'Raw & Mineral Dyed',
      slug: 'raw-and-dyed',
      description: 'Low-impact garment washed pigments. Subdued earth tones with velvety hand-feel.',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1400&q=85',
      heroHeadline: 'ORGANIC COMBED FIBERS & MINERAL WASH.',
      isFeatured: true,
    },
  });

  // 5. Products
  const productsData = [
    {
      name: 'The Essential Tee',
      slug: 'essential-tee',
      shortDescription: '240 GSM Combed Supima Cotton • Structured Everyday Fit',
      longDescription: 'Crafted from 100% extra-long staple Supima cotton, The Essential Tee redefines the foundational garment. A dense interlock weave provides clean drape without cling, while the reinforced double-rib collar holds its crisp geometry through countless washes.',
      story: 'We spent eighteen months perfecting one thing: the neckline. Most T-shirts fail after five washes because the collar stretches and ripples. The Essential Tee features a proprietary 1x1 double-rib construction with invisible internal binding that preserves architectural shape year after year.',
      price: 1499,
      compareAtPrice: 1899,
      fabricComposition: '100% Combed Long-Staple Supima Cotton',
      gsm: 240,
      fit: 'Structured Regular',
      neckType: 'Reinforced 1x1 Double-Ribbed Crew',
      sleeveType: 'Classic Tapered Sleeve',
      finish: 'Pre-shrunk, bio-polished, zero silicone treatment',
      washCare: 'Machine wash gentle cold (30°C) inside-out. Do not tumble dry. Line dry in shade.',
      origin: 'Tiruppur, India',
      modelHeight: "6'1\" (185 cm)",
      modelSize: 'Wearing size M in Deep Teal',
      craftsmanshipDetails: 'Dense 24-gauge knit, twin-needle clean hem, chain-stitched shoulder taping, heat-pressed inner atelier stamp (no itchy neck tags).',
      collectionId: colFoundations.id,
      categoryId: catTees.id,
      isFeatured: true,
      colors: [deepTeal, chalkBlack, offWhite, washedMint],
      images: [
        { url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85', alt: 'The Essential Tee in Deep Teal - Front Studio', colorId: deepTeal.id, isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85', alt: 'The Essential Tee in Deep Teal - Model Editorial Profile', colorId: deepTeal.id, isPrimary: false },
        { url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85', alt: 'The Essential Tee in Chalk Black - Still Life', colorId: chalkBlack.id, isPrimary: false },
        { url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85', alt: 'The Essential Tee in Off White - Editorial', colorId: offWhite.id, isPrimary: false },
        { url: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=85', alt: 'Fabric Weave & Stitching Detail Macro', colorId: null, isPrimary: false },
      ],
    },
    {
      name: 'The Heavyweight Oversized Tee',
      slug: 'heavyweight-oversized-tee',
      shortDescription: '280 GSM Interlock Dense Knit • Architectural Drop Shoulder',
      longDescription: 'Substantial, architectural, and completely opaque. Cut from 280 GSM dense-knit cotton with dropped shoulders and a wider chest box. It stands away from the body with intentional sculptural drape rather than clinging.',
      story: 'Weight creates silhouette. At 280 GSM, this garment sits between a luxury heavyweight T-shirt and a light sweatshirt. Knitted on low-speed heritage loop machines to ensure uniform tension throughout the fabric.',
      price: 1899,
      compareAtPrice: 2299,
      fabricComposition: '100% Pure Organic Ring-Spun Cotton',
      gsm: 280,
      fit: 'Relaxed Architectural Oversized',
      neckType: '30mm High-Gauge Reinforced Collar',
      sleeveType: 'Elongated Drop-Shoulder Sleeve',
      finish: 'Enzyme carbon-washed for velvet hand-feel',
      washCare: 'Cold wash with like colors. Flat dry recommended.',
      origin: 'Coimbatore, India',
      modelHeight: "6'2\" (188 cm)",
      modelSize: 'Wearing size L in Chalk Black',
      craftsmanshipDetails: '280 GSM heavyweight interlock, drop-needle shoulder line, double-reinforced collar tape, blind stitched sleeve cuffs.',
      collectionId: colHeavyweight.id,
      categoryId: catTees.id,
      isFeatured: true,
      colors: [chalkBlack, deepTeal, slateGrey, offWhite],
      images: [
        { url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85', alt: 'Heavyweight Oversized Tee - Front Profile', colorId: chalkBlack.id, isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85', alt: 'Heavyweight Oversized Tee - Studio Deep Teal', colorId: deepTeal.id, isPrimary: false },
        { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85', alt: 'Heavyweight Oversized Tee in Slate Grey', colorId: slateGrey.id, isPrimary: false },
        { url: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=85', alt: 'Macro Interlock Knit Texture', colorId: null, isPrimary: false },
      ],
    },
    {
      name: 'The Structured Mock Neck',
      slug: 'structured-mock-neck',
      shortDescription: '260 GSM Tailored Knit • 3.5cm Architectural Collar',
      longDescription: 'An elevated interpretation of the mid-century modern mock neck. Tailored through the torso with an engineered 3.5cm ribbed neckband containing 3% Japanese elastane for shape retention.',
      story: 'Designed to transition effortlessly from tailored outerwear to minimal solo wear. The neckline stands firmly without restriction, creating a sharp, intentional frame for the jawline.',
      price: 1999,
      compareAtPrice: 2499,
      fabricComposition: '97% Combed Supima Cotton, 3% Japanese Elastane (Collar)',
      gsm: 260,
      fit: 'Tailored Structured',
      neckType: '35mm Architectural Mock Neck',
      sleeveType: 'Fitted Armhole Clean Sleeve',
      finish: 'Silken bio-polished finish',
      washCare: 'Cold wash. Dry flat.',
      origin: 'Tiruppur, India',
      modelHeight: "6'0\" (183 cm)",
      modelSize: 'Wearing size M in Deep Teal',
      craftsmanshipDetails: 'Form-knitted continuous mock neck, ergonomic armscye stitching, reinforced split side seams.',
      collectionId: colFoundations.id,
      categoryId: catTees.id,
      isFeatured: true,
      colors: [deepTeal, chalkBlack, offWhite],
      images: [
        { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85', alt: 'The Structured Mock Neck in Deep Teal', colorId: deepTeal.id, isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85', alt: 'The Structured Mock Neck in Chalk Black', colorId: chalkBlack.id, isPrimary: false },
        { url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85', alt: 'The Structured Mock Neck in Off White', colorId: offWhite.id, isPrimary: false },
      ],
    },
    {
      name: 'The Atelier Relaxed Tee',
      slug: 'atelier-relaxed-tee',
      shortDescription: '250 GSM Reverse French Terry • Subdued Box Cut',
      longDescription: 'A study in tactile contrast. Features a silky smooth face exterior with an ultra-fine micro-loop terry interior that breathes exceptionally well in warm climates.',
      story: 'Originally developed as a custom studio piece for our design team. The drape is effortless with gentle shoulder drops and a straight hem that hangs cleanly over trousers.',
      price: 1699,
      compareAtPrice: 2099,
      fabricComposition: '100% Organic Micro-Loop French Terry Cotton',
      gsm: 250,
      fit: 'Relaxed Box Cut',
      neckType: 'Self-Fabric Bound Collar',
      sleeveType: 'Relaxed Mid-Arm Sleeve',
      finish: 'Mineral pigment washed',
      washCare: 'Gentle wash cold. Line dry in shade.',
      origin: 'Tiruppur, India',
      modelHeight: "5'11\" (180 cm)",
      modelSize: 'Wearing size M in Washed Mint',
      craftsmanshipDetails: 'French terry micro-loops, flatlock seam interior, tonal embroidered hem insignia.',
      collectionId: colRawDyed.id,
      categoryId: catTees.id,
      isFeatured: true,
      colors: [washedMint, slateGrey, offWhite],
      images: [
        { url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85', alt: 'Atelier Relaxed Tee in Washed Mint', colorId: washedMint.id, isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85', alt: 'Atelier Relaxed Tee in Slate Grey', colorId: slateGrey.id, isPrimary: false },
        { url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85', alt: 'Atelier Relaxed Tee in Off White', colorId: offWhite.id, isPrimary: false },
      ],
    },
    {
      name: 'The Minimal Long Sleeve',
      slug: 'minimal-long-sleeve',
      shortDescription: '240 GSM Long-Staple Cotton • Architectural Ribbed Cuffs',
      longDescription: 'Engineered for trans-seasonal layering. Clean proportions with 6cm elongated ribbed cuffs that stay in position without tightening or stretching over time.',
      story: 'Long sleeves often bunch awkwardly around the forearm or sag at the wrist. We developed an anatomical arm taper with high-recovery ribbing that holds right where you place it.',
      price: 1799,
      compareAtPrice: 2199,
      fabricComposition: '100% Combed Long-Staple Cotton',
      gsm: 240,
      fit: 'Regular Tailored Fit',
      neckType: 'Double-Rib Crew Collar',
      sleeveType: 'Long Sleeve with 6cm Ribbed Cuff',
      finish: 'Pre-shrunk, bio-washed',
      washCare: 'Machine wash cold. Do not tumble dry.',
      origin: 'Tiruppur, India',
      modelHeight: "6'1\" (185 cm)",
      modelSize: 'Wearing size L in Deep Teal',
      craftsmanshipDetails: 'Seamless tubular torso knitting, twin-needle coverstitch cuffs, reinforced shoulder tape.',
      collectionId: colFoundations.id,
      categoryId: catLongSleeve.id,
      isFeatured: false,
      colors: [deepTeal, chalkBlack, slateGrey],
      images: [
        { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85', alt: 'Minimal Long Sleeve in Deep Teal', colorId: deepTeal.id, isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85', alt: 'Minimal Long Sleeve in Chalk Black', colorId: chalkBlack.id, isPrimary: false },
      ],
    },
  ];

  for (const p of productsData) {
    const createdProduct = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription,
        longDescription: p.longDescription,
        story: p.story,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        fabricComposition: p.fabricComposition,
        gsm: p.gsm,
        fit: p.fit,
        neckType: p.neckType,
        sleeveType: p.sleeveType,
        finish: p.finish,
        washCare: p.washCare,
        origin: p.origin,
        modelHeight: p.modelHeight,
        modelSize: p.modelSize,
        craftsmanshipDetails: p.craftsmanshipDetails,
        collectionId: p.collectionId,
        categoryId: p.categoryId,
        isFeatured: p.isFeatured,
        status: 'ACTIVE',
        seoTitle: `${p.name} | RAVETTO Atelier`,
        seoDescription: `${p.shortDescription}. Crafted with quiet intention in ${p.origin}.`,
      },
    });

    // Create Variants for each color & size
    for (const color of p.colors) {
      for (const size of allSizes) {
        // Stock between 8 and 25
        const stock = (size.code === 'M' || size.code === 'L') ? 22 : 12;
        await prisma.productVariant.create({
          data: {
            productId: createdProduct.id,
            colorId: color.id,
            sizeId: size.id,
            sku: `RV-${p.slug.toUpperCase().slice(0, 4)}-${color.slug.toUpperCase().slice(0, 3)}-${size.code}`,
            price: p.price,
            compareAtPrice: p.compareAtPrice,
            stock,
          },
        });
      }
    }

    // Images
    for (let i = 0; i < p.images.length; i++) {
      const img = p.images[i];
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          colorId: img.colorId,
          url: img.url,
          alt: img.alt,
          isPrimary: img.isPrimary,
          sortOrder: i,
        },
      });
    }

    // Customer reviews
    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        authorName: 'Vikram S.',
        rating: 5,
        title: 'The collar holds like nothing else.',
        comment: 'Washed this six times already. No rippling around the neck, no fading in the deep teal shade. The fabric weight feels substantial without overheating.',
        isVerifiedPurchase: true,
      },
    });

    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        authorName: 'Rohan K.',
        rating: 5,
        title: 'Architectural silhouette that actually flatters.',
        comment: 'The drape is clean and structured. It doesn’t cling around the waist. Exactly what quiet luxury should feel like.',
        isVerifiedPurchase: true,
      },
    });
  }

  // 6. Coupons
  await prisma.coupon.create({
    data: {
      code: 'FIRSTRAVETTO',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minOrderValue: 2000,
      maxDiscount: 500,
      isActive: true,
    },
  });

  await prisma.coupon.create({
    data: {
      code: 'ATELIER300',
      discountType: 'FIXED',
      discountValue: 300,
      minOrderValue: 3000,
      isActive: true,
    },
  });

  // 7. Journal Articles
  const journalPosts = [
    {
      title: 'UNDERSTANDING GSM: WHY WEIGHT DEFINES DRAPE',
      slug: 'understanding-gsm-why-weight-defines-drape',
      excerpt: 'Grams per square meter (GSM) is the single most defining metric in garment architecture. Here is how weight dictates posture, opacity, and endurance.',
      content: `In standard retail fashion, T-shirts typically hover between 140 and 180 GSM. At this threshold, cotton is thin, prone to twisting along side seams, and easily sheer under direct daylight.\n\nAt Ravetto, we begin at 240 GSM. A heavyweight knit is not merely warmer; it possesses structural rigidity. The fabric hangs away from the torso, creating clean vertical lines and obscuring anatomical contours for a flattering, architectural drape.\n\nWhen you move from 240 GSM to our 280 GSM Interlock knit, the garment takes on sculptural presence. It moves with deliberate cadence rather than fluttering in the wind. That is quiet confidence made tactile.`,
      readTime: '4 min read',
      coverImage: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=85',
      author: 'Ravetto Atelier',
    },
    {
      title: 'THE ANATOMY OF A GOOD T-SHIRT: COLLAR, SEAM, HEM',
      slug: 'the-anatomy-of-a-good-t-shirt',
      excerpt: 'Eighteen months deconstructing collars, twin-needle tensions, and the invisible shoulder tape that protects against hanger stretch.',
      content: `The collar of a T-shirt is the frame of your face. When a collar bacon-rolls after washing, the entire outfit degrades immediately.\n\nOur double-ribbed 1x1 collar is knitted with high-recovery combed cotton wrapped over an internal herringbone stabilizing tape. Even after repeated wash cycles, the neckline remains crisp, sharp, and flat against the clavicle.\n\nDown at the hem, we employ twin-needle coverstitching spaced at 6mm intervals. This distributes tension equally across lateral movements, completely preventing curled edges.`,
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
      author: 'Ravetto Atelier',
    },
    {
      title: 'BUILDING THE EVERYDAY UNIFORM: THE RESTRAINT OF ESSENTIALS',
      slug: 'building-the-everyday-uniform',
      excerpt: 'Why having fewer, impeccably cut garments liberates daily focus and sharpens personal presence.',
      content: `A wardrobe built on transient logos and novelty cuts is an exhausting cycle. The modern uniform is quiet. It pairs a heavyweight Deep Teal or Chalk Black T-shirt with tailored pleated trousers or raw denim.\n\nWhen the silhouette, the fabric weight, and the finish are refined, you need zero surface ornamentation. The quality of the cotton speaks for itself.`,
      readTime: '3 min read',
      coverImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      author: 'Ravetto Atelier',
    },
  ];

  for (const j of journalPosts) {
    await prisma.journalPost.create({ data: j });
  }

  // 8. Demo Orders for Customer
  const firstVariant = await prisma.productVariant.findFirst({
    where: { color: { slug: 'deep-teal' }, size: { code: 'M' } },
    include: { product: true, color: true, size: true },
  });

  const secondVariant = await prisma.productVariant.findFirst({
    where: { color: { slug: 'chalk-black' }, size: { code: 'L' } },
    include: { product: true, color: true, size: true },
  });

  if (firstVariant && secondVariant) {
    const demoOrder = await prisma.order.create({
      data: {
        orderNumber: 'RV1024',
        userId: customerUser.id,
        guestEmail: customerUser.email,
        status: 'SHIPPED',
        subtotal: 3398,
        discount: 300,
        shippingFee: 0,
        tax: 0,
        total: 3098,
        razorpayOrderId: 'order_RV1024_DEMO',
        razorpayPaymentId: 'pay_RV1024_DEMO_SUCCESS',
        razorpaySignature: 'sig_mock_verified',
        trackingNumber: 'BLUEDART-RV-9920194',
        shippingAddressJson: JSON.stringify({
          fullName: 'Arjun Mehta',
          street: 'Flat 402, Altius Residences, Indiranagar 12th Main',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560038',
          country: 'India',
          phone: '+91 98110 56789',
        }),
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.orderItem.create({
      data: {
        orderId: demoOrder.id,
        variantId: firstVariant.id,
        productName: firstVariant.product.name,
        colorName: firstVariant.color.name,
        sizeName: firstVariant.size.code,
        unitPrice: firstVariant.price,
        quantity: 1,
        total: firstVariant.price,
      },
    });

    await prisma.orderItem.create({
      data: {
        orderId: demoOrder.id,
        variantId: secondVariant.id,
        productName: secondVariant.product.name,
        colorName: secondVariant.color.name,
        sizeName: secondVariant.size.code,
        unitPrice: secondVariant.price,
        quantity: 1,
        total: secondVariant.price,
      },
    });

    await prisma.shipment.create({
      data: {
        orderId: demoOrder.id,
        trackingNumber: 'BLUEDART-RV-9920194',
        carrier: 'Bluedart Air Express',
        trackingStatus: 'IN_TRANSIT',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        shippedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    });

    await prisma.payment.create({
      data: {
        orderId: demoOrder.id,
        provider: 'RAZORPAY',
        transactionId: 'pay_RV1024_DEMO_SUCCESS',
        amount: 3098,
        status: 'SUCCESS',
      },
    });
  }

  console.log('✔ RAVETTO database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
