# RAVETTO — Premium DTC Fashion E-Commerce Platform

> **DESIGNED FOR EVERY DAY. MADE BEYOND ORDINARY.**  
> Crafted with quiet confidence in Tiruppur, India.

---

## Brand Positioning & Aesthetics

RAVETTO is an editorial direct-to-consumer apparel brand focused on heavyweight T-shirts and lifestyle garments. It rejects generic e-commerce templates, oversized rounded cards, and AI-style gradients in favor of:

- **Architectural Typography**: Modern grotesque (`Plus Jakarta Sans`) for UI, prices, specs, and filters paired with restrained editorial serif (`Playfair Display`) for campaign statements.
- **Tailored Palette Tokens**:
  - Dominant (60%): Off White `#F5F4EF` (paper texture, editorial canvas)
  - Brand Identity (30%): Deep Teal `#0D4F4A` (primary buttons, contrast headlines, dark sections)
  - Selective Accents (10%): Mint `#B8E0D2` (micro-badges, selection rings, progress bars, zero neon)
  - Dark Text: `#172B2A`
  - 1px hairline borders: `#E2DFD6`
- **Quiet Confidence**: Luxury through restraint, tactile weight (240–280 GSM), and single-origin Supima cotton.

---

## Signature Editorial Features

1. **Cinematic Fashion Hero**: Full-bleed portrait photography with staggered typography entrance reveals.
2. **Collection Story**: Editorial magazine alternate compositions (01 / The Foundations, 02 / Architectural Knit).
3. **Fabric Explorer**: Interactive 240 GSM Supima macro weave canvas with four clickable inspection hotspots:
   - `01`: Dense 24-Gauge Knit (24 loops/inch)
   - `02`: Combed Supima Hand-Feel (35% longer staple)
   - `03`: Natural Breathability (100% cellulose)
   - `04`: Pre-Shrunk Bio-Finish (<1.5% shrinkage)
4. **Craft Details in Focus**: Macro photography of reinforced double-rib collar, twin-needle stitching, herringbone shoulder tape, and heat-pressed atelier stamp.
5. **The Ravetto Thread**: Vertical storytelling timeline linking *MATERIAL ➔ FIT ➔ CUT ➔ STITCH ➔ FINISH ➔ RAVETTO* ("Every detail has a purpose.").
6. **Fit Architecture Explorer**: Interactive comparison of Structured Regular, Architectural Oversized, and Tailored Mock with garment diagnostics and real model measurements.
7. **Find Your Ravetto**: Side-by-side comparative matrix covering GSM, silhouette, hand feel, neck construction, and ideal use.
8. **Shop The Look**: Lookbook campaign with interactive garment hotspot pins.
9. **Packaging Story**: "Arrives as intended" unboxing presentation.
10. **Inside Ravetto**: The five foundational garment disciplines.

---

## High-Converting Commerce Engine

- **Product Detail Page (PDP)**: Large split gallery, smooth 350ms color transitions, sticky purchase panel, size guide drawer with flat garment diagram, and mobile sticky buy bar.
- **Quick Shop Drawer**: Rapid variant and size selection directly from catalog cards without navigating away.
- **Cart Drawer**: Side drawer featuring branded empty state (*"YOUR BAG IS QUIET."*), real-time complimentary shipping calculation (*"₹501 AWAY FROM COMPLIMENTARY SHIPPING"*), and subtotal breakdown.
- **Razorpay Checkout**: End-to-end checkout with server-calculated totals, privilege coupon support (`FIRSTRAVETTO`, `ATELIER300`), cryptographic HMAC-SHA256 signature verification, and celebratory confetti.
- **Order Tracking**: Visual status progression stepper (*CONFIRMED ➔ PACKED ➔ SHIPPED ➔ OUT_FOR_DELIVERY ➔ DELIVERED*) with Bluedart Air waybill tracking.
- **Saved Pieces**: Wishlist archive with empty state (*"NOTHING SAVED YET. Pieces worth returning to will appear here."*).
- **Search Overlay**: Global predictive search accessible via `CMD+K` with real-time photography results.
- **Custom Admin Back-Office (`/admin`)**:
  - Live commerce analytics computed directly from database orders (Revenue, Orders, AOV, Low Stock warnings, Top products).
  - Variant Inventory Manager: Live stock level adjustment for any SKU with immediate database updates.
  - Order Dispatch Console: Real-time status update stepper.

---

## Technology Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Brand Tokens
- **Motion**: Framer Motion
- **State Management**: Zustand
- **Server Cache**: TanStack Query
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js + Express.js + TypeScript
- **Architecture**: Modular Layered (Routes, Controllers, Services, Repositories, Middleware)
- **Security**: Helmet, CORS, Cookie-Parser, Rate Limiting, HTTP-only JWT
- **ORM**: Prisma ORM
- **Database**: Relational Database with SQLite/PostgreSQL dual-adapter compatibility
- **Payment Gateway**: Razorpay (Order creation + Webhook/Signature verification)

---

## Project Structure

```
ravetto/
├── client/                     # Vite + React + TypeScript Frontend
│   ├── src/
│   │   ├── api/                # API client & endpoints
│   │   ├── components/         # UI primitives, layout & commerce blocks
│   │   ├── features/           # Signature editorial modules
│   │   ├── pages/              # Routes: Shop, Collections, PDP, Cart, Checkout, Admin, etc.
│   │   ├── stores/             # Zustand stores (Cart, Auth, Saved, UI)
│   │   └── types/              # TypeScript contracts
│   ├── index.html
│   └── tailwind.config.js
│
├── server/                     # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/             # Environment config
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Auth, Role, Guest Session, Error handlers
│   │   ├── routes/             # REST routes (/api/v1/...)
│   │   ├── services/           # Commerce & business logic
│   │   └── server.ts           # Entrypoint
│   └── prisma/
│       ├── schema.prisma       # 21 Relational Entity Models
│       └── seed.ts             # Complete luxury seed dataset
│
├── push-to-github.cjs          # Zero-dependency Git automation script
├── package.json                # Root orchestration scripts
└── README.md
```

---

## Getting Started Locally

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies & generate database
cd server && npm install && npx prisma db push && npx tsx prisma/seed.ts && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### 2. Start Servers
```bash
# Start backend server (Port 5001)
npm run dev:server

# Start Vite client dev server (Port 5173)
npm run dev:client
```

- **Storefront**: [http://localhost:5173](http://localhost:5173)
- **API Base**: [http://localhost:5001/api/v1](http://localhost:5001/api/v1)
- **Admin Console**: [http://localhost:5173/admin](http://localhost:5173/admin)

---

## Pre-Configured Accounts

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Atelier Admin** | `admin@ravetto.com` | `ravettoAdmin2026!` | Storefront + `/admin` Console |
| **Demo Client** | `client@ravetto.com` | `ravettoCustomer2026!` | Storefront + Order History |

---

## License

© 2026 RAVETTO ATELIER. All rights reserved.
