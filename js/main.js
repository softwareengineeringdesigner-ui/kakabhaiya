/**
 * ==========================================================================
 * KAKA BHAIYA BBQ - Main JavaScript Engine
 * Complete interactive suite: 3D Runway Lookbook, Cart, Filters, Animations
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Preloader Handling
  // ------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 350);
    });
    // Fallback if load already fired
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 1500);
  }

  // ------------------------------------------------------------------------
  // 2. Toast Notification System
  // ------------------------------------------------------------------------
  window.showToast = function (message, icon = 'bi-check-circle-fill', isError = false) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'bbq-toast';
    toast.style.cssText = `
      background: ${isError ? '#B91C1C' : '#1F1B1A'};
      color: #FFFFFF;
      padding: 12px 20px;
      border-radius: 9999px;
      font-family: var(--font-heading, sans-serif);
      font-size: 0.95rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.15);
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: auto;
    `;

    toast.innerHTML = `<i class="bi ${icon}" style="color: ${isError ? '#FECACA' : '#FF541E'}; font-size: 1.2rem;"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(15px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };

  // ------------------------------------------------------------------------
  // 3. Shopping Cart System (localStorage Persistent Engine)
  // ------------------------------------------------------------------------
  const CART_KEY = 'kaka_bbq_cart';

  function getCart() {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Cart parse error:', e);
      return [];
    }
  }
  window.getCart = getCart;

  // --------------------------------------------------------------------------
  // AUTHENTIC SIDES & REFRESHMENTS (Naan, Roti, Paratha, Cold Drinks, Raita, Salad)
  // Direct from Official Kaka Bhaiya Dining & Exclusive Deals Menu
  // --------------------------------------------------------------------------
  const AUTHENTIC_SIDES = [
    {
      id: 'side_sada_naan',
      name: 'Fresh Naan',
      price: 40,
      category: 'Sides Items & Drinks',
      desc: 'Fluffy golden clay oven fresh tandoori naan',
      image: 'images/dishes/sada_naan.jpg',
      badge: 'Live Tandoor'
    },
    {
      id: 'side_sada_roti',
      name: 'Roti',
      price: 30,
      category: 'Sides Items & Drinks',
      desc: 'Hot fresh clay oven tandoori wholewheat roti',
      image: 'images/dishes/sada_roti.jpg',
      badge: 'Live Tandoor'
    },
    {
      id: 'side_malwari_paratha',
      name: 'Paratha',
      price: 150,
      category: 'Sides Items & Drinks',
      desc: 'Crisp, golden multi-layered tawa flaky paratha',
      image: 'images/dishes/malwari_paratha.jpg',
      badge: 'Chef Special'
    },
    {
      id: 'side_raita',
      name: 'Zeera Raita',
      price: 60,
      category: 'Sides Items & Drinks',
      desc: 'Chilled cumin & fresh mint curd',
      image: 'images/dishes/raita_imli_sauce.jpg',
      badge: 'Chilled'
    },
    {
      id: 'side_fresh_salad',
      name: 'Fresh Salad',
      price: 150,
      category: 'Sides Items & Drinks',
      desc: 'Crisp onion rings, sliced cucumbers & lemon platter',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80',
      badge: 'Farm Fresh'
    },
    {
      id: 'side_imli_sauce',
      name: 'Imli Sauce',
      price: 60,
      category: 'Sides Items & Drinks',
      desc: 'Sweet & tangy tamarind dipping chutney',
      image: 'images/dishes/raita_imli_sauce.jpg',
      badge: 'Signature'
    },
    {
      id: 'side_cold_drink',
      name: 'Cold Drink (500 ml)',
      price: 200,
      category: 'Sides Items & Drinks',
      desc: 'Chilled 500ml cold drink pet bottle',
      image: 'images/dishes/bottle_500ml.png',
      badge: 'Chilled'
    }
  ];
  window.AUTHENTIC_SIDES = AUTHENTIC_SIDES;

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Cart save error:', e);
    }
    updateCartBadges();
    renderOffcanvasCart();
    renderOrderPageCart();
    updateFloatingCartBar();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
  }
  window.saveCart = saveCart;

  function updateCartBadges() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

    // Update all badge elements across desktop navbar, mobile topbar, drawers, and floating bars
    document.querySelectorAll('.cart-badge, #cartCountBadge, .cart-badge-count, .drawer-cart-count-badge, .floating-cart-count').forEach(badge => {
      badge.textContent = count;
      if (badge.classList.contains('cart-badge') || badge.id === 'cartCountBadge') {
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
      }
    });

    // Update drawer item count text
    document.querySelectorAll('.drawer-cart-count-badge').forEach(badge => {
      badge.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    });
  }
  window.updateCartBadges = updateCartBadges;

  function animateCartBadges() {
    document.querySelectorAll('.cart-badge, .nav-cart-btn, .btn-cart-nav').forEach(el => {
      el.classList.remove('cart-bounce-pop');
      void el.offsetWidth; // Trigger reflow to restart animation
      el.classList.add('cart-bounce-pop');
      setTimeout(() => el.classList.remove('cart-bounce-pop'), 550);
    });
  }
  window.animateCartBadges = animateCartBadges;

  window.openCartDrawer = function () {
    const drawerEl = document.getElementById('offcanvasCart') || document.getElementById('cartDrawer');
    if (drawerEl && typeof bootstrap !== 'undefined') {
      const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
      bsDrawer.show();
    }
  };

  window.addToCart = function (product, triggerBtn = null) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        portion: product.portion || '',
        price: Number(product.price) || 0,
        image: product.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80',
        category: product.category || 'BBQ Special',
        quantity: 1
      });
    }

    saveCart(cart);
    animateCartBadges();

    // Button visual feedback if clicked directly
    if (triggerBtn) {
      const origHtml = triggerBtn.innerHTML;
      triggerBtn.classList.add('btn-added-state');
      triggerBtn.innerHTML = '<i class="bi bi-check2-circle me-1"></i> Added!';
      setTimeout(() => {
        triggerBtn.classList.remove('btn-added-state');
        triggerBtn.innerHTML = origHtml;
      }, 1200);
    }

    // Interactive Toast Notification with View Cart Action
    window.showToast(`
      <div class="d-flex align-items-center justify-content-between gap-3 w-100">
        <span>Added <strong>${product.name}</strong> to cart!</span>
        <button class="btn btn-sm btn-dark text-warning border-0 px-2 py-1 fw-bold rounded-pill text-nowrap" style="font-size:0.75rem;" onclick="openCartDrawer()">View Cart</button>
      </div>
    `, 'bi-bag-check-fill');
  };

  window.updateCartItemQty = function (id, delta) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity = (Number(cart[itemIndex].quantity) || 1) + delta;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
    saveCart(cart);
    animateCartBadges();
  };

  window.removeCartItem = function (id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    window.showToast('Item removed from cart', 'bi-trash3-fill');
  };

  window.clearWholeCart = function () {
    localStorage.removeItem(CART_KEY);
    updateCartBadges();
    renderOffcanvasCart();
    renderOrderPageCart();
    updateFloatingCartBar();
    window.showToast('Cart cleared', 'bi-cart-x');
  };

  function updateFloatingCartBar() {
    const bar = document.getElementById('floating-mobile-cart-bar');
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);

    document.body.classList.toggle('has-cart-bar', count > 0);

    if (!bar) return;

    if (count > 0) {
      bar.style.display = 'block';
      const totalEl = document.getElementById('floating-cart-total');
      if (totalEl) totalEl.textContent = `PKR ${total.toLocaleString()}`;
      bar.querySelectorAll('.cart-badge-count').forEach(el => el.textContent = count);
      const itemsLabel = bar.querySelector('.floating-cart-items-text');
      if (itemsLabel) {
        itemsLabel.innerHTML = `<span class="cart-badge-count">${count}</span> ${count === 1 ? 'item' : 'items'} in Cart`;
      }
    } else {
      bar.style.display = 'none';
    }
  }
  window.updateFloatingCartBar = updateFloatingCartBar;

  // Render Offcanvas Cart Drawer
  function renderOffcanvasCart() {
    const cart = getCart();
    let total = 0;
    let itemCount = 0;
    cart.forEach(item => {
      const qty = Number(item.quantity) || 1;
      total += (Number(item.price) || 0) * qty;
      itemCount += qty;
    });

    // 1. Standard Drawer (index, menu, etc.)
    const container = document.getElementById('offcanvas-cart-items');
    const totalEl = document.getElementById('offcanvas-cart-total');
    const footerEl = document.getElementById('offcanvas-cart-footer');
    const waBtn = document.getElementById('cart-drawer-whatsapp-btn');

    if (container) {
      if (cart.length === 0) {
        container.innerHTML = `
          <div class="text-center py-5 px-3">
            <div style="font-size: 3.5rem; color: #D1D5DB; margin-bottom: 1rem;">
              <i class="bi bi-basket3"></i>
            </div>
            <h5 style="font-weight: 700; color: var(--color-charcoal);">Your Cart is Hungry!</h5>
            <p class="text-muted" style="font-size: 0.9rem;">Add some mouth-watering charcoal grilled BBQ dishes to start your feast.</p>
            <a href="menu.html" class="btn btn-outline-fire mt-2" data-bs-dismiss="offcanvas">Explore Menu</a>
          </div>
        `;
        if (footerEl) footerEl.style.display = 'none';
      } else {
        if (footerEl) footerEl.style.display = 'block';
        let html = '';
        cart.forEach(item => {
          const itemTotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);
          html += `
            <div class="cart-item-row">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='images/logo.jpg'">
              <div class="cart-item-info">
                <h6 class="cart-item-title">${item.name}</h6>
                <div class="cart-item-price">PKR ${(Number(item.price) || 0).toLocaleString()} <span class="text-muted fw-normal" style="font-size:0.75rem;">x ${item.quantity || 1}</span></div>
                <small class="text-muted fw-semibold">Subtotal: PKR ${itemTotal.toLocaleString()}</small>
              </div>
              <div class="cart-qty-ctrl">
                <button class="cart-qty-btn" onclick="updateCartItemQty('${item.id}', -1)" aria-label="Decrease">&minus;</button>
                <span class="cart-qty-val">${item.quantity || 1}</span>
                <button class="cart-qty-btn" onclick="updateCartItemQty('${item.id}', 1)" aria-label="Increase">&#43;</button>
              </div>
              <button class="btn btn-sm text-danger p-1 ms-2" onclick="removeCartItem('${item.id}')" title="Remove" aria-label="Remove item">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          `;
        });
        // Curated Sides & Drinks Quick-Add Strip inside Cart Drawer
        const drawerQuickSides = [
          { id: 'side_sada_naan', name: 'Sada Naan', price: 40, image: 'images/dishes/sada_naan.jpg' },
          { id: 'side_sada_roti', name: 'Sada Roti', price: 30, image: 'images/dishes/sada_roti.jpg' },
          { id: 'side_malwari_paratha', name: 'Malwari Paratha', price: 150, image: 'images/dishes/malwari_paratha.jpg' },
          { id: 'side_bottle_250', name: 'Cold Drink (250ml)', price: 120, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80' },
          { id: 'side_raita_imli', name: 'Raita & Imli', price: 120, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=80' }
        ];

        html += `
          <div class="cart-drawer-sides-box mt-3 pt-3 border-top">
            <div class="d-flex justify-content-between align-items-center mb-2 px-1">
              <span class="small fw-bold text-charcoal">
                <i class="bi bi-basket-fill text-warning me-1"></i> Add Hot Naan, Roti &amp; Drinks:
              </span>
              <span class="badge bg-fire-subtle text-fire border-0" style="font-size:0.68rem;">Essential</span>
            </div>
            <div class="cart-drawer-sides-scroll d-flex gap-2 pb-2 overflow-x-auto">
        `;

        drawerQuickSides.forEach(s => {
          html += `
            <div class="cart-drawer-side-chip d-flex align-items-center gap-2 p-1 pe-2 bg-light rounded-3 border flex-shrink-0" style="min-width: 150px;">
              <img src="${s.image}" alt="${s.name}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover;" onerror="this.src='images/logo.jpg'">
              <div class="flex-grow-1 min-w-0" style="font-size: 0.75rem;">
                <strong class="d-block text-truncate text-charcoal">${s.name}</strong>
                <span class="text-fire fw-bold">PKR ${s.price}</span>
              </div>
              <button class="btn btn-sm btn-outline-bbq p-0 rounded-circle btn-quick-add-side"
                data-id="${s.id}" data-name="${s.name}" data-price="${s.price}" data-image="${s.image}" data-category="Sides Items & Drinks"
                style="width: 24px; height: 24px; font-size: 0.75rem; display: inline-flex; align-items: center; justify-content: center;"
                title="Add ${s.name}">
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;

        container.innerHTML = html;
        if (totalEl) totalEl.textContent = `PKR ${total.toLocaleString()}`;

        // Generate prefilled WhatsApp Order Message
        if (waBtn) {
          let msg = `*Assalam-o-Alaikum Kaka Bhaiya BBQ!*\nI would like to place an order:\n\n`;
          cart.forEach((it, idx) => {
            const lineTotal = (Number(it.price) || 0) * (Number(it.quantity) || 1);
            msg += `${idx + 1}. *${it.name}* x ${it.quantity} = PKR ${lineTotal.toLocaleString()}\n`;
          });
          msg += `\n*Subtotal:* PKR ${total.toLocaleString()}`;
          msg += `\n*Delivery Address:* [Please write your address here]`;
          waBtn.href = `https://wa.me/923228019941?text=${encodeURIComponent(msg)}`;
        }
      }
    }

    // 2. Product Detail Page Drawer (#cartItemsList)
    const productDrawerList = document.getElementById('cartItemsList');
    const productSubtotal = document.getElementById('cartSubtotalText');
    const productTotalBtn = document.getElementById('cartTotalBtn');
    if (productDrawerList) {
      if (cart.length === 0) {
        productDrawerList.innerHTML = `
          <div class="text-center py-5">
            <div style="font-size: 3rem; color: #D1D5DB; margin-bottom: 0.75rem;"><i class="bi bi-basket3"></i></div>
            <h6 class="fw-bold text-charcoal">Your Feast Cart is Hungry!</h6>
            <p class="text-muted small">Select your favorite dishes & sides above!</p>
          </div>
        `;
        if (productSubtotal) productSubtotal.textContent = 'PKR 0';
        if (productTotalBtn) productTotalBtn.textContent = 'PKR 0';
      } else {
        let phtml = '';
        cart.forEach(item => {
          phtml += `
            <div class="d-flex align-items-center justify-content-between py-2 border-bottom">
              <div class="d-flex align-items-center gap-2">
                <img src="${item.image}" alt="${item.name}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px;">
                <div>
                  <h6 class="mb-0 small fw-bold text-charcoal">${item.name}</h6>
                  <small class="text-fire fw-bold">PKR ${item.price.toLocaleString()} x ${item.quantity || 1}</small>
                </div>
              </div>
              <div class="d-flex align-items-center gap-1">
                <button class="btn btn-sm btn-light border py-0 px-2" onclick="updateCartItemQty('${item.id}', -1)">&minus;</button>
                <span class="small fw-bold px-1">${item.quantity || 1}</span>
                <button class="btn btn-sm btn-light border py-0 px-2" onclick="updateCartItemQty('${item.id}', 1)">&#43;</button>
                <button class="btn btn-sm text-danger p-0 ms-2" onclick="removeCartItem('${item.id}')"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          `;
        });
        productDrawerList.innerHTML = phtml;
        if (productSubtotal) productSubtotal.textContent = `PKR ${total.toLocaleString()}`;
        if (productTotalBtn) productTotalBtn.textContent = `PKR ${total.toLocaleString()}`;
      }
    }
  }
  window.renderOffcanvasCart = renderOffcanvasCart;

  // Render Dedicated Order / Cart Page
  function renderOrderPageCart() {
    const tableBody = document.getElementById('order-page-cart-tbody');
    const mobileContainer = document.getElementById('order-page-cart-mobile');
    const emptyMsg = document.getElementById('order-page-empty-msg');
    const orderWrapper = document.getElementById('order-page-content-wrap');
    const subtotalEl = document.getElementById('order-summary-subtotal');
    const discountEl = document.getElementById('order-summary-discount');
    const deliveryFeeEl = document.getElementById('order-summary-delivery');
    const grandTotalEl = document.getElementById('order-summary-grandtotal');

    if (!tableBody && !mobileContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (orderWrapper) orderWrapper.style.display = 'none';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';
    if (orderWrapper) orderWrapper.style.display = 'flex';

    let subtotal = 0;
    let tableHtml = '';
    let mobileHtml = '';

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      // Desktop table row (>= 768px)
      tableHtml += `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-3">
              <img src="${item.image}" alt="${item.name}" style="width: 55px; height: 55px; border-radius: 8px; object-fit: cover; flex-shrink: 0;">
              <div>
                <strong style="font-family: var(--font-heading); color: var(--color-charcoal); display: block;">${item.name}</strong>
                <small class="d-block text-muted">${item.category}</small>
              </div>
            </div>
          </td>
          <td class="align-middle fw-semibold text-nowrap">PKR ${item.price.toLocaleString()}</td>
          <td class="align-middle">
            <div class="cart-qty-ctrl" style="width: 100px;">
              <button class="cart-qty-btn" onclick="updateCartItemQty('${item.id}', -1)" aria-label="Decrease quantity">&minus;</button>
              <span class="cart-qty-val">${item.quantity}</span>
              <button class="cart-qty-btn" onclick="updateCartItemQty('${item.id}', 1)" aria-label="Increase quantity">&#43;</button>
            </div>
          </td>
          <td class="align-middle fw-bold text-dark text-nowrap">PKR ${itemTotal.toLocaleString()}</td>
          <td class="align-middle text-end">
            <button class="btn btn-sm text-danger p-1" onclick="removeCartItem('${item.id}')" aria-label="Remove item" title="Remove item">
              <i class="bi bi-trash3 fs-5"></i>
            </button>
          </td>
        </tr>
      `;

      // Mobile card item (< 768px)
      mobileHtml += `
        <div class="order-mobile-cart-card p-3 mb-3 bg-light rounded-4 border">
          <div class="d-flex align-items-start gap-3 mb-2">
            <img src="${item.image}" alt="${item.name}" style="width: 58px; height: 58px; border-radius: 10px; object-fit: cover; flex-shrink: 0;">
            <div class="flex-grow-1 min-w-0">
              <strong class="d-block text-charcoal text-truncate fs-6" style="font-family: var(--font-heading);">${item.name}</strong>
              <small class="text-muted d-block">${item.category}</small>
              <div class="small mt-1 text-muted">Price: <span class="fw-bold text-dark">PKR ${item.price.toLocaleString()}</span></div>
            </div>
            <button class="btn btn-sm text-danger p-1 flex-shrink-0" onclick="removeCartItem('${item.id}')" aria-label="Remove item" title="Remove item">
              <i class="bi bi-trash3 fs-5"></i>
            </button>
          </div>
          <div class="d-flex justify-content-between align-items-center pt-2 mt-2 border-top border-secondary-subtle">
            <div class="d-flex align-items-center gap-2">
              <span class="small text-muted fw-semibold">Qty:</span>
              <div class="cart-qty-ctrl" style="width: 100px;">
                <button class="cart-qty-btn" onclick="updateCartItemQty('${item.id}', -1)" aria-label="Decrease">&minus;</button>
                <span class="cart-qty-val">${item.quantity}</span>
                <button class="cart-qty-btn" onclick="updateCartItemQty('${item.id}', 1)" aria-label="Increase">&#43;</button>
              </div>
            </div>
            <div class="text-end">
              <span class="small text-muted d-block" style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em;">Subtotal</span>
              <strong class="text-fire fw-bold" style="font-size: 1.05rem;">PKR ${itemTotal.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      `;
    });

    if (tableBody) tableBody.innerHTML = tableHtml;
    if (mobileContainer) mobileContainer.innerHTML = mobileHtml;

    // Render Order Page Sides Grid (#order-page-sides-grid)
    const orderSidesGrid = document.getElementById('order-page-sides-grid');
    if (orderSidesGrid) {
      let sidesHtml = '';
      AUTHENTIC_SIDES.forEach(side => {
        sidesHtml += `
          <div class="col-6 col-sm-4 col-md-3">
            <div class="order-side-card h-100 p-2 p-sm-3 bg-white rounded-3 border text-center d-flex flex-column justify-content-between shadow-xs">
              <div class="position-relative mb-2">
                <img src="${side.image}" alt="${side.name}" class="rounded-2 w-100" style="height: 95px; object-fit: cover;" onerror="this.src='images/logo.jpg'">
                <span class="badge bg-dark bg-opacity-75 text-white position-absolute top-0 start-0 m-1" style="font-size: 0.65rem;">${side.badge || 'Essential'}</span>
              </div>
              <div class="flex-grow-1 mb-2">
                <strong class="d-block text-charcoal" style="font-size: 0.88rem; line-height: 1.2;">${side.name}</strong>
                <span class="text-fire fw-bold d-block mt-1" style="font-size: 0.95rem;">PKR ${side.price.toLocaleString()}</span>
              </div>
              <button type="button" class="btn btn-sm btn-outline-bbq w-100 btn-quick-add-side py-1 fw-bold"
                data-id="${side.id}"
                data-name="${side.name}"
                data-price="${side.price}"
                data-image="${side.image}"
                data-category="${side.category}">
                <i class="bi bi-plus-lg"></i> Add
              </button>
            </div>
          </div>
        `;
      });
      orderSidesGrid.innerHTML = sidesHtml;
    }

    // Delivery Fee calculation: Free above PKR 2500, else PKR 200
    const deliveryType = document.querySelector('input[name="orderType"]:checked')?.value || 'delivery';
    const deliveryFee = deliveryType === 'dinein' ? 0 : (subtotal >= 2500 ? 0 : 200);

    // Check applied coupon discount
    const discountCode = window.appliedPromoCode || null;
    let discount = 0;
      if (discountCode === 'KAKABBQ') {
        discount = Math.round(subtotal * 0.10);
      }



    const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

    if (subtotalEl) subtotalEl.textContent = `PKR ${subtotal.toLocaleString()}`;
    if (deliveryFeeEl) deliveryFeeEl.textContent = deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`;
    if (discountEl) discountEl.textContent = `- PKR ${discount.toLocaleString()}`;
    if (grandTotalEl) grandTotalEl.textContent = `PKR ${grandTotal.toLocaleString()}`;
  }

  // ------------------------------------------------------------------------
  // DYNAMIC PORTION SELECTOR & SIDE ITEMS INTERACTION (menu.html & Cards)
  // ------------------------------------------------------------------------

  // A. Portion button click on dish cards
  document.addEventListener('click', (e) => {
    const portionBtn = e.target.closest('.portion-btn');
    if (portionBtn) {
      const card = portionBtn.closest('.dish-card, .menu-dish-card');
      if (card) {
        e.preventDefault();
        const group = portionBtn.closest('.portion-btn-group');
        if (group) {
          group.querySelectorAll('.portion-btn').forEach(b => b.classList.remove('active'));
        }
        portionBtn.classList.add('active');

        const newPortion = portionBtn.dataset.portion;
        const newPortionPrice = Number(portionBtn.dataset.price) || 0;

        // Sum active side chips in this card
        const activeChips = Array.from(card.querySelectorAll('.side-chip.active'));
        const sidesTotal = activeChips.reduce((sum, chip) => sum + (Number(chip.dataset.price) || 0), 0);

        // Update card price display
        const priceValEl = card.querySelector('.price-val');
        if (priceValEl) {
          priceValEl.textContent = (newPortionPrice + sidesTotal).toLocaleString();
        }

        // Update card Add to Cart button attributes
        const addBtn = card.querySelector('.btn-add-cart');
        if (addBtn) {
          addBtn.dataset.portion = newPortion;
          addBtn.dataset.basePrice = newPortionPrice;
          addBtn.dataset.price = newPortionPrice + sidesTotal;
        }
      }
    }
  });

  // B. Side item chips toggle on dish cards
  document.addEventListener('click', (e) => {
    const sideChip = e.target.closest('.side-chip');
    if (sideChip) {
      const card = sideChip.closest('.dish-card, .menu-dish-card');
      if (card) {
        e.preventDefault();
        sideChip.classList.toggle('active');

        const activePortionBtn = card.querySelector('.portion-btn.active');
        const addBtn = card.querySelector('.btn-add-cart');
        const basePrice = activePortionBtn 
          ? (Number(activePortionBtn.dataset.price) || 0)
          : (addBtn ? (Number(addBtn.dataset.basePrice) || Number(addBtn.dataset.price) || 0) : 0);

        const activeChips = Array.from(card.querySelectorAll('.side-chip.active'));
        const sidesTotal = activeChips.reduce((sum, chip) => sum + (Number(chip.dataset.price) || 0), 0);

        // Update card price display
        const priceValEl = card.querySelector('.price-val');
        if (priceValEl) {
          priceValEl.textContent = (basePrice + sidesTotal).toLocaleString();
        }

        // Update Add to Cart button attributes
        if (addBtn) {
          addBtn.dataset.price = basePrice + sidesTotal;
          addBtn.dataset.selectedSides = JSON.stringify(activeChips.map(c => ({
            id: c.dataset.id,
            name: c.dataset.name,
            price: Number(c.dataset.price)
          })));
        }
      }
    }
  });

  // C. Setup click listeners on all .btn-add-cart buttons
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.btn-add-cart, .btn-rail-add, .btn-quick-add-side, .btn-side-add');
    if (addBtn) {
      e.preventDefault();
      const rawId = addBtn.dataset.id || ('dish_' + Math.random().toString(36).substr(2, 9));
      const baseName = addBtn.dataset.name || 'Signature BBQ Dish';
      const portion = addBtn.dataset.portion || '';
      const basePrice = Number(addBtn.dataset.basePrice) || Number(addBtn.dataset.price) || 1200;
      const image = addBtn.dataset.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80';
      const category = addBtn.dataset.category || 'BBQ';

      // Ensure portion is clearly indicated in the item title
      const displayName = (portion && !baseName.toLowerCase().includes(portion.toLowerCase()))
        ? `${baseName} (${portion})`
        : baseName;

      const cartItemId = portion 
        ? `${rawId}_${portion.replace(/[^a-zA-Z0-9]/g, '_')}`
        : rawId;

      addToCart({
        id: cartItemId,
        name: displayName,
        portion: portion,
        price: basePrice,
        image: image,
        category: category
      }, addBtn);

      // Add selected side items as separate cart lines if checked on the card
      if (addBtn.dataset.selectedSides) {
        try {
          const selectedSides = JSON.parse(addBtn.dataset.selectedSides);
          if (Array.isArray(selectedSides) && selectedSides.length > 0) {
            selectedSides.forEach(side => {
              addToCart({
                id: side.id,
                name: side.name,
                price: Number(side.price),
                image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80',
                category: 'Sides & Accompaniments'
              });
            });
          }
        } catch (err) {
          console.error('Error parsing selected sides:', err);
        }
      }
    }
  });

  // Initialize badges and cart states immediately
  updateCartBadges();
  renderOffcanvasCart();
  renderOrderPageCart();
  updateFloatingCartBar();

  // ------------------------------------------------------------------------
  // 4. RUNWAY LOOKBOOK SECTION (3D Receding Line Engine)
  // ------------------------------------------------------------------------
  const runwayStage = document.getElementById('runway-stage');
  const runwayCards = document.querySelectorAll('.runway-card');
  const runwayDotsContainer = document.getElementById('runway-dots');
  const activeTitleEl = document.getElementById('runway-active-title');
  const activeDescEl = document.getElementById('runway-active-desc');
  const activePriceEl = document.getElementById('runway-active-price');
  const activeOrderBtn = document.getElementById('runway-active-order-btn');
  const railTrack = document.getElementById('rail-scroll-track');
  const railActiveNameBadge = document.getElementById('rail-active-name-badge');
  // Runway Lookbook Dish Data & Follow-The-Look Add-on Rails (Matching Authentic Menu)
  const runwayData = [
    {
      id: 'beef_kabab_12',
      title: 'Beef Kabab (12 PC)',
      desc: 'A full dozen prime beef seekh kababs slow-roasted over glowing coals for melting, tender indulgence. 14 secret whole spices.',
      price: 999,
      image: 'images/dishes/bhaiya_special_beef_kabab.png',
      category: 'Beef B.B.Q',
      spice: 'Medium Charcoal',
      rail: [
        { id: 'side_naan', name: 'Sada Naan', price: 40, desc: 'Hot clay oven tandoori naan', image: 'images/dishes/sada_naan.jpg' },
        { id: 'side_raita', name: 'Raita & Imli', price: 120, desc: 'Chilled mint zeera raita and tangy imli chutney', image: 'images/dishes/raita_imli_sauce.jpg' },
        { id: 'side_salad', name: 'Fresh Salad', price: 150, desc: 'Crisp onion rings and cucumber platter', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80' },
        { id: 'side_soda', name: 'Lemon Soda', price: 200, desc: 'Zesty freshly squeezed lemon soda with mint', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' }
      ]
    },
    {
      id: 'beef_afghani_boti_24',
      title: 'Beef Afghani Boti (24 PC)',
      desc: 'Authentic tribal-style beef boti seasoned lightly with rock salt, cracked black pepper, and tenderized in natural beef fat baste.',
      price: 999,
      image: 'images/dishes/bhaiya_beef_afghani_boti.jpg',
      category: 'Beef B.B.Q',
      spice: 'Medium Charcoal',
      rail: [
        { id: 'side_paratha', name: 'Malwari Paratha', price: 150, desc: 'Crisp flaky multi-layered paratha', image: 'images/dishes/malwari_paratha.jpg' },
        { id: 'side_raita', name: 'Raita & Imli', price: 120, desc: 'Chilled mint zeera raita and tangy imli chutney', image: 'images/dishes/raita_imli_sauce.jpg' },
        { id: 'side_naan', name: 'Sada Naan', price: 40, desc: 'Fresh tandoori naan bread', image: 'images/dishes/sada_naan.jpg' },
        { id: 'side_bottle_500', name: 'Bottle (500 ml)', price: 200, desc: 'Chilled 500ml cold drink', image: 'images/dishes/bottle_500ml.png' }
      ]
    },
    {
      id: 'chicken_malai_boti_24',
      title: 'Chicken Malai Boti (24 PC)',
      desc: 'Twenty-four boneless chicken cubes bathed in rich clotted dairy cream, mild white pepper, and crushed green cardamom, grilled golden.',
      price: 2099,
      image: 'images/dishes/chicken_malai_boti.jpg',
      category: 'Chicken B.B.Q',
      spice: 'Mild & Creamy',
      rail: [
        { id: 'side_naan', name: 'Sada Naan', price: 40, desc: 'Fresh hot clay oven tandoori naan', image: 'images/dishes/sada_naan.jpg' },
        { id: 'side_raita', name: 'Raita & Imli', price: 120, desc: 'Chilled mint zeera raita and tangy imli chutney', image: 'images/dishes/raita_imli_sauce.jpg' },
        { id: 'side_salad', name: 'Fresh Salad', price: 150, desc: 'Crisp onion rings and cucumber platter', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80' },
        { id: 'side_soda', name: 'Lemon Soda', price: 200, desc: 'Zesty freshly squeezed lemon soda with mint', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' }
      ]
    },
    {
      id: 'chicken_tikka_boti_12',
      title: 'Chicken Tikka Boti (12 PC)',
      desc: 'Twelve juicy chicken breast cuts marinated in sour lemon, crushed coriander seeds, and red chili flakes, roasted to perfection on skewers.',
      price: 799,
      image: 'https://images.unsplash.com/photo-1755090154782-5215189b4083?w=600&q=80',
      category: 'Chicken B.B.Q',
      spice: 'Medium Charcoal',
      rail: [
        { id: 'side_paratha', name: 'Malwari Paratha', price: 150, desc: 'Multi-layered flaky paratha', image: 'images/dishes/malwari_paratha.jpg' },
        { id: 'side_naan', name: 'Sada Naan', price: 40, desc: 'Fresh tandoori naan', image: 'images/dishes/sada_naan.jpg' },
        { id: 'side_raita', name: 'Raita & Imli', price: 120, desc: 'Mint zeera raita and imli chutney', image: 'images/dishes/raita_imli_sauce.jpg' },
        { id: 'side_bottle_250', name: 'Regular Bottle (345 ml)', price: 120, desc: 'Chilled cold drink', image: 'images/dishes/regular_bottle_345ml.jpg' }
      ]
    },
    {
      id: 'roll_special_malai',
      title: 'Special Malai Roll',
      desc: 'Jumbo flaky paratha loaded with creamy chicken malai boti, melted garlic cheese drizzle, and house special herb chutney.',
      price: 549,
      image: 'https://images.unsplash.com/photo-1762284513008-08f897ff5041?w=600&q=80',
      category: 'Paratha Rolls',
      spice: 'Mild & Creamy',
      rail: [
        { id: 'side_raita', name: 'Raita & Imli', price: 120, desc: 'Chilled mint zeera raita and tangy imli chutney', image: 'images/dishes/raita_imli_sauce.jpg' },
        { id: 'side_soda', name: 'Lemon Soda', price: 200, desc: 'Zesty lemon soda with black salt and mint', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
        { id: 'side_salad', name: 'Fresh Salad', price: 150, desc: 'Crisp vegetable platter', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80' },
        { id: 'side_bottle_500', name: 'Bottle (500 ml)', price: 200, desc: 'Chilled 500ml cold drink', image: 'images/dishes/bottle_500ml.png' }
      ]
    },
    {
      id: 'fish_grill',
      title: 'Grill Fish',
      desc: 'Seasonal river fish marinated in roasted ajwain, lemon juice, turmeric, and garlic, slow-grilled over acacia charcoal.',
      price: 1580,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
      category: 'Fish (Seasonal)',
      spice: 'Medium Charcoal',
      rail: [
        { id: 'side_naan', name: 'Sada Naan', price: 40, desc: 'Fresh tandoori naan', image: 'images/dishes/sada_naan.jpg' },
        { id: 'side_raita', name: 'Raita & Imli', price: 120, desc: 'Zesty tamarind imli sauce', image: 'images/dishes/raita_imli_sauce.jpg' },
        { id: 'side_salad', name: 'Fresh Salad', price: 150, desc: 'Sliced onion rings with fresh lemon', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80' },
        { id: 'side_bottle_1500', name: 'Bottle (1.5 L)', price: 350, desc: 'Large 1.5L cold drink', image: 'images/dishes/bottle_1500ml.png' }
      ]
    }
  ];

  if (runwayStage && runwayCards.length > 0) {
    let activeIndex = 0;
    const totalDishes = runwayCards.length;
    let autoplayTimer = null;
    let isInteracting = false;

    // Create progress dots
    if (runwayDotsContainer) {
      runwayDotsContainer.innerHTML = '';
      for (let i = 0; i < totalDishes; i++) {
        const dot = document.createElement('button');
        dot.className = `runway-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to dish ${i + 1}`);
        dot.addEventListener('click', () => {
          goToDish(i);
          resetAutoplay();
        });
        runwayDotsContainer.appendChild(dot);
      }
    }

    function updateRunway() {
      // Calculate depth position for each card in the receding line
      runwayCards.forEach((card, idx) => {
        // Calculate offset relative to activeIndex wrapped around
        let offset = idx - activeIndex;
        // Normalize offset to range [-half, half]
        if (offset > Math.floor(totalDishes / 2)) offset -= totalDishes;
        if (offset < -Math.floor(totalDishes / 2)) offset += totalDishes;

        if (offset === 0) {
          card.setAttribute('data-pos', '0');
        } else if (offset === 1) {
          card.setAttribute('data-pos', '1');
        } else if (offset === 2) {
          card.setAttribute('data-pos', '2');
        } else if (offset === -1) {
          card.setAttribute('data-pos', '-1');
        } else if (offset === -2) {
          card.setAttribute('data-pos', '-2');
        } else {
          card.setAttribute('data-pos', 'hidden');
        }
      });

      // Update dots
      if (runwayDotsContainer) {
        const dots = runwayDotsContainer.querySelectorAll('.runway-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIndex);
        });
      }

      // Update Active Dish Info & Products Rail
      const activeData = runwayData[activeIndex] || runwayData[0];
      if (activeTitleEl) {
        activeTitleEl.style.opacity = '0';
        activeTitleEl.style.transform = 'translateY(8px)';
        setTimeout(() => {
          activeTitleEl.textContent = activeData.title;
          activeTitleEl.style.opacity = '1';
          activeTitleEl.style.transform = 'translateY(0)';
        }, 150);
      }

      if (activeDescEl) {
        activeDescEl.style.opacity = '0';
        activeDescEl.style.transform = 'translateY(8px)';
        setTimeout(() => {
          activeDescEl.textContent = activeData.desc;
          activeDescEl.style.opacity = '1';
          activeDescEl.style.transform = 'translateY(0)';
        }, 150);
      }

      if (activePriceEl) {
        activePriceEl.textContent = `PKR ${activeData.price.toLocaleString()}`;
      }
    }

    function goToDish(index) {
      activeIndex = (index + totalDishes) % totalDishes;
      updateRunway();
    }

    function nextDish() {
      goToDish(activeIndex + 1);
    }

    function prevDish() {
      goToDish(activeIndex - 1);
    }

    // Attach click handlers to navigation buttons
    const prevBtn = document.getElementById('runway-prev-btn');
    const nextBtn = document.getElementById('runway-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevDish();
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextDish();
        resetAutoplay();
      });
    }

    if (activeOrderBtn) {
      activeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeData = runwayData[activeIndex] || runwayData[0];
        if (activeData) {
          addToCart({
            id: activeData.id,
            name: activeData.title,
            price: activeData.price,
            image: activeData.image,
            category: activeData.category
          }, activeOrderBtn);
        }
      });
    }

    // Direct card click in the line
    runwayCards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        const dishId = card.getAttribute('data-dish-id') || (runwayData[idx] && runwayData[idx].id) || 'look_shinwari';
        const isCtaClick = e.target.closest('.runway-card-cta');

        // If clicking on active card OR clicking the 'View Details' pill on any card:
        if (idx === activeIndex || isCtaClick) {
          window.location.href = `product.html?id=${dishId}`;
          return;
        }

        // If clicking an inactive card body, rotate it to the front
        goToDish(idx);
        resetAutoplay();
      });

      // Keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const dishId = card.getAttribute('data-dish-id') || (runwayData[idx] && runwayData[idx].id) || 'look_shinwari';
          window.location.href = `product.html?id=${dishId}`;
        }
      });
    });

    // Touch Swipe & Mouse Drag Handling
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    // Touch events
    runwayStage.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isInteracting = true;
      pauseAutoplay();
    }, { passive: true });

    runwayStage.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    }, { passive: true });

    runwayStage.addEventListener('touchend', () => {
      isInteracting = false;
      const diff = endX - startX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) {
          nextDish();
        } else {
          prevDish();
        }
      }
      startX = 0;
      endX = 0;
      resetAutoplay();
    });

    // Mouse events (Desktop Drag)
    runwayStage.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      pauseAutoplay();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      endX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      const diff = endX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          nextDish();
        } else {
          prevDish();
        }
      }
      startX = 0;
      endX = 0;
      resetAutoplay();
    });

    // Keyboard Arrow Keys Support (when runway is visible or focused)
    window.addEventListener('keydown', (e) => {
      // Don't hijack if user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      if (e.key === 'ArrowRight') {
        nextDish();
        resetAutoplay();
      } else if (e.key === 'ArrowLeft') {
        prevDish();
        resetAutoplay();
      }
    });

    // Autoplay Engine
    function startAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        if (!isInteracting) {
          nextDish();
        }
      }, 5500);
    }

    function pauseAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    function resetAutoplay() {
      pauseAutoplay();
      startAutoplay();
    }

    // Pause on stage hover
    runwayStage.addEventListener('mouseenter', pauseAutoplay);
    runwayStage.addEventListener('mouseleave', startAutoplay);

    // Initial setup
    updateRunway();
    startAutoplay();
  }

  // ------------------------------------------------------------------------
  // 5. Hero Ember Particles (Canvas 60fps Animation)
  // ------------------------------------------------------------------------
  const emberCanvas = document.getElementById('hero-embers-canvas');
  if (emberCanvas) {
    const ctx = emberCanvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 36;

    function resizeCanvas() {
      width = emberCanvas.width = emberCanvas.offsetWidth;
      height = emberCanvas.height = emberCanvas.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ember {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.4 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.fade = Math.random() * 0.006 + 0.003;
        // Hue between fire orange (24) and gold (42)
        this.hue = Math.floor(Math.random() * 20 + 20);
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.02) * 0.4;
        this.opacity -= this.fade;
        if (this.opacity <= 0 || this.y < -20) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 95%, 55%, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Ember());
    }

    // Only animate if user does not prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      function animateEmbers() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
        requestAnimationFrame(animateEmbers);
      }
      animateEmbers();
    }
  }

  // ------------------------------------------------------------------------
  // 6. Sticky Navbar Shrink & Active Link Highlight
  // ------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar-bbq');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Highlight current page active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-bbq').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Auto-close mobile navbar when clicking navigation links (except dropdown toggles)
  const navCollapseEl = document.getElementById('navbarContent');
  if (navCollapseEl) {
    navCollapseEl.querySelectorAll('.nav-link-bbq:not(.dropdown-toggle), .dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth < 992 && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapseEl);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 7. Scroll-Reveal Animations (IntersectionObserver)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if observer not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ------------------------------------------------------------------------
  // 8. Animated Counters
  // ------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter-number[data-target]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = `${prefix}${isDecimal ? current.toFixed(1) : Math.floor(current)}${suffix}`;
          }, stepTime);

          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // ------------------------------------------------------------------------
  // 9. Menu Filter & Live Search (menu.html)
  // ------------------------------------------------------------------------
  const menuSearchInput = document.getElementById('menu-search-input');
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuSpiceFilter = document.getElementById('menu-spice-select');
  let menuDishCards = document.querySelectorAll('.menu-dish-col');

  // Extract base product name by removing quantity suffixes e.g. "(6 PC)", "(12 PC)", "6 Pcs", "6pc", "6 PIECES", "(500 ml)", "(1.5 L)"
  function getBaseProductName(title) {
    if (!title) return '';
    return title
      .replace(/\s*\(\s*\d+(?:\.\d+)?\s*(?:pc|pcs|pieces|ml|l|litre|litres)\s*\)/gi, '')
      .replace(/\s+\d+(?:\.\d+)?\s*(?:pc|pcs|pieces)$/gi, '')
      .trim();
  }

  // Deduplicate and group menu cards on Menu page (Requirement 1, 2, 3)
  function groupMenuCards() {
    const container = document.getElementById('menu-cards-container');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.menu-dish-col'));
    if (!cards.length) return;

    const groups = new Map();

    cards.forEach(card => {
      const titleEl = card.querySelector('.dish-title');
      const rawTitle = titleEl ? titleEl.textContent.trim() : '';
      const baseName = getBaseProductName(rawTitle);

      if (!groups.has(baseName)) {
        groups.set(baseName, []);
      }
      groups.get(baseName).push({ card, rawTitle, baseName });
    });

    groups.forEach((items, baseName) => {
      if (items.length > 1) {
        // Pick the variant with the lowest quantity / price (first item) and remove other variants
        const primary = items[0];
        const primaryTitleLink = primary.card.querySelector('.dish-title a') || primary.card.querySelector('.dish-title');
        if (primaryTitleLink) {
          primaryTitleLink.textContent = baseName;
        }

        // Remove duplicate variants from Menu page DOM
        for (let i = 1; i < items.length; i++) {
          items[i].card.remove();
        }
      } else {
        const item = items[0];
        const primaryTitleLink = item.card.querySelector('.dish-title a') || item.card.querySelector('.dish-title');
        if (primaryTitleLink && getBaseProductName(item.rawTitle) !== item.rawTitle && !item.rawTitle.includes('DEAL')) {
          primaryTitleLink.textContent = baseName;
        }
      }
    });

    // Refresh menuDishCards query list after grouping
    menuDishCards = document.querySelectorAll('.menu-dish-col');
  }

  // Run grouping immediately on Menu page
  groupMenuCards();

  function filterMenu() {
    if (!menuDishCards.length) return;

    const searchTerm = (menuSearchInput?.value || '').toLowerCase().trim();
    const activeCategory = document.querySelector('.menu-tab-btn.active')?.dataset.category || 'all';
    const activeSpice = menuSpiceFilter?.value || 'all';

    let matchCount = 0;

    menuDishCards.forEach(card => {
      const title = (card.querySelector('.dish-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.dish-description')?.textContent || '').toLowerCase();
      const cat = (card.dataset.category || '').toLowerCase();
      const spice = (card.dataset.spice || '').toLowerCase();

      const isDeal = cat.includes('deal');
      const isDealQuery = searchTerm.includes('deal') || searchTerm.includes('person') || searchTerm.includes('family') || searchTerm.includes('feast') || searchTerm.includes('shapata') || searchTerm.includes('combo');
      let matchesSearch = false;
      if (isDeal && !isDealQuery) {
        matchesSearch = title.includes(searchTerm) || getBaseProductName(title).toLowerCase().includes(searchTerm);
      } else {
        matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm) || getBaseProductName(title).toLowerCase().includes(searchTerm);
      }
      const matchesCategory = activeCategory === 'all' || cat === activeCategory;
      const matchesSpice = activeSpice === 'all' || spice === activeSpice;

      if (matchesSearch && matchesCategory && matchesSpice) {
        card.style.display = '';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResultsMsg = document.getElementById('menu-no-results');
    if (noResultsMsg) {
      noResultsMsg.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }

  if (menuTabBtns.length > 0) {
    menuTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        menuTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterMenu();
      });
    });

    // Handle URL query parameter for category (e.g. menu.html?cat=deals)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || urlParams.get('category');
    if (catParam) {
      const targetBtn = Array.from(menuTabBtns).find(b => b.dataset.category === catParam.toLowerCase());
      if (targetBtn) {
        menuTabBtns.forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
        filterMenu();
      }
    }
  }

  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', filterMenu);
  }

  if (menuSpiceFilter) {
    menuSpiceFilter.addEventListener('change', filterMenu);
  }

  // ------------------------------------------------------------------------
  // 10. Gallery Filter & Lightbox (gallery.html)
  // ------------------------------------------------------------------------
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('bbq-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev-btn');
  const lightboxNext = document.getElementById('lightbox-next-btn');

  // Gallery filtering
  if (galleryFilterBtns.length > 0 && galleryItems.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Gallery Lightbox
  if (lightbox && galleryItems.length > 0) {
    let currentLightboxIndex = 0;
    const visibleGalleryImages = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

    function openLightbox(index) {
      const items = visibleGalleryImages();
      if (!items[index]) return;
      currentLightboxIndex = index;
      const item = items[index];
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title')?.textContent || '';

      if (lightboxImg) lightboxImg.src = img.src;
      if (lightboxCaption) lightboxCaption.textContent = title;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function nextLightbox() {
      const items = visibleGalleryImages();
      currentLightboxIndex = (currentLightboxIndex + 1) % items.length;
      openLightbox(currentLightboxIndex);
    }

    function prevLightbox() {
      const items = visibleGalleryImages();
      currentLightboxIndex = (currentLightboxIndex - 1 + items.length) % items.length;
      openLightbox(currentLightboxIndex);
    }

    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        const visibleItems = visibleGalleryImages();
        const clickedIndex = visibleItems.indexOf(item);
        if (clickedIndex > -1) {
          openLightbox(clickedIndex);
        }
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    });
  }

  // ------------------------------------------------------------------------
  // 11. Interactive Star Rating & Reviews Submission (reviews.html)
  // ------------------------------------------------------------------------
  const starInteractive = document.getElementById('star-rating-interactive');
  let selectedRating = 5;

  if (starInteractive) {
    const stars = starInteractive.querySelectorAll('i');
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const val = parseInt(star.dataset.val);
        stars.forEach(s => {
          s.classList.toggle('hover', parseInt(s.dataset.val) <= val);
        });
      });

      star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });

      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.val);
        const inputRating = document.getElementById('review-rating-value');
        if (inputRating) inputRating.value = selectedRating;

        stars.forEach(s => {
          s.classList.toggle('selected', parseInt(s.dataset.val) <= selectedRating);
          if (parseInt(s.dataset.val) <= selectedRating) {
            s.classList.replace('bi-star', 'bi-star-fill');
          } else {
            s.classList.replace('bi-star-fill', 'bi-star');
          }
        });
      });
    });
  }

  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('review-name')?.value.trim();
      const city = document.getElementById('review-city')?.value.trim() || 'Lahore';
      const dish = document.getElementById('review-dish')?.value.trim() || 'Bihari Boti';
      const comment = document.getElementById('review-comment')?.value.trim();

      if (!name || !comment) {
        window.showToast('Please fill in your name and review!', 'bi-exclamation-triangle-fill', true);
        return;
      }

      // Prepend review to reviews grid
      const reviewsGrid = document.getElementById('reviews-grid');
      if (reviewsGrid) {
        const newCard = document.createElement('div');
        newCard.className = 'col-lg-6 mb-4';

        let starIcons = '';
        for (let i = 1; i <= 5; i++) {
          starIcons += `<i class="bi bi-star${i <= selectedRating ? '-fill' : ''}"></i> `;
        }

        newCard.innerHTML = `
          <div class="testimonial-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="testimonial-stars">${starIcons}</div>
                <span class="badge bg-success" style="font-size: 0.75rem;">Verified Diner</span>
              </div>
              <p class="testimonial-quote">"${comment}"</p>
              <div class="text-muted small mb-3"><strong>Favorite:</strong> ${dish}</div>
            </div>
            <div class="testimonial-author">
              <div class="testimonial-avatar d-flex align-items-center justify-content-center bg-danger text-white fw-bold">
                ${name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h6 class="testimonial-author-name mb-0">${name}</h6>
                <div class="testimonial-author-title">${city} &bull; Just now</div>
              </div>
            </div>
          </div>
        `;

        reviewsGrid.prepend(newCard);
      }

      reviewForm.reset();
      window.showToast('Thank you! Your review has been published.', 'bi-patch-check-fill');
    });
  }

  // ------------------------------------------------------------------------
  // 12. Reservation Form & Validation (reservation.html)
  // ------------------------------------------------------------------------
  const reservationForm = document.getElementById('table-reservation-form');
  if (reservationForm) {
    // Restrict date input to today onwards
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!reservationForm.checkValidity()) {
        e.stopPropagation();
        reservationForm.classList.add('was-validated');
        return;
      }

      const name = document.getElementById('res-name')?.value;
      const phone = document.getElementById('res-phone')?.value;
      const date = document.getElementById('res-date')?.value;
      const time = document.getElementById('res-time')?.value;
      const guests = document.getElementById('res-guests')?.value;
      const area = document.querySelector('input[name="resArea"]:checked')?.value || 'Outdoor Terrace';

      const bookingRef = 'KB-' + Math.floor(10000 + Math.random() * 90000);

      // Populate confirmation modal
      const modalRefEl = document.getElementById('booking-modal-ref');
      const modalDetailsEl = document.getElementById('booking-modal-details');

      if (modalRefEl) modalRefEl.textContent = bookingRef;
      if (modalDetailsEl) {
        modalDetailsEl.innerHTML = `
          <strong>Guest:</strong> ${name} (${phone})<br>
          <strong>Date & Time:</strong> ${date} at ${time}<br>
          <strong>Party Size:</strong> ${guests} Guests<br>
          <strong>Seating Preference:</strong> ${area}
        `;
      }

      // Show Bootstrap Modal
      const bookingModalEl = document.getElementById('bookingConfirmationModal');
      if (bookingModalEl && window.bootstrap) {
        const modalInstance = new bootstrap.Modal(bookingModalEl);
        modalInstance.show();
      } else {
        window.showToast(`Table booked successfully! Ref: ${bookingRef}`, 'bi-check2-circle');
      }

      // Direct WhatsApp Dispatch for table reservation
      let resMsg = `🔥 *TABLE RESERVATION - KAKA BHAIYA BBQ* 🔥\n`;
      resMsg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      resMsg += `🔖 *Booking Reference:* ${bookingRef}\n`;
      resMsg += `👤 *Guest Name:* ${name}\n`;
      resMsg += `📞 *Phone / WhatsApp:* ${phone}\n`;
      resMsg += `📅 *Date:* ${date}\n`;
      resMsg += `⏰ *Time Slot:* ${time}\n`;
      resMsg += `👥 *Number of Guests:* ${guests} Persons\n`;
      resMsg += `🏛️ *Seating Area:* ${area}\n`;
      const requests = document.getElementById('res-requests')?.value?.trim();
      if (requests) {
        resMsg += `📝 *Special Requests:* ${requests}\n`;
      }
      resMsg += `📍 *Restaurant:* 414-E Hoo Chowk, Johar Town, Lahore\n`;
      resMsg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      resMsg += `Please confirm my table reservation. Thank you!`;

      const whatsappResUrl = `https://wa.me/923228019941?text=${encodeURIComponent(resMsg)}`;
      window.open(whatsappResUrl, '_blank');

      reservationForm.reset();
      reservationForm.classList.remove('was-validated');
    });
  }

  // ------------------------------------------------------------------------
  // 13. Promo Code & Order Checkout via WhatsApp
  // ------------------------------------------------------------------------
  const couponBtn = document.getElementById('apply-coupon-btn');
  if (couponBtn) {
    couponBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const codeInput = document.getElementById('coupon-input');
      const code = (codeInput?.value || '').trim().toUpperCase();

      if (code === 'KAKABBQ') {
        window.appliedPromoCode = 'KAKABBQ';
        window.showToast('Promo code applied successfully! 10% discount added.', 'bi-check-circle-fill');
      } else {
        window.showToast('Invalid promo code. Please enter a valid code.', 'bi-x-circle-fill', true);
        return;
      }



      renderOrderPageCart();
    });
  }

  // Toggle order type (Delivery vs Takeaway / Dine-in)
  const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
  if (orderTypeRadios.length > 0) {
    orderTypeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        const addressGroup = document.getElementById('delivery-address-group');
        if (addressGroup) {
          addressGroup.style.display = radio.value === 'delivery' ? 'block' : 'none';
        }
        renderOrderPageCart();
      });
    });
  }

  // Order Placement (Order Confirmation & Direct WhatsApp Dispatch)
  const placeOrderBtn = document.getElementById('btn-confirm-order') || document.getElementById('place-order-whatsapp-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cart = getCart();
      if (!cart || cart.length === 0) {
        window.showToast('Your feast cart is empty! Please add BBQ items first.', 'bi-cart-x', true);
        return;
      }

      const nameInput = document.getElementById('checkout-name');
      const phoneInput = document.getElementById('checkout-phone');
      const addressInput = document.getElementById('checkout-address');
      const notesInput = document.getElementById('checkout-notes');

      const name = nameInput?.value.trim() || '';
      const phone = phoneInput?.value.trim() || '';
      const address = addressInput?.value.trim() || '';
      const type = document.querySelector('input[name="orderType"]:checked')?.value || 'delivery';
      const notes = notesInput?.value.trim() || '';

      // Validation
      if (!name) {
        window.showToast('Please enter your full name.', 'bi-person-x', true);
        nameInput?.focus();
        nameInput?.classList.add('is-invalid');
        return;
      } else {
        nameInput?.classList.remove('is-invalid');
      }

      if (!phone) {
        window.showToast('Please enter your active phone or WhatsApp number.', 'bi-telephone-x', true);
        phoneInput?.focus();
        phoneInput?.classList.add('is-invalid');
        return;
      } else {
        phoneInput?.classList.remove('is-invalid');
      }

      const isDelivery = type === 'delivery';
      if (isDelivery && !address) {
        window.showToast('Please enter your complete delivery address.', 'bi-geo-alt', true);
        addressInput?.focus();
        addressInput?.classList.add('is-invalid');
        return;
      } else {
        addressInput?.classList.remove('is-invalid');
      }

      // Order type label
      const orderTypeLabel = isDelivery ? 'Hot Doorstep Delivery 🛵' : 'Self Takeaway / Pickup 🛍️';

      // Build structured WhatsApp message
      let message = `🔥 *ORDER CONFIRMATION - KAKA BHAIYA BBQ* 🔥\n`;
      message += `📍 Model Town D-Block Walay / Hoo Chowk Johar Town, Lahore\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `👤 *Customer Name:* ${name}\n`;
      message += `📞 *Phone / WhatsApp:* ${phone}\n`;
      message += `🛵 *Order Type:* ${orderTypeLabel}\n`;
      if (isDelivery) {
        message += `📍 *Delivery Address:* ${address}\n`;
      message += `🛵 *Delivery Policy:* Strictly within 10 KM of Hoo Chowk, Johar Town\n`;
      } else {
        message += `📍 *Pickup Point:* Kaka Bhaiya BBQ (Hoo Chowk, Johar Town, Lahore)\n`;
      }
      if (notes) {
        message += `📝 *Kitchen Instructions:* ${notes}\n`;
      }
      message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `📋 *ORDERED ITEMS:*\n`;

      let subtotal = 0;
      let totalQty = 0;
      cart.forEach((item, i) => {
        const qty = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;
        const itemSum = price * qty;
        subtotal += itemSum;
        totalQty += qty;
        message += `${i + 1}️⃣ *${item.name}*\n`;
        message += `   Qty: ${qty} x PKR ${price.toLocaleString()} = PKR ${itemSum.toLocaleString()}\n`;
      });

      const deliveryFee = !isDelivery ? 0 : (subtotal >= 2500 ? 0 : 200);
      let discount = 0;
      if (window.appliedPromoCode === 'KAKABBQ') discount = Math.round(subtotal * 0.10);

      const total = Math.max(0, subtotal - discount + deliveryFee);

      message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `💵 *Subtotal:* PKR ${subtotal.toLocaleString()} (${totalQty} items)\n`;
      if (discount > 0) {
        message += `🏷️ *Promo Discount (${window.appliedPromoCode}):* -PKR ${discount.toLocaleString()}\n`;
      }
      const deliveryDisplay = !isDelivery 
        ? 'FREE (Self Pickup)' 
        : (deliveryFee === 0 ? 'FREE (Special Offer over PKR 2,500)' : `PKR ${deliveryFee}`);
      message += `🚚 *Delivery Charges:* ${deliveryDisplay}\n`;
      message += `⭐ *GRAND TOTAL: PKR ${total.toLocaleString()}*\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `💳 *Payment Method:* Cash on Delivery (COD) / Bank Transfer\n`;
      message += `🕒 *Order Time:* ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi', dateStyle: 'medium', timeStyle: 'short' })}\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `Please confirm my order. Thank you!`;

      // Official WhatsApp Number
      const whatsappNumber = '923228019941';
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      // Populate Success Modal if present on the page
      const modalCustomerName = document.getElementById('successCustomerName');
      const modalOrderType = document.getElementById('successOrderType');
      const modalTotalAmount = document.getElementById('successTotalAmount');
      const modalAddressText = document.getElementById('successAddressText');

      if (modalCustomerName) modalCustomerName.textContent = name;
      if (modalOrderType) modalOrderType.textContent = orderTypeLabel;
      if (modalTotalAmount) modalTotalAmount.textContent = `PKR ${total.toLocaleString()}`;
      if (modalAddressText) {
        modalAddressText.textContent = isDelivery ? address : 'Hoo Chowk, Johar Town (Pickup)';
      }

      // Show Bootstrap Modal if present
      const modalEl = document.getElementById('orderSuccessModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
      }

      // Clear cart
      localStorage.removeItem(CART_KEY);
      updateCartBadges();
      renderOffcanvasCart();
      updateFloatingCartBar();

      // Show confirmation toast
      window.showToast('Order confirmed! Opening WhatsApp...', 'bi-bag-check-fill');

      // Dispatch directly to WhatsApp
      window.open(url, '_blank');
    });
  }

  // ------------------------------------------------------------------------
  // 14. Contact Form Validation & Direct WhatsApp Dispatch (contact.html)
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      const name = document.getElementById('contact-name')?.value?.trim() || '';
      const phone = document.getElementById('contact-phone')?.value?.trim() || '';
      const subject = document.getElementById('contact-subject')?.value?.trim() || 'General Inquiry';
      const msg = document.getElementById('contact-message')?.value?.trim() || '';

      let text = `🔥 *NEW INQUIRY - KAKA BHAIYA BBQ* 🔥\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `👤 *Name:* ${name}\n`;
      text += `📞 *Phone / WhatsApp:* ${phone}\n`;
      text += `📌 *Subject:* ${subject}\n`;
      text += `💬 *Message:* ${msg}\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `📍 Sent from Kaka Bhaiya BBQ Website`;

      const whatsappContactUrl = `https://wa.me/923228019941?text=${encodeURIComponent(text)}`;
      window.open(whatsappContactUrl, '_blank');

      contactForm.reset();
      contactForm.classList.remove('was-validated');
      window.showToast('Message sent! Opening WhatsApp hotline...', 'bi-whatsapp');
    });
  }

  // ------------------------------------------------------------------------
  // 15. VIP Deals Club WhatsApp Subscription Forms
  // ------------------------------------------------------------------------
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const val = input ? input.value.trim() : '';
      if (val) {
        let msg = `🔥 *KAKA BHAIYA VIP CLUB JOIN REQUEST* 🔥\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `📱 *Phone / WhatsApp:* ${val}\n`;
        msg += `🎁 *Request:* Please add me to the Kaka Bhaiya VIP Deals Club for secret deals and 15% discount voucher!\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━━━`;
        window.open(`https://wa.me/923228019941?text=${encodeURIComponent(msg)}`, '_blank');
        window.showToast('Connecting to WhatsApp for your 15% discount voucher...', 'bi-whatsapp');
        input.value = '';
      }
    });
  });

  // ------------------------------------------------------------------------
  // 16. Back to Top Button
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 17. Dedicated Product Showcase & Interactive Customer Reviews (product.html)
  // ------------------------------------------------------------------------
  const productTitleEl = document.getElementById('product-title');
  if (productTitleEl) {
    initProductShowcase();
  }

  function initProductShowcase() {
    // Master Dishes Catalog (All 33 Menu Items + Runway Looks + Signature Deals)
    const catalog = {

    "deal_1_person_chicken": {
        "id": "deal_1_person_chicken",
        "title": "1 PERSON DEAL (Chicken)",
        "category": "Exclusive Deals",
        "price": 899,
        "image": "https://images.unsplash.com/photo-1775211578178-61f06027adf3?w=600&q=80",
        "lookBadge": "Solo Special",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Perfect solo feast: 1 Charcoal Chicken Leg Piece, 2 Chicken Kababs, 2 Sada Naans, 345ml cold bottle, served with signature Raita & Imli sauce.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The 1 PERSON DEAL (Chicken) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Standard Deal",
                "price": 899,
                "desc": "1 Leg, 2 Kababs, 2 Naans, 1 Drink (345ml)"
            }
        ]
    },
    "deal_1_person_beef": {
        "id": "deal_1_person_beef",
        "title": "1 PERSON DEAL (Beef)",
        "category": "Exclusive Deals",
        "price": 1249,
        "image": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80",
        "lookBadge": "Prime Beef Solo",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Prime beef lover's feast: 6 Bhaiya Beef Kababs, 8 Beef Afghani Botis, 8 Beef Botis, 2 Sada Naans, with zesty Raita & Imli sauce.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The 1 PERSON DEAL (Beef) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Standard Deal",
                "price": 1249,
                "desc": "6 Kababs, 8 Afghani, 8 Boti, 2 Naans, 1 Drink"
            }
        ]
    },
    "deal_2_person": {
        "id": "deal_2_person",
        "title": "2 PERSON DEAL",
        "category": "Exclusive Deals",
        "price": 699,
        "image": "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&q=80",
        "lookBadge": "Duo Roll Combo",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Great duo value: 1 Tandoori Naan Chicken Kabab Roll, 1 Naan Beef Kabab Roll, 500ml cold drink, and signature dipping sauces.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The 2 PERSON DEAL at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Standard Deal",
                "price": 699,
                "desc": "2 Rolls, 2 Drinks (345ml), Raita & Imli"
            }
        ]
    },
    "deal_4_person": {
        "id": "deal_4_person",
        "title": "4 PERSON DEAL",
        "category": "Exclusive Deals",
        "price": 2599,
        "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
        "lookBadge": "Friends Feast",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 4 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Hungry group combo: 2 Chicken Pieces, 8 tender Chicken Malai Botis, 4 Chicken Kababs, 4 Sada Naans, large 1.5L cold bottle, with salad and sauces.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The 4 PERSON DEAL at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Standard Deal",
                "price": 2599,
                "desc": "2 Tikka, 4 Chicken Kabab, 4 Beef Kabab, 12 Malai Boti, 4 Naans, 1.5L Drink"
            }
        ]
    },
    "deal_shapata": {
        "id": "deal_shapata",
        "title": "SHAPATA DEAL",
        "category": "Exclusive Deals",
        "price": 2299,
        "image": "https://images.unsplash.com/photo-1567932783552-e305bbf70b63?w=600&q=80",
        "lookBadge": "Traditional Special",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Authentic street food organ specialty: 20 PC Domchi, 20 PC Dili, 12 PC Pota, 20 PC Kalaji, served sizzling with fresh salad, raita, and imli sauce.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The SHAPATA DEAL at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Standard Deal",
                "price": 2299,
                "desc": "Special organ meat delicacies, 4 Naans, 1.5L Drink"
            }
        ]
    },
    "deal_special": {
        "id": "deal_special",
        "title": "SPECIAL DEAL",
        "category": "Exclusive Deals",
        "price": 1099,
        "image": "https://images.unsplash.com/photo-1781332150932-e4af32932ee9?w=600&q=80",
        "lookBadge": "Customer Favorite",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Top rated variety combo: 4 Chicken Malai Botis, 4 Chicken Tikka Botis, 2 Chicken Kababs, 2 Sada Naans, 300ml cold drink, salad and raita.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The SPECIAL DEAL at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Standard Deal",
                "price": 1099,
                "desc": "12 Malai Boti, 12 Tikka Boti, 4 Kababs, 2 Parathas, 2 Naans, 1.5L Drink"
            }
        ]
    },
    "deal_family_1": {
        "id": "deal_family_1",
        "title": "FAMILY DEAL 1 (The Feast)",
        "category": "Exclusive Deals",
        "price": 5999,
        "image": "https://images.unsplash.com/photo-1771285119318-b342c3ecc51c?w=800&q=80",
        "lookBadge": "Mega Family Feast",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 6-8 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "The ultimate party platter: 6 Chicken Kababs, 16 Chicken Tikka Botis, 20 Bhaiya Beef Kababs, 16 Chicken Malai Botis, 16 Beef Afghani Botis, 16 Bhaiya Beef Botis, 8 Sada Naans, 2x 1L bottles, with fresh salad and sauces.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The FAMILY DEAL 1 (The Feast) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "6 Persons Feast",
                "price": 5999,
                "desc": "2 Legs, 2 Breasts, 6 Beef Kabab, 6 Chicken Kabab, 12 Malai, 12 Boti, 6 Naans, 2x 1.5L Drink"
            }
        ]
    },
    "deal_family_2": {
        "id": "deal_family_2",
        "title": "FAMILY DEAL 2 (The Grand Feast)",
        "category": "Exclusive Deals",
        "price": 7999,
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        "lookBadge": "TOP DEAL (Rs 7,999)",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 6-8 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "The King of Deals (Top Price Deal): 8 Chicken Gola Kababs, 16 Chicken Tikka Botis, 4 Charbroiled Chicken Pieces (2 Breast / 2 Leg), 16 Chicken Malai Botis, 16 Chicken Green Botis, 10 Sada Naans, 2x 1.5L large bottles, plus full salad and raita platter.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The FAMILY DEAL 2 (The Grand Feast) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "8-10 Persons Royal",
                "price": 7999,
                "desc": "4 Tikka, 8 Beef Kabab, 8 Chicken Kabab, 24 Malai, 24 Afghani, 1 KG Fish, 10 Naans, 3x 1.5L Drink"
            }
        ]
    },
    "beef_kabab_6": {
        "id": "beef_kabab_6",
        "title": "Bhaiya Beef Kabab 1 Bite",
        "category": "Beef B.B.Q",
        "price": 450,
        "image": "images/dishes/bhaiya_beef_kabab_1bite.png",
        "lookBadge": "Qty: 6 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 180,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Traditional hand-minced prime beef skewers infused with roasted cumin, charred brown onions, fresh mint, and 14 secret whole spices, grilled on acacia coals.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Beef Kabab (6 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "6 Pieces",
                "price": 450,
                "desc": "Half Dozen hand-minced prime beef skewers"
            },
            {
                "name": "12 Pieces",
                "price": 999,
                "desc": "Full Dozen hand-minced prime beef skewers"
            }
        ]
    },
    "beef_kabab_12": {
        "id": "beef_kabab_12",
        "title": "Bhaiya Beef Kabab 1 Bite (12 PC)",
        "category": "Beef B.B.Q",
        "price": 999,
        "image": "images/dishes/bhaiya_beef_kabab_1bite.png",
        "lookBadge": "Qty: 12 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "A full dozen prime beef seekh kababs slow-roasted over glowing coals for melting, tender indulgence.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Beef Kabab (12 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "6 Pieces",
                "price": 450,
                "desc": "Half Dozen hand-minced prime beef skewers"
            },
            {
                "name": "12 Pieces",
                "price": 999,
                "desc": "Full Dozen hand-minced prime beef skewers"
            }
        ]
    },
    "beef_boti_24": {
        "id": "beef_boti_24",
        "title": "Beef Boti (24 PC)",
        "category": "Beef B.B.Q",
        "price": 999,
        "image": "images/dishes/beef_boti.png",
        "lookBadge": "Qty: 24 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Succulent beef tenderloin cubes cured in raw green papaya, pungent mustard oil, and crushed red chilies, skewered and seared.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Beef Boti (24 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "24 Pieces",
                "price": 999,
                "desc": "24 succulent char-grilled beef cubes"
            },
            {
                "name": "48 Pieces",
                "price": 1899,
                "desc": "48 succulent char-grilled beef cubes"
            }
        ]
    },
    "beef_boti_48": {
        "id": "beef_boti_48",
        "title": "Beef Boti (48 PC)",
        "category": "Beef B.B.Q",
        "price": 1899,
        "image": "images/dishes/beef_boti.png",
        "lookBadge": "Qty: 48 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Mega 48-piece family feast platter of charred, smoky beef boti skewers served hot from the coals.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Beef Boti (48 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "24 Pieces",
                "price": 999,
                "desc": "24 succulent char-grilled beef cubes"
            },
            {
                "name": "48 Pieces",
                "price": 1899,
                "desc": "48 succulent char-grilled beef cubes"
            }
        ]
    },
    "beef_afghani_boti_24": {
        "id": "beef_afghani_boti_24",
        "title": "Beef Afghani Boti (24 PC)",
        "category": "Beef B.B.Q",
        "price": 999,
        "image": "images/dishes/bhaiya_beef_afghani_boti.jpg",
        "lookBadge": "Qty: 24 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Authentic tribal-style beef boti seasoned lightly with rock salt, cracked black pepper, and tenderized in natural beef fat baste.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Beef Afghani Boti (24 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "24 Pieces",
                "price": 999,
                "desc": "24 rustic salt-and-pepper Afghani skewers"
            },
            {
                "name": "48 Pieces",
                "price": 1899,
                "desc": "48 rustic salt-and-pepper Afghani skewers"
            }
        ]
    },
    "beef_afghani_boti_48": {
        "id": "beef_afghani_boti_48",
        "title": "Beef Afghani Boti (48 PC)",
        "category": "Beef B.B.Q",
        "price": 1899,
        "image": "images/dishes/bhaiya_beef_afghani_boti.jpg",
        "lookBadge": "Qty: 48 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Massive 48-piece tribal feast of tender Afghani beef boti grilled slowly over red acacia coal embers.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Beef Afghani Boti (48 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "24 Pieces",
                "price": 999,
                "desc": "24 rustic salt-and-pepper Afghani skewers"
            },
            {
                "name": "48 Pieces",
                "price": 1899,
                "desc": "48 rustic salt-and-pepper Afghani skewers"
            }
        ]
    },
    "chicken_kabab_6": {
        "id": "chicken_kabab_6",
        "title": "Chicken Kabab (6 PC)",
        "category": "Chicken B.B.Q",
        "price": 699,
        "image": "images/dishes/chicken_kabab.jpg",
        "lookBadge": "Qty: 6 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Tender minced chicken skewers kneaded with green chilies, cilantro, roasted cumin, and butter, flame grilled on skewers.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Kabab (6 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "6 Pieces",
                "price": 699,
                "desc": "6 golden chicken seekh kababs"
            },
            {
                "name": "12 Pieces",
                "price": 1350,
                "desc": "12 golden chicken seekh kababs"
            }
        ]
    },
    "chicken_tikka_boti_12": {
        "id": "chicken_tikka_boti_12",
        "title": "Chicken Tikka Boti (12 PC)",
        "category": "Chicken B.B.Q",
        "price": 799,
        "image": "https://images.unsplash.com/photo-1755090154782-5215189b4083?w=600&q=80",
        "lookBadge": "Qty: 12 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Boneless chicken thigh cubes bathed in tandoori yogurt marinade, carom seeds, and crushed spices, flame seared.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Tikka Boti (12 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "12 Pieces",
                "price": 799,
                "desc": "12 spicy marinated chicken tikka cuts"
            },
            {
                "name": "24 Pieces",
                "price": 1550,
                "desc": "24 spicy marinated chicken tikka cuts"
            }
        ]
    },
    "chicken_boneless_boti_24": {
        "id": "chicken_boneless_boti_24",
        "title": "Chicken Boneless Boti (24 PC)",
        "category": "Chicken B.B.Q",
        "price": 1800,
        "image": "images/dishes/chicken_boneless_boti.jpg",
        "lookBadge": "Qty: 24 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 180,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Generous 24-piece cuts of tender boneless chicken marinated in lemon herb marinade, skewered over live coal fire.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Boneless Boti (24 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "12 Pieces",
                "price": 950,
                "desc": "12 tender boneless chicken boti cubes"
            },
            {
                "name": "24 Pieces",
                "price": 1800,
                "desc": "24 tender boneless chicken boti cubes"
            }
        ]
    },
    "chicken_malai_boti_24": {
        "id": "chicken_malai_boti_24",
        "title": "Chicken Malai Boti (24 PC)",
        "category": "Chicken B.B.Q",
        "price": 2099,
        "image": "images/dishes/chicken_malai_boti.jpg",
        "lookBadge": "Qty: 24 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Velvety chicken chunks steeped in fresh malai, ground cashew nut paste, white pepper, and green cardamom for tender indulgence.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Malai Boti (24 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "12 Pieces",
                "price": 1099,
                "desc": "12 creamy melt-in-mouth chicken malai boti"
            },
            {
                "name": "24 Pieces",
                "price": 2099,
                "desc": "24 creamy melt-in-mouth chicken malai boti"
            }
        ]
    },
    "chicken_green_boti_24": {
        "id": "chicken_green_boti_24",
        "title": "Chicken Green Boti (24 PC)",
        "category": "Chicken B.B.Q",
        "price": 2099,
        "image": "images/dishes/chicken_green_boti.jpg",
        "lookBadge": "Qty: 24 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Spicy green haryali chicken boti infused with fresh garden mint, pungent green chilies, garlic, and fresh lime.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Green Boti (24 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "12 Pieces",
                "price": 1099,
                "desc": "12 fresh mint & herb haryali chicken boti"
            },
            {
                "name": "24 Pieces",
                "price": 2099,
                "desc": "24 fresh mint & herb haryali chicken boti"
            }
        ]
    },
    "chicken_leg_piece": {
        "id": "chicken_leg_piece",
        "title": "Chicken Leg Piece (1 PC)",
        "category": "Chicken B.B.Q",
        "price": 459,
        "image": "images/dishes/chicken_leg_piece.jpg",
        "lookBadge": "Qty: 1 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 189,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Whole succulent chicken leg quarter scored deeply and basted in traditional tandoori red masala over glowing coals.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Leg Piece (1 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "1 PC",
                "price": 459,
                "desc": "1 charcoal-grilled whole chicken leg quarter"
            },
            {
                "name": "2 PC",
                "price": 899,
                "desc": "2 charcoal-grilled whole chicken leg quarters"
            }
        ]
    },
    "chicken_breast_piece": {
        "id": "chicken_breast_piece",
        "title": "Chicken Breast Piece (1 PC)",
        "category": "Chicken B.B.Q",
        "price": 499,
        "image": "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?w=600&q=80",
        "lookBadge": "Qty: 1 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Juicy, meaty chicken breast quarter seasoned with lemon, black pepper, and roasted chili flakes, flame broiled.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Breast Piece (1 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "1 PC",
                "price": 499,
                "desc": "1 charcoal-scored prime chicken breast quarter"
            },
            {
                "name": "2 PC",
                "price": 980,
                "desc": "2 charcoal-scored prime chicken breast quarters"
            }
        ]
    },
    "chicken_malai_piece": {
        "id": "chicken_malai_piece",
        "title": "Chicken Malai Piece (1 PC)",
        "category": "Chicken B.B.Q",
        "price": 599,
        "image": "images/dishes/chicken_malai_piece.png",
        "lookBadge": "Qty: 1 PC",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Full prime chicken quarter marinated in rich clotted cream, saffron butter, and gentle cardamom glaze.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Malai Piece (1 PC) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "1 PC",
                "price": 599,
                "desc": "1 rich dairy cream glazed chicken quarter"
            },
            {
                "name": "2 PC",
                "price": 1180,
                "desc": "2 rich dairy cream glazed chicken quarters"
            }
        ]
    },
    "roll_chicken_kabab": {
        "id": "roll_chicken_kabab",
        "title": "Chicken Kabab Roll",
        "category": "Paratha Rolls",
        "price": 349,
        "image": "https://images.unsplash.com/photo-1745126009946-1b35b1a16fec?w=600&q=80",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Crispy pan-fried golden paratha rolled with seasoned chicken seekh kabab, crunchy onions, and mint raita.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Kabab Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 349,
                "desc": "1 crispy paratha chicken kabab roll"
            }
        ]
    },
    "roll_chicken_malai": {
        "id": "roll_chicken_malai",
        "title": "Chicken Malai Roll",
        "category": "Paratha Rolls",
        "price": 499,
        "image": "https://images.unsplash.com/photo-1748955308143-5055af50bba6?w=600&q=80",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Flaky golden lachha paratha wrapped around tender chicken malai boti and garlic-herb cream sauce.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Malai Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 499,
                "desc": "1 creamy chicken malai paratha roll"
            }
        ]
    },
    "roll_special_malai": {
        "id": "roll_special_malai",
        "title": "Special Malai Roll",
        "category": "Paratha Rolls",
        "price": 549,
        "image": "https://images.unsplash.com/photo-1762284513008-08f897ff5041?w=600&q=80",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Extra-loaded malai boti roll topped with melted cheese drizzle, thick cream, and secret herb mayo.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Special Malai Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 549,
                "desc": "1 jumbo special malai roll with garlic drizzle"
            }
        ]
    },
    "roll_beef_kabab": {
        "id": "roll_beef_kabab",
        "title": "Beef Kabab Roll",
        "category": "Paratha Rolls",
        "price": 399,
        "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Smoky beef seekh kabab rolled in hot crisp paratha with tangy imli tamarind chutney and onion rings.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Beef Kabab Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 399,
                "desc": "1 spiced beef seekh kabab paratha roll"
            }
        ]
    },
    "roll_beef_boti": {
        "id": "roll_beef_boti",
        "title": "Beef Boti Roll",
        "category": "Paratha Rolls",
        "price": 599,
        "image": "https://images.unsplash.com/photo-1778168199427-4e839943d20f?w=600&q=80",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Tender char-grilled spicy beef boti cuts wrapped in crispy lachha paratha with freshly sliced salad.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Beef Boti Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 599,
                "desc": "1 char-grilled beef boti paratha roll"
            }
        ]
    },
    "roll_special_beef_boti": {
        "id": "roll_special_beef_boti",
        "title": "Special Beef Boti Roll",
        "category": "Paratha Rolls",
        "price": 799,
        "image": "https://images.unsplash.com/photo-1561760041-ca62af0d9047?w=600&q=80",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Double portion of charcoal beef boti loaded into flaky paratha with melted butter and spicy secret sauces.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Special Beef Boti Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 799,
                "desc": "1 jumbo prime beef boti roll"
            }
        ]
    },
    "roll_chicken_cheese": {
        "id": "roll_chicken_cheese",
        "title": "Chicken Cheese Roll",
        "category": "Paratha Rolls",
        "price": 499,
        "image": "https://images.unsplash.com/photo-1740377015738-b0f49643d468?w=600&q=80",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Succulent chicken boti layered with gooey melted mozzarella cheese inside golden buttery paratha.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Chicken Cheese Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 499,
                "desc": "1 paratha roll with melted mozzarella cheese"
            }
        ]
    },
    "roll_shapata": {
        "id": "roll_shapata",
        "title": "Shapata Roll",
        "category": "Paratha Rolls",
        "price": 799,
        "image": "images/dishes/shapata_roll.jpg",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Signature Kaka Bhaiya Shapata roll packed with special mixed meats, charred green chilies, and fiery masala crunch.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Shapata Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 799,
                "desc": "1 street-style fiery specialty meat roll"
            }
        ]
    },
    "roll_wehshi": {
        "id": "roll_wehshi",
        "title": "Wehshi Roll",
        "category": "Paratha Rolls",
        "price": 999,
        "image": "https://plus.unsplash.com/premium_photo-1731512475641-191f7841512e?w=600&q=80",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 229,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "The legendary jumbo monster roll loaded with double beef boti, chicken malai, seekh kababs, and melted cheese.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Wehshi Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 999,
                "desc": "1 beast monster roll with kabab and boti"
            }
        ]
    },
    "roll_naan_beef_kabab": {
        "id": "roll_naan_beef_kabab",
        "title": "Naan Beef Kabab Roll",
        "category": "Paratha Rolls",
        "price": 290,
        "image": "images/dishes/naan_beef_kabab_roll.png",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 220,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Freshly baked soft tandoori clay oven naan rolled around juicy beef seekh kabab with onion salad and mint dip.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Naan Beef Kabab Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 290,
                "desc": "1 soft tandoori naan beef kabab roll"
            }
        ]
    },
    "roll_naan_chicken_kabab": {
        "id": "roll_naan_chicken_kabab",
        "title": "Naan Chicken Kabab Roll",
        "category": "Paratha Rolls",
        "price": 295,
        "image": "images/dishes/naan_chicken_kabab_roll.png",
        "lookBadge": "Qty: 1 Roll",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 225,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Soft clay tandoor naan wrapping freshly grilled chicken seekh kabab with cooling coriander yogurt raita.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Naan Chicken Kabab Roll at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Roll",
                "price": 295,
                "desc": "1 soft tandoori naan chicken kabab roll"
            }
        ]
    },
    "fish_grill": {
        "id": "fish_grill",
        "title": "Grill Fish",
        "category": "Fish (Seasonal)",
        "price": 1580,
        "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
        "lookBadge": "Qty: Seasonal Special",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 180,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Fresh seasonal river fish marinated in roasted ajwain, sea salt, lemon, and stone-ground masalas, grilled over live coals.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Grill Fish at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "1 KG Full",
                "price": 1580,
                "desc": "1 KG fresh seasonal river fish marinated in roasted spices and grilled over live coals"
            },
            {
                "name": "Half KG",
                "price": 790,
                "desc": "Half KG fresh seasonal river fish marinated in roasted spices and grilled over live coals"
            }
        ]
    },
    "fish_fried": {
        "id": "fish_fried",
        "title": "Fried Fish",
        "category": "Fish (Seasonal)",
        "price": 2990,
        "image": "images/dishes/fried_fish.png",
        "lookBadge": "Coming Soon",
        "spiceBadge": "Medium Charcoal",
        "score": 4.9,
        "ratingCount": 220,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Crispy Lahori batter-fried river fish with aromatic carom and coriander crust. Coming soon this winter season!",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Crispy Lahori batter-fried river fish with aromatic carom and coriander crust. Coming soon this winter season!",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Crispy Lahori batter-fried river fish with aromatic carom and coriander crust. Coming soon this winter season!",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crispy Lahori batter-fried river fish with aromatic carom and coriander crust. Coming soon this winter season!",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Crispy Lahori batter-fried river fish with aromatic carom and coriander crust. Coming soon this winter season!",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Fried Fish at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Half KG",
                "price": 1550,
                "desc": "Crispy Lahori batter-fried river fish with aromatic carom and coriander crust. Coming soon this winter season!"
            },
            {
                "name": "1 KG Full",
                "price": 2990,
                "desc": "Crispy Lahori batter-fried river fish with aromatic carom and coriander crust. Coming soon this winter season!"
            }
        ]
    },
    "side_sada_roti": {
        "id": "side_sada_roti",
        "title": "Sada Roti",
        "category": "Sides Items & Drinks",
        "price": 30,
        "image": "images/dishes/sada_roti.jpg",
        "lookBadge": "Qty: 1 PC",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 210,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Traditional thin whole wheat roti baked fresh on clay tandoor walls.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Sada Roti at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "1 PC",
                "price": 30,
                "desc": "1 fresh tandoori wholewheat roti"
            },
            {
                "name": "2 PC",
                "price": 60,
                "desc": "2 fresh tandoori wholewheat rotis"
            },
            {
                "name": "4 PC",
                "price": 120,
                "desc": "4 fresh tandoori wholewheat rotis"
            }
        ]
    },
    "side_sada_naan": {
        "id": "side_sada_naan",
        "title": "Sada Naan",
        "category": "Sides Items & Drinks",
        "price": 40,
        "image": "images/dishes/sada_naan.jpg",
        "lookBadge": "Qty: 1 PC",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 220,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Fluffy hot clay oven tandoori naan with blistered golden crust and soft crumb.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Sada Naan at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "1 PC",
                "price": 40,
                "desc": "1 hot clay oven tandoori naan"
            },
            {
                "name": "2 PC",
                "price": 80,
                "desc": "2 hot clay oven tandoori naans"
            },
            {
                "name": "4 PC",
                "price": 160,
                "desc": "4 hot clay oven tandoori naans"
            }
        ]
    },
    "side_malwari_paratha": {
        "id": "side_malwari_paratha",
        "title": "Malwari Paratha",
        "category": "Sides Items & Drinks",
        "price": 150,
        "image": "images/dishes/malwari_paratha.jpg",
        "lookBadge": "Qty: 1 PC",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 180,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Crispy, multi-layered golden Malwari lachha paratha pan-fried in authentic desi ghee.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Malwari Paratha at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "1 PC",
                "price": 150,
                "desc": "1 multi-layered crispy tawa paratha"
            },
            {
                "name": "2 PC",
                "price": 300,
                "desc": "2 multi-layered crispy tawa parathas"
            }
        ]
    },
    "side_raita_imli": {
        "id": "side_raita_imli",
        "title": "Raita & Imli",
        "category": "Sides Items & Drinks",
        "price": 120,
        "image": "images/dishes/raita_imli_sauce.jpg",
        "lookBadge": "Qty: 1 Serving",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 200,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Chilled zeera mint curd raita served alongside our signature sweet-and-sour tamarind imli chutney.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Raita & Imli at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Regular Bowl",
                "price": 120,
                "desc": "Chilled mint zeera raita & imli chutney"
            },
            {
                "name": "Double Bowl",
                "price": 220,
                "desc": "2 bowls mint raita & imli chutney"
            }
        ]
    },
    "side_fresh_salad": {
        "id": "side_fresh_salad",
        "title": "Fresh Salad",
        "category": "Sides Items & Drinks",
        "price": 150,
        "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
        "lookBadge": "Qty: 1 Platter",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 180,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Fresh crisp red onion rings, cucumber slices, juicy tomatoes, green chilies, and lemon wedges.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Fresh Salad at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Platter",
                "price": 150,
                "desc": "Crisp cucumber, onion rings, tomatoes & lemon"
            },
            {
                "name": "Family Platter",
                "price": 250,
                "desc": "Large family salad platter"
            }
        ]
    },
    "drink_regular_bottle": {
        "id": "drink_regular_bottle",
        "title": "Regular Bottle",
        "category": "Sides Items & Drinks",
        "price": 120,
        "image": "images/dishes/regular_bottle_345ml.jpg",
        "lookBadge": "Qty: 250 ml",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 200,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Ice-cold 250ml glass bottle soda: Pepsi, 7Up, Mirinda, or Coke.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Regular Bottle at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "250 ml",
                "price": 120,
                "desc": "Chilled 250ml glass bottle"
            },
            {
                "name": "500 ml",
                "price": 200,
                "desc": "Chilled 500ml PET bottle"
            },
            {
                "name": "1.5 L",
                "price": 350,
                "desc": "Chilled 1.5L family bottle"
            }
        ]
    },
    "drink_bottle_500ml": {
        "id": "drink_bottle_500ml",
        "title": "Bottle (500 ml)",
        "category": "Sides Items & Drinks",
        "price": 200,
        "image": "images/dishes/bottle_500ml.png",
        "lookBadge": "Qty: 500 ml",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 180,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Chilled 500ml soft drink bottle for personal dining refreshment.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Bottle (500 ml) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "500 ml",
                "price": 200,
                "desc": "Chilled 500ml PET bottle"
            },
            {
                "name": "1.5 L",
                "price": 350,
                "desc": "Chilled 1.5L family bottle"
            }
        ]
    },
    "drink_bottle_1500ml": {
        "id": "drink_bottle_1500ml",
        "title": "Bottle (1.5 L)",
        "category": "Sides Items & Drinks",
        "price": 350,
        "image": "images/dishes/bottle_1500ml.png",
        "lookBadge": "Qty: 1.5 L",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 180,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Large 1.5 Litre cold drink bottle ideal for family feasts and group dining.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Bottle (1.5 L) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "1.5 L",
                "price": 350,
                "desc": "Large 1.5L family bottle"
            }
        ]
    },
    "drink_lemon_soda": {
        "id": "drink_lemon_soda",
        "title": "Lemon Soda",
        "category": "Sides Items & Drinks",
        "price": 200,
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
        "lookBadge": "Qty: 1 Glass",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 180,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Zesty freshly squeezed lemon juice in fizzy soda with roasted cumin black salt and crushed mint.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Lemon Soda at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "Single Glass",
                "price": 200,
                "desc": "1 tall glass sparkling lemon mint soda"
            },
            {
                "name": "Jumbo Pitcher",
                "price": 380,
                "desc": "Large pitcher sparkling lemon mint soda"
            }
        ]
    },
    "drink_mineral_water_500ml": {
        "id": "drink_mineral_water_500ml",
        "title": "Mineral Water (500 ml)",
        "category": "Sides Items & Drinks",
        "price": 120,
        "image": "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80",
        "lookBadge": "Qty: 500 ml",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 200,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Chilled, sealed 500ml bottle of pure premium mineral drinking water.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Mineral Water (500 ml) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "500 ml",
                "price": 120,
                "desc": "500ml sealed pure mineral water bottle"
            },
            {
                "name": "1.5 L",
                "price": 200,
                "desc": "1.5L sealed pure mineral water bottle"
            }
        ]
    },
    "drink_mineral_water_1500ml": {
        "id": "drink_mineral_water_1500ml",
        "title": "Mineral Water (1.5 L)",
        "category": "Sides Items & Drinks",
        "price": 200,
        "image": "https://plus.unsplash.com/premium_photo-1681284939219-acfc2faa7eb8?w=600&q=80",
        "lookBadge": "Qty: 1.5 L",
        "spiceBadge": "Authentic Taste",
        "score": 4.9,
        "ratingCount": 180,
        "prep": "15-20 Mins (Live Charcoal)",
        "portion": "Serves 1-2 Persons",
        "style": "Live Acacia Charcoal Fire Grill",
        "desc": "Full 1.5 Litre sealed family bottle of pure premium mineral water.",
        "rail": [
            {
                "id": "side_sada_naan",
                "name": "Sada Naan",
                "price": 40,
                "desc": "Fresh hot clay oven tandoori naan",
                "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
            },
            {
                "id": "side_raita_imli",
                "name": "Raita & Imli",
                "price": 120,
                "desc": "Chilled mint zeera raita and tangy imli chutney",
                "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
            },
            {
                "id": "side_fresh_salad",
                "name": "Fresh Salad",
                "price": 150,
                "desc": "Crisp sliced salad platter",
                "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"
            },
            {
                "id": "drink_bottle_500ml",
                "name": "Bottle (500 ml)",
                "price": 200,
                "desc": "Chilled cold drink",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80"
            }
        ],
        "reviews": [
            {
                "author": "Mian Hamza Tariq",
                "location": "Johar Town, Lahore",
                "rating": 5,
                "date": "2 days ago",
                "title": "Unmatched Taste & Quality",
                "text": "The Mineral Water (1.5 L) at Kaka Bhaiya BBQ is simply outstanding. Freshly grilled, piping hot and seasoned to perfection."
            },
            {
                "author": "Chaudhry Bilal",
                "location": "Model Town, Lahore",
                "rating": 5,
                "date": "1 week ago",
                "title": "Real Charcoal Smokiness",
                "text": "True to their 1970 heritage. The smoky flavor and quality of meat is unmatched anywhere in Lahore."
            }
        ],
        "portions": [
            {
                "name": "1.5 L",
                "price": 200,
                "desc": "1.5L sealed pure mineral water bottle"
            }
        ]
    }

  };

    // ------------------------------------------------------------------------
    // URL PARAMETER PARSING & DISH SELECTION
    // ------------------------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    let dishParam = urlParams.get('id') || urlParams.get('dish') || 'beef_kabab_6';
    const aliasMap = {
      'special_beef_kabab': 'beef_kabab_6',
      'bhaiya_beef_kabab': 'beef_kabab_6',
      'beef_kabab': 'beef_kabab_6',
      'beef_boti': 'beef_boti_24',
      'beef_afghani_boti': 'beef_afghani_boti_24',
      'm_beef_kabab': 'beef_kabab_6',
      'm_beef_boti': 'beef_boti_24',
      'm_beef_afghani_boti': 'beef_afghani_boti_24'
    };
    if (aliasMap[dishParam]) {
      dishParam = aliasMap[dishParam];
    }

    let dish = catalog[dishParam];

    // If not found directly, try mapping or fallback intelligently
    if (!dish) {
      const stripped = dishParam.replace(/^(m_|sig_|look_)/, '');
      const matchKey = Object.keys(catalog).find(k => k.includes(stripped));
      if (matchKey) {
        dish = catalog[matchKey];
      }
    }

    // Fallback if dish not matched
    if (!dish) {
      dish = catalog['beef_kabab_12'];
    }

    // Update document & meta titles
    document.title = `${dish.title} | Kaka Bhaiya BBQ`;
    const breadcrumbName = document.getElementById('breadcrumb-dish-name');
    if (breadcrumbName) breadcrumbName.textContent = dish.title;

    // Populate Dish Display Elements
    const imgEl = document.getElementById('product-img');
    const badgeLookEl = document.getElementById('product-badge-look');
    const badgeSpiceEl = document.getElementById('product-badge-spice');
    const catEl = document.getElementById('product-category');
    const priceEl = document.getElementById('product-price');
    const priceSubtextEl = document.getElementById('product-price-subtext');
    const descEl = document.getElementById('product-desc');
    const scoreEl = document.getElementById('product-rating-score');
    const ratingCountEl = document.getElementById('product-rating-count');
    const prepEl = document.getElementById('product-spec-prep');
    const portionEl = document.getElementById('product-spec-portion');
    const styleEl = document.getElementById('product-spec-style');

    if (imgEl) {
      imgEl.src = dish.image;
      imgEl.alt = dish.title;
    }
    if (badgeLookEl) badgeLookEl.innerHTML = `<i class="bi bi-fire"></i> ${dish.lookBadge}`;
    if (badgeSpiceEl) badgeSpiceEl.innerHTML = `<i class="bi bi-thermometer-half"></i> ${dish.spiceBadge}`;
    if (catEl) catEl.textContent = dish.category;
    if (productTitleEl) productTitleEl.textContent = dish.title;
    if (descEl) descEl.textContent = dish.desc;
    if (scoreEl) scoreEl.textContent = Number(dish.score).toFixed(1);
    if (ratingCountEl) ratingCountEl.textContent = `(${dish.ratingCount} Verified Diner Reviews)`;
    if (prepEl) prepEl.textContent = dish.prep;
    if (portionEl) portionEl.textContent = dish.portion;
    if (styleEl) styleEl.textContent = dish.style;

    // Summary Score Card in Reviews Section
    const summaryScoreEl = document.getElementById('summary-score');
    const summaryTotalEl = document.getElementById('summary-total-reviews');
    if (summaryScoreEl) summaryScoreEl.textContent = Number(dish.score).toFixed(1);
    if (summaryTotalEl) summaryTotalEl.textContent = `Based on ${dish.ratingCount} customer ratings`;

    // ------------------------------------------------------------------------
    // DYNAMIC PORTION OPTIONS (product.html)
    // ------------------------------------------------------------------------
    const portionBoxEl = document.getElementById('product-portion-box');
    const portionSelectorEl = document.getElementById('product-portion-selector');

    const portionsList = (dish.portions && dish.portions.length > 0) ? dish.portions : [
      { name: dish.portion || 'Standard Serving', price: dish.price, desc: 'Fresh Preparation & Taxes Included' }
    ];

    let currentPortion = portionsList[0];

    // Initial price setup based on default portion
    if (priceEl) priceEl.textContent = `PKR ${currentPortion.price.toLocaleString()}`;
    if (priceSubtextEl) priceSubtextEl.innerHTML = `(Portion: <strong>${currentPortion.name}</strong> &bull; Fresh Preparation &amp; Taxes Included)`;

    if (portionSelectorEl) {
      // If dish is in Paratha Rolls or has only 1 portion option, hide the portion selector box entirely!
      if (dish.category === 'Paratha Rolls' || portionsList.length <= 1) {
        if (portionBoxEl) portionBoxEl.style.display = 'none';
      } else {
        if (portionBoxEl) portionBoxEl.style.display = 'block';
        let pButtonsHtml = '';
        portionsList.forEach((p, idx) => {
          const isActive = idx === 0 ? 'active' : '';
          pButtonsHtml += `
            <button class="portion-btn ${isActive}" data-portion="${p.name}" data-price="${p.price}" type="button">
              <span>${p.name}</span>
              <span class="portion-price-badge">PKR ${p.price.toLocaleString()}</span>
            </button>
          `;
        });
        portionSelectorEl.innerHTML = pButtonsHtml;

        // Wire click listeners on portion buttons
        portionSelectorEl.querySelectorAll('.portion-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            portionSelectorEl.querySelectorAll('.portion-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const pName = btn.dataset.portion;
            const pPrice = Number(btn.dataset.price) || dish.price;
            currentPortion = { name: pName, price: pPrice };

            if (priceEl) priceEl.textContent = `PKR ${pPrice.toLocaleString()}`;
            if (priceSubtextEl) priceSubtextEl.innerHTML = `(Portion: <strong>${pName}</strong> &bull; Fresh Preparation &amp; Taxes Included)`;

            updateCalculationAndWhatsapp();
          });
        });
      }
    }

    // ------------------------------------------------------------------------
    // POPULATE CHEF-CURATED SIDES & PAIRINGS (Section & Quick Checklist)
    // ------------------------------------------------------------------------
    const sideParentNameEl = document.getElementById('side-dish-parent-name');
    if (sideParentNameEl) {
      sideParentNameEl.textContent = dish.title;
    }

    // Guarantee all 7 authentic side items (Fresh Naan, Roti, Paratha, Raita, Salad, Imli Sauce, Cold Drink)
    const sideItems = (typeof AUTHENTIC_SIDES !== 'undefined' && AUTHENTIC_SIDES.length > 0) ? AUTHENTIC_SIDES : (dish.rail || []);

    // 1. Standalone Side Cards Grid (#product-side-items-grid)
    const sideGridEl = document.getElementById('product-side-items-grid');
    if (sideGridEl) {
      let sideCardsHtml = '';
      sideItems.forEach(side => {
        sideCardsHtml += `
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="side-item-card h-100 d-flex flex-column justify-content-between">
              <div class="side-item-thumb">
                <img src="${side.image}" alt="${side.name}" loading="lazy">
                <span class="side-item-badge"><i class="bi bi-shield-check"></i> Fresh Pairing</span>
              </div>
              <div class="side-item-content p-3 d-flex flex-column flex-grow-1 justify-content-between">
                <div>
                  <h5 class="side-item-title">${side.name}</h5>
                  <p class="side-item-desc">${side.desc}</p>
                </div>
                <div class="side-item-footer pt-3 border-top d-flex justify-content-between align-items-center">
                  <span class="side-item-price">PKR ${side.price.toLocaleString()}</span>
                  <button class="btn btn-side-add" data-id="${side.id}" data-name="${side.name}" data-price="${side.price}" data-image="${side.image}">
                    <i class="bi bi-plus-lg"></i> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      sideGridEl.innerHTML = sideCardsHtml;

      // Event listener for standalone side "+ Add" buttons
      sideGridEl.querySelectorAll('.btn-side-add').forEach(btn => {
        btn.addEventListener('click', () => {
          const sId = btn.dataset.id;
          const sName = btn.dataset.name;
          const sPrice = Number(btn.dataset.price);
          const sImg = btn.dataset.image;

          if (window.addToCart) {
            window.addToCart({
              id: sId,
              name: sName,
              price: sPrice,
              image: sImg,
              category: 'Sides & Accompaniments'
            });
          }

          const drawerEl = document.getElementById('cartDrawer') || document.getElementById('offcanvasCart');
          if (drawerEl && typeof bootstrap !== 'undefined') {
            const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
            bsDrawer.show();
          }
        });
      });
    }

    // 2. Quick Addon Checklist inside Product Card (#quick-addons-list)
    const quickAddonsListEl = document.getElementById('quick-addons-list');
    const combinedTotalEl = document.getElementById('combined-total-price');

    if (quickAddonsListEl) {
      let quickHtml = '';
      sideItems.forEach((side, idx) => {
        quickHtml += `
          <label class="addon-check-item" for="addon-cb-${idx}">
            <div class="addon-check-label">
              <input type="checkbox" class="addon-checkbox" id="addon-cb-${idx}" data-id="${side.id}" data-name="${side.name}" data-price="${side.price}" data-image="${side.image}">
              <span>${side.name}</span>
            </div>
            <span class="addon-check-price">+PKR ${side.price.toLocaleString()}</span>
          </label>
        `;
      });
      quickAddonsListEl.innerHTML = quickHtml;

      quickAddonsListEl.querySelectorAll('.addon-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
          const parentItem = cb.closest('.addon-check-item');
          if (parentItem) {
            parentItem.classList.toggle('active', cb.checked);
          }
          updateCalculationAndWhatsapp();
        });
      });
    }

    // Quantity Stepper & Calculation
    let currentQty = 1;
    const qtyInput = document.getElementById('product-qty-input');
    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');

    function getSelectedSides() {
      const selected = [];
      if (quickAddonsListEl) {
        quickAddonsListEl.querySelectorAll('.addon-checkbox:checked').forEach(cb => {
          selected.push({
            id: cb.dataset.id,
            name: cb.dataset.name,
            price: Number(cb.dataset.price),
            image: cb.dataset.image
          });
        });
      }
      return selected;
    }

    function updateCalculationAndWhatsapp() {
      const selectedSides = getSelectedSides();
      const sidesTotal = selectedSides.reduce((sum, s) => sum + s.price, 0);
      const dishTotal = currentPortion.price * currentQty;
      const combinedTotal = dishTotal + sidesTotal;

      if (combinedTotalEl) {
        combinedTotalEl.textContent = `PKR ${combinedTotal.toLocaleString()}`;
      }
    }

    updateCalculationAndWhatsapp();

    if (minusBtn && plusBtn && qtyInput) {
      minusBtn.addEventListener('click', () => {
        if (currentQty > 1) {
          currentQty--;
          qtyInput.value = currentQty;
          updateCalculationAndWhatsapp();
        }
      });

      plusBtn.addEventListener('click', () => {
        if (currentQty < 20) {
          currentQty++;
          qtyInput.value = currentQty;
          updateCalculationAndWhatsapp();
        }
      });
    }

    // Add to Feast Cart Button (Adds Main Dish with Selected Portion + Checked Sides)
    const addDetailCartBtn = document.getElementById('btn-add-detail-cart');
    if (addDetailCartBtn) {
      addDetailCartBtn.addEventListener('click', () => {
        let localCart = [];
        try {
          localCart = JSON.parse(localStorage.getItem('kaka_bbq_cart')) || [];
        } catch (e) {
          localCart = [];
        }

        const portionNote = currentPortion.name ? ` (${currentPortion.name})` : '';
        const uniqueCartId = currentPortion.name 
          ? `${dish.id}_${currentPortion.name.replace(/[^a-zA-Z0-9]/g, '_')}`
          : dish.id;
        const fullName = `${dish.title}${portionNote}`;

        const existingMain = localCart.find(item => item.id === uniqueCartId);
        if (existingMain) {
          existingMain.quantity += currentQty;
        } else {
          localCart.push({
            id: uniqueCartId,
            name: fullName,
            portion: currentPortion.name || '',
            price: currentPortion.price,
            image: dish.image,
            category: dish.category,
            quantity: currentQty
          });
        }

        // Add selected side items
        const selectedSides = getSelectedSides();
        selectedSides.forEach(side => {
          const existingSide = localCart.find(item => item.id === side.id);
          if (existingSide) {
            existingSide.quantity += 1;
          } else {
            localCart.push({
              id: side.id,
              name: side.name,
              price: side.price,
              image: side.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80',
              category: 'Sides & Accompaniments',
              quantity: 1
            });
          }
        });

        saveCart(localCart);
        if (window.animateCartBadges) window.animateCartBadges();
        if (window.renderOffcanvasCart) window.renderOffcanvasCart();
        if (window.renderOrderPageCart) window.renderOrderPageCart();
        if (window.updateFloatingCartBar) window.updateFloatingCartBar();

        // Open offcanvas drawer
        const drawerEl = document.getElementById('cartDrawer') || document.getElementById('offcanvasCart');
        if (drawerEl && typeof bootstrap !== 'undefined') {
          const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
          bsDrawer.show();
        }

        if (window.showToast) {
          const sideCountText = selectedSides.length > 0 ? ` + ${selectedSides.length} side items` : '';
          window.showToast(`Added ${currentQty}x ${fullName}${sideCountText} to your Feast Cart!`, 'bi-bag-check-fill');
        }
      });
    }

    // Cart Open Button on Product Page
    const cartOpenBtn = document.getElementById('cartOpenBtn');
    if (cartOpenBtn) {
      cartOpenBtn.addEventListener('click', () => {
        const drawerEl = document.getElementById('cartDrawer') || document.getElementById('offcanvasCart');
        if (drawerEl && typeof bootstrap !== 'undefined') {
          const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
          bsDrawer.show();
        }
      });
    }

    // Interactive Star Rating Picker
    const starPicker = document.getElementById('star-picker');
    const ratingValInput = document.getElementById('review-rating-val');
    if (starPicker && ratingValInput) {
      const stars = starPicker.querySelectorAll('i');

      stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
          const val = parseInt(star.dataset.value, 10);
          stars.forEach(s => {
            const sVal = parseInt(s.dataset.value, 10);
            s.classList.toggle('hover', sVal <= val);
          });
        });

        star.addEventListener('mouseleave', () => {
          stars.forEach(s => s.classList.remove('hover'));
        });

        star.addEventListener('click', () => {
          const val = parseInt(star.dataset.value, 10);
          ratingValInput.value = val;
          stars.forEach(s => {
            const sVal = parseInt(s.dataset.value, 10);
            s.classList.toggle('selected', sVal <= val);
          });
        });
      });
    }

    // Customer Reviews Feed Engine
    const reviewsFeed = document.getElementById('product-reviews-feed');
    const feedCountEl = document.getElementById('reviews-feed-count');

    function getSavedReviews() {
      try {
        const saved = localStorage.getItem(`kaka_reviews_${dish.id}`);
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }

    function renderReviews() {
      if (!reviewsFeed) return;
      const userReviews = getSavedReviews();
      const allReviews = [...userReviews, ...(dish.reviews || [])];

      if (feedCountEl) {
        feedCountEl.textContent = allReviews.length;
      }

      let reviewsHtml = '';
      allReviews.forEach(rev => {
        const initials = rev.author.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
        let starHtml = '';
        for (let i = 1; i <= 5; i++) {
          starHtml += `<i class="bi bi-star${i <= rev.rating ? '-fill text-warning' : ' text-muted'}"></i>`;
        }

        reviewsHtml += `
          <article class="review-card-item">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="d-flex align-items-center gap-3">
                <div class="review-author-avatar">${initials}</div>
                <div>
                  <h6 class="fw-bold mb-0 text-charcoal">${rev.author}</h6>
                  <small class="text-muted"><i class="bi bi-geo-alt"></i> ${rev.location} &bull; ${rev.date}</small>
                </div>
              </div>
              <span class="review-badge-verified">
                <i class="bi bi-patch-check-fill"></i> Verified Diner
              </span>
            </div>
            <div class="fs-6 my-2">${starHtml}</div>
            <h6 class="fw-bold text-charcoal mb-1">${rev.title}</h6>
            <p class="text-muted small mb-0">${rev.text}</p>
          </article>
        `;
      });

      reviewsFeed.innerHTML = reviewsHtml;
    }

    renderReviews();

    // Review Form Submit
    const reviewForm = document.getElementById('product-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const author = document.getElementById('review-author').value.trim();
        const location = document.getElementById('review-location').value.trim();
        const title = document.getElementById('review-title').value.trim();
        const body = document.getElementById('review-body').value.trim();
        const rating = parseInt(ratingValInput ? ratingValInput.value : '5', 10);

        if (!author || !location || !title || !body) return;

        const newReview = {
          author,
          location,
          rating,
          date: 'Just now',
          title,
          text: body,
          verified: true
        };

        const existing = getSavedReviews();
        existing.unshift(newReview);
        try {
          localStorage.setItem(`kaka_reviews_${dish.id}`, JSON.stringify(existing));
        } catch (err) {
          console.error(err);
        }

        renderReviews();
        reviewForm.reset();

        // Reset stars
        if (starPicker && ratingValInput) {
          ratingValInput.value = 5;
          const stars = starPicker.querySelectorAll('i');
          stars.forEach(s => s.classList.add('selected'));
        }

        if (window.showToast) {
          window.showToast(`Thank you ${author}! Your review for ${dish.title} is now published.`, 'bi-chat-heart-fill');
        }
      });
    }

    // Related Dishes Row (Deduplicated by product base name)
    const relatedRow = document.getElementById('related-dishes-row');
    if (relatedRow) {
      const getBaseName = (t) => (t || '')
        .replace(/\s*\(\s*\d+(?:\.\d+)?\s*(?:pc|pcs|pieces|ml|l|litre|litres)\s*\)/gi, '')
        .replace(/\s+\d+(?:\.\d+)?\s*(?:pc|pcs|pieces)$/gi, '')
        .trim().toLowerCase();

      const seenBases = new Set();
      const currentBase = getBaseName(dish.title);
      seenBases.add(currentBase);

      const candidateKeys = Object.keys(catalog).filter(k => {
        if (k === dish.id || k.startsWith('sig_')) return false;
        const item = catalog[k];
        const base = getBaseName(item.title);
        if (seenBases.has(base)) return false;
        seenBases.add(base);
        return true;
      });

      // Prefer same category first, then others
      const sameCat = candidateKeys.filter(k => catalog[k].category === dish.category);
      const otherCat = candidateKeys.filter(k => catalog[k].category !== dish.category);
      const finalKeys = [...sameCat, ...otherCat].slice(0, 3);

      let relatedHtml = '';
      finalKeys.forEach(k => {
        const item = catalog[k];
        const cleanTitle = (item.title || '')
          .replace(/\s*\(\s*\d+(?:\.\d+)?\s*(?:pc|pcs|pieces|ml|l|litre|litres)\s*\)/gi, '')
          .replace(/\s+\d+(?:\.\d+)?\s*(?:pc|pcs|pieces)$/gi, '')
          .trim();
        relatedHtml += `
          <div class="col-md-4">
            <div class="card h-100 border rounded-4 overflow-hidden shadow-sm">
              <div style="height: 200px; overflow: hidden; position: relative;">
                <img src="${item.image}" alt="${cleanTitle}" class="w-100 h-100 object-fit-cover" loading="lazy">
                <span class="position-absolute top-0 start-0 m-3 badge bg-dark text-white rounded-pill">${item.lookBadge || ''}</span>
              </div>
              <div class="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <small class="text-fire fw-bold">${item.category}</small>
                  <h5 class="fw-bold mt-1 mb-2">${cleanTitle}</h5>
                  <p class="text-muted small">${(item.desc || '').substring(0, 95)}...</p>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span class="fw-bold text-dark fs-5">PKR ${(item.price || 0).toLocaleString()}</span>
                  <a href="product.html?id=${item.id}" class="btn btn-outline-bbq btn-sm">
                    View Details <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      relatedRow.innerHTML = relatedHtml;
    }
  }

  // ------------------------------------------------------------------------
  // 18. Global Dish Card Interaction (Quick View Details)
  // ------------------------------------------------------------------------
  document.querySelectorAll('.dish-card').forEach(card => {
    const btn = card.querySelector('.btn-add-cart');
    if (btn) {
      const dishId = btn.dataset.id;
      const thumb = card.querySelector('.dish-card-thumb');
      const title = card.querySelector('.dish-title');

      if (thumb && !thumb.querySelector('a')) {
        thumb.style.cursor = 'pointer';
        thumb.setAttribute('title', 'Click to view dish details & reviews');
        thumb.addEventListener('click', (e) => {
          if (!e.target.closest('button')) {
            window.location.href = `product.html?id=${dishId}`;
          }
        });
      }

      if (title && !title.querySelector('a')) {
        title.style.cursor = 'pointer';
        title.setAttribute('title', 'Click to view dish details & reviews');
        title.addEventListener('click', () => {
          window.location.href = `product.html?id=${dishId}`;
        });
      }
    }
  });
});
