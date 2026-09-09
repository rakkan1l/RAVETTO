/**
 * RAVETTO Atelier Theme JavaScript
 * Implements: Quick Shop, Cart Drawer, Fabric Magnifier, Ravetto Thread, Sticky Buy Bar, Size Guide
 */

document.addEventListener('DOMContentLoaded', () => {
  initFabricExplorer();
  initRavettoThread();
  initCartDrawer();
  initQuickShop();
  initStickyMobileBar();
  initSearchShortcut();
});

// 1. FABRIC EXPLORER CURSOR MAGNIFIER & HOTSPOTS
function initFabricExplorer() {
  const container = document.querySelector('.fabric-canvas-container');
  const magnifier = document.querySelector('.fabric-magnifier');
  const macroImg = document.querySelector('.fabric-macro-img');

  if (!container || !magnifier || !macroImg) return;

  container.addEventListener('mouseenter', () => {
    magnifier.style.display = 'block';
    magnifier.style.backgroundImage = `url(${macroImg.src})`;
    magnifier.style.backgroundSize = '300%';
  });

  container.addEventListener('mouseleave', () => {
    magnifier.style.display = 'none';
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    magnifier.style.left = `${x}px`;
    magnifier.style.top = `${y}px`;

    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    magnifier.style.backgroundPosition = `${bgX}% ${bgY}%`;
  });
}

// 2. RAVETTO THREAD SCROLL STORY
function initRavettoThread() {
  const section = document.querySelector('.ravetto-thread-section');
  const activeLine = document.querySelector('.thread-active-line');
  const nodes = document.querySelectorAll('.thread-stage-node');

  if (!section || !activeLine) return;

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;

    const start = windowH * 0.75;
    const end = -rect.height + windowH * 0.25;
    const current = rect.top;

    const progress = Math.min(Math.max((start - current) / (start - end), 0), 1);
    activeLine.style.height = `${progress * 94}%`;

    const activeIndex = Math.min(nodes.length - 1, Math.floor(progress * nodes.length));
    nodes.forEach((node, idx) => {
      if (idx <= activeIndex) {
        node.classList.add('is-active');
      } else {
        node.classList.remove('is-active');
      }
    });
  }, { passive: true });
}

// 3. CART DRAWER & AJAX FREE SHIPPING
function initCartDrawer() {
  const cartDrawer = document.getElementById('CartDrawer');
  const openButtons = document.querySelectorAll('[data-open-cart]');
  const closeButtons = document.querySelectorAll('[data-close-cart]');

  if (!cartDrawer) return;

  const openCart = () => cartDrawer.classList.add('is-open');
  const closeCart = () => cartDrawer.classList.remove('is-open');

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  }));

  closeButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeCart();
  }));

  // Close on backdrop click
  cartDrawer.querySelector('.drawer-backdrop')?.addEventListener('click', closeCart);
}

// 4. QUICK SHOP DRAWER
function initQuickShop() {
  const quickShopDrawer = document.getElementById('QuickShopDrawer');
  const triggers = document.querySelectorAll('[data-quick-shop-btn]');
  const closeButtons = document.querySelectorAll('[data-close-quick-shop]');

  if (!quickShopDrawer) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productHandle = btn.getAttribute('data-product-handle');
      openQuickShopProduct(productHandle);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      quickShopDrawer.classList.remove('is-open');
    });
  });

  quickShopDrawer.querySelector('.drawer-backdrop')?.addEventListener('click', () => {
    quickShopDrawer.classList.remove('is-open');
  });
}

function openQuickShopProduct(handle) {
  const quickShopDrawer = document.getElementById('QuickShopDrawer');
  if (!quickShopDrawer) return;

  quickShopDrawer.classList.add('is-open');
  // Fetch product JSON from Shopify
  fetch(`/products/${handle}.js`)
    .then(res => res.json())
    .then(product => {
      const titleEl = quickShopDrawer.querySelector('[data-qs-title]');
      const priceEl = quickShopDrawer.querySelector('[data-qs-price]');
      const imgEl = quickShopDrawer.querySelector('[data-qs-img]');
      const idInput = quickShopDrawer.querySelector('[name="id"]');
      const detailsLink = quickShopDrawer.querySelector('[data-qs-details-link]');

      if (titleEl) titleEl.textContent = product.title;
      if (priceEl) priceEl.textContent = (product.price / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
      if (imgEl && product.featured_image) imgEl.src = product.featured_image;
      if (idInput && product.variants[0]) idInput.value = product.variants[0].id;
      if (detailsLink) detailsLink.href = `/products/${handle}`;
    })
    .catch(err => console.error('Quick shop error:', err));
}

// 5. STICKY MOBILE BUY BAR
function initStickyMobileBar() {
  const stickyBar = document.getElementById('StickyMobileBuyBar');
  const mainBuyBtn = document.querySelector('[data-main-add-to-cart]');

  if (!stickyBar || !mainBuyBtn) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyBar.style.display = 'flex';
      } else {
        stickyBar.style.display = 'none';
      }
    });
  }, { threshold: 0.1 });

  observer.observe(mainBuyBtn);
}

// 6. SEARCH SHORTCUT (CMD+K / CTRL+K)
function initSearchShortcut() {
  const searchModal = document.getElementById('SearchModal');
  const searchTrigger = document.querySelector('[data-open-search]');

  const toggleSearch = () => {
    if (!searchModal) return;
    searchModal.classList.toggle('is-open');
    if (searchModal.classList.contains('is-open')) {
      searchModal.querySelector('input')?.focus();
    }
  };

  searchTrigger?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSearch();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      toggleSearch();
    }
    if (e.key === 'Escape' && searchModal?.classList.contains('is-open')) {
      searchModal.classList.remove('is-open');
    }
  });

  searchModal?.querySelector('.drawer-backdrop')?.addEventListener('click', () => {
    searchModal.classList.remove('is-open');
  });
}
