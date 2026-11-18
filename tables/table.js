/**
 * ==============================================================================
 * KAKA BHAIYA BBQ - SMART TABLE ORDERING JAVASCRIPT (tables/table.js)
 * High-performance, reactive dining ordering system for tables 1 to 12.
 * Pure Vanilla JavaScript (ES6+) with Bootstrap 5.
 *
 * FEATURES:
 * - Runtime dish grouping: multiple quantity variants merged into 1 card with selectable chips
 * - Full title & full description rendering (zero truncation/ellipses)
 * - Exclusive Deals stay standalone with no option chips
 * - Per-variant cart management & WhatsApp kitchen dispatch
 * - Table cart isolation in localStorage (`cart_table_${TABLE_NUMBER}`)
 * ==============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. CONFIGURATION
  // --------------------------------------------------------------------------
  /**
   * Restaurant WhatsApp Number (International format without '+' or leading zero)
   * Easily update this constant if restaurant phone changes.
   */
  const RESTAURANT_WHATSAPP = "923228019941";

  /**
   * Detect current table number from body attribute or URL fallback
   */
  function getCurrentTableNumber() {
    const bodyAttr = document.body.getAttribute('data-table');
    if (bodyAttr && !isNaN(parseInt(bodyAttr, 10))) {
      return parseInt(bodyAttr, 10);
    }
    const params = new URLSearchParams(window.location.search);
    const queryTable = params.get('table');
    if (queryTable && !isNaN(parseInt(queryTable, 10))) {
      return parseInt(queryTable, 10);
    }
    const match = window.location.pathname.match(/table-(\d+)\.html/i);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return 1;
  }

  const TABLE_NUMBER = getCurrentTableNumber();
  const STORAGE_KEY = `cart_table_${TABLE_NUMBER}`;

  // --------------------------------------------------------------------------
  // 2. STATE MANAGEMENT
  // --------------------------------------------------------------------------
  let activeCategory = 'All';
  let searchQuery = '';

  /**
   * Tracks currently selected variant ID per dish group
   * Format: { [groupId]: variantId }
   */
  const selectedVariantMap = {};

  /**
   * Load cart from localStorage for this specific table
   * @returns {Array} Array of cart item objects
   */
  function getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage:', e);
      return [];
    }
  }

  /**
   * Save cart to localStorage for this specific table
   * @param {Array} cart
   */
  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }

  /**
   * Clear table cart
   */
  function clearCart() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing cart:', e);
    }
  }

  /**
   * Resolve local image path so it correctly points from tables/ directory
   */
  function resolveImgPath(src) {
    if (!src) return '../images/logo.jpg';
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//') || src.startsWith('data:')) {
      return src;
    }
    if (src.startsWith('../')) {
      return src;
    }
    if (src.startsWith('/')) {
      return '..' + src;
    }
    return '../' + src;
  }

  /**
   * Fallback aliases for backward compatibility with previous ID schemes
   */
  const ID_FALLBACKS = {
    'beef_kabab_6': 'beef_kabab_6_seekh',
    'beef_kabab_12': 'beef_kabab_12_seekh',
    'beef_boti_24': 'beef_boti_6_seekh',
    'beef_boti_48': 'beef_boti_12_seekh',
    'beef_afghani_boti_24': 'beef_afghani_boti_6_seekh',
    'beef_afghani_boti_48': 'beef_afghani_boti_12_seekh',
    'chicken_kabab_6': 'chicken_kabab_6_seekh',
    'chicken_tikka_boti_12': 'chicken_tikka_boti_3_seekh',
    'chicken_boneless_boti_24': 'chicken_boneless_boti_6_seekh',
    'chicken_malai_boti_24': 'chicken_malai_boti_6_seekh',
    'chicken_green_boti_24': 'chicken_green_boti_6_seekh',
    'fish_grill': 'fish_grill_1_kg'
  };

  /**
   * Find dish data by ID from shared menu catalog
   */
  function getDishById(id) {
    if (!window.TABLE_MENU_DATA || !Array.isArray(window.TABLE_MENU_DATA)) {
      return null;
    }
    const resolvedId = ID_FALLBACKS[id] || id;
    return window.TABLE_MENU_DATA.find(item => item.id === resolvedId) || null;
  }

  // --------------------------------------------------------------------------
  // 3. GROUPING & VARIANT HELPERS
  // --------------------------------------------------------------------------

  /**
   * Strip trailing parentheses specifications (e.g. "(1 Seekh)", "(Half KG)", "(500 ml)")
   * to get the base dish name for grouping.
   */
  function getBaseName(title, category) {
    if (category === 'Exclusive Deals') return title;
    return title.replace(/\s*\([^)]+\)\s*$/i, '').trim();
  }

  /**
   * Extract quantity chip label dynamically from dish data
   */
  function getVariantLabel(item) {
    if (item.variantLabel) return item.variantLabel;
    if (item.lookBadge && /^qty:\s*/i.test(item.lookBadge)) {
      return item.lookBadge.replace(/^qty:\s*/i, '').trim();
    }
    const match = item.title.match(/\(([^)]+)\)$/);
    if (match) return match[1].trim();
    return item.lookBadge || 'Standard';
  }

  /**
   * Construct cart item title with explicit quantity version
   */
  function getCartItemTitle(dish, variantLabel) {
    if (dish.category === 'Exclusive Deals') return dish.title;
    if (/\([^)]+\)$/.test(dish.title)) return dish.title;
    if (variantLabel && !dish.title.includes(variantLabel)) {
      return `${dish.title} (${variantLabel})`;
    }
    return dish.title;
  }

  /**
   * Group dishes by category and baseName at runtime
   * Groups with >1 variant become single cards with quantity chips
   * Exclusive Deals and single-variant dishes remain standalone without chips
   */
  function getGroupedDishes() {
    const rawDishes = window.TABLE_MENU_DATA || [];
    const groups = [];
    const groupMap = new Map();

    rawDishes.forEach(dish => {
      // Exclusive Deals are never grouped and never have chips
      if (dish.category === 'Exclusive Deals') {
        groups.push({
          id: dish.id,
          baseName: dish.title,
          category: dish.category,
          isDeal: true,
          variants: [dish]
        });
        return;
      }

      const baseName = getBaseName(dish.title, dish.category);
      const key = `${dish.category}:::${baseName.toLowerCase()}`;

      if (!groupMap.has(key)) {
        const group = {
          id: 'grp_' + dish.category.replace(/[^a-z0-9]/gi, '_') + '_' + baseName.replace(/[^a-z0-9]/gi, '_'),
          baseName: baseName,
          category: dish.category,
          isDeal: false,
          variants: []
        };
        groupMap.set(key, group);
        groups.push(group);
      }

      groupMap.get(key).variants.push(dish);
    });

    return groups;
  }

  /**
   * Retrieve active selected variant for a group
   */
  function getActiveVariant(group) {
    if (!group || !group.variants || group.variants.length === 0) return null;
    const currentId = selectedVariantMap[group.id];
    if (currentId) {
      const found = group.variants.find(v => v.id === currentId);
      if (found) return found;
    }
    // Default to the first (lowest quantity) variant
    return group.variants[0];
  }

  // --------------------------------------------------------------------------
  // 4. CART ACTIONS
  // --------------------------------------------------------------------------
  function addToCart(variantId) {
    const dish = getDishById(variantId);
    if (!dish) return;
    if (dish.isComingSoon || dish.price === null || dish.price === undefined) return;

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === variantId);
    const variantLabel = getVariantLabel(dish);
    const formattedTitle = getCartItemTitle(dish, variantLabel);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: dish.id,
        title: formattedTitle,
        price: Number(dish.price) || 0,
        image: dish.image || '',
        category: dish.category || '',
        qty: 1
      });
    }

    saveCart(cart);
    renderAll();
  }

  function updateQty(variantId, delta) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === variantId);
    if (existingIndex === -1) return;

    cart[existingIndex].qty += delta;

    if (cart[existingIndex].qty <= 0) {
      cart.splice(existingIndex, 1);
    }

    saveCart(cart);
    renderAll();
  }

  function removeFromCart(variantId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== variantId);
    saveCart(cart);
    renderAll();
  }

  // --------------------------------------------------------------------------
  // 5. RENDERING FUNCTIONS
  // --------------------------------------------------------------------------

  /**
   * Render Category Navigation Tabs/Pills
   */
  function renderCategories() {
    const container = document.getElementById('table-category-scroll');
    if (!container) return;

    const categories = [
      'All',
      'Exclusive Deals',
      'Beef B.B.Q',
      'Chicken B.B.Q',
      'Paratha Rolls',
      'Fish (Seasonal)',
      'Sides Items & Drinks'
    ];

    container.innerHTML = categories.map(cat => {
      const isActive = cat === activeCategory;
      let icon = 'bi-grid-fill';
      if (cat === 'Exclusive Deals') icon = 'bi-fire';
      else if (cat === 'Beef B.B.Q') icon = 'bi-shield-shaded';
      else if (cat === 'Chicken B.B.Q') icon = 'bi-egg-fried';
      else if (cat === 'Paratha Rolls') icon = 'bi-circle-square';
      else if (cat === 'Fish (Seasonal)') icon = 'bi-water';
      else if (cat === 'Sides Items & Drinks') icon = 'bi-cup-straw';

      return `
        <button type="button" class="table-cat-pill ${isActive ? 'active' : ''}" data-category="${cat}">
          <i class="bi ${icon}"></i>
          <span>${cat}</span>
        </button>
      `;
    }).join('');

    // Attach click events
    container.querySelectorAll('.table-cat-pill').forEach(btn => {
      btn.addEventListener('click', function () {
        activeCategory = this.getAttribute('data-category');
        renderCategories();
        renderDishesGrid();
      });
    });
  }

  /**
   * Render Dishes Grid (Grouped Cards with Quantity Chips)
   */
  function renderDishesGrid() {
    const grid = document.getElementById('table-dishes-grid');
    if (!grid) return;

    const allGroups = getGroupedDishes();
    const cart = getCart();

    // 1. Filter by Active Category
    let filtered = allGroups;
    if (activeCategory !== 'All') {
      filtered = filtered.filter(g => g.category === activeCategory);
    }

    // 2. Filter by Live Search Query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const isDealQuery = q.includes('deal') || q.includes('person') || q.includes('family') || q.includes('feast') || q.includes('shapata') || q.includes('combo');

      filtered = filtered.filter(g => {
        const isDeal = g.isDeal || g.category === 'Exclusive Deals';

        // When searching for side items (naan, roti, bottle, etc.), do not match deals by their accompaniment descriptions
        if (isDeal) {
          if (!isDealQuery) {
            return g.baseName && g.baseName.toLowerCase().includes(q);
          }
          return (g.baseName && g.baseName.toLowerCase().includes(q)) ||
                 g.variants.some(v => v.desc && v.desc.toLowerCase().includes(q));
        }

        const baseMatch = g.baseName && g.baseName.toLowerCase().includes(q);
        const catMatch = g.category && g.category.toLowerCase().includes(q);
        const variantMatch = g.variants.some(v => {
          const t = v.title && v.title.toLowerCase().includes(q);
          const d = v.desc && v.desc.toLowerCase().includes(q);
          const b = v.lookBadge && v.lookBadge.toLowerCase().includes(q);
          return t || d || b;
        });
        return baseMatch || catMatch || variantMatch;
      });
    }

    // Empty state
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 py-5 text-center">
          <div class="p-4 rounded-4 bg-white border">
            <i class="bi bi-search text-secondary display-4 d-block mb-3"></i>
            <h4 class="fw-bold mb-2">No Dishes Found</h4>
            <p class="text-muted small mb-3">No menu items match your search for "${escapeHtml(searchQuery)}".</p>
            <button class="btn btn-sm btn-outline-danger rounded-pill px-3" id="btn-clear-search">
              <i class="bi bi-x-circle me-1"></i> Clear Search
            </button>
          </div>
        </div>
      `;
      const clearBtn = document.getElementById('btn-clear-search');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          searchQuery = '';
          const input = document.getElementById('table-search-input');
          if (input) input.value = '';
          renderDishesGrid();
        });
      }
      return;
    }

    // Render grouped cards
    grid.innerHTML = filtered.map(group => {
      const activeVariant = getActiveVariant(group);
      if (!activeVariant) return '';

      const cartItem = cart.find(ci => ci.id === activeVariant.id);
      const inCart = !!cartItem;
      const qty = cartItem ? cartItem.qty : 0;
      const imgSrc = resolveImgPath(activeVariant.image);

      // Card Title:
      // For groups with >1 variant: clean baseName (e.g. "Beef Boti")
      // For single variant dishes: original title (e.g. "Chicken Kabab (6 PC)")
      const cardTitle = (group.variants.length > 1 && !group.isDeal) ? group.baseName : activeVariant.title;

      // Full description (never truncated)
      const cardDesc = activeVariant.desc || 'Freshly prepared authentic live charcoal specialty.';

      // Check if item is Coming Soon (e.g. Fried Fish)
      const isComingSoon = Boolean(activeVariant.isComingSoon || activeVariant.price === null || activeVariant.price === undefined);

      // Badges
      const lookBadgeText = isComingSoon ? 'Coming Soon' : (activeVariant.lookBadge || activeVariant.category);
      const spiceBadgeText = activeVariant.spiceBadge || '';

      // Quantity Chips: Show ONLY if group has >1 variant AND is NOT an Exclusive Deal AND NOT Coming Soon
      const hasChips = !group.isDeal && !isComingSoon && group.variants.length > 1;

      return `
        <div class="col-6 col-md-4 col-lg-3 d-flex align-items-stretch">
          <div class="table-dish-card w-100" id="card-${group.id}">
            <!-- Card Thumbnail & Badges -->
            <div class="table-dish-thumb">
              <img src="${imgSrc}" alt="${escapeHtml(cardTitle)}" class="table-dish-img" loading="lazy" onerror="this.src='../images/logo.jpg'">
              <div class="table-dish-badges">
                <span class="${isComingSoon ? 'table-badge-coming-soon-tag' : 'table-badge-cat'}">${escapeHtml(lookBadgeText)}</span>
                ${(!isComingSoon && spiceBadgeText) ? `<span class="table-badge-spice">${escapeHtml(spiceBadgeText)}</span>` : ''}
              </div>
            </div>

            <!-- Card Body -->
            <div class="table-dish-body">
              <div>
                <!-- Full Title (Wrapped, No Ellipsis) -->
                <h3 class="table-dish-title">${escapeHtml(cardTitle)}</h3>

                <!-- Full Description (Wrapped, No Line-Clamp) -->
                <p class="table-dish-desc">${escapeHtml(cardDesc)}</p>

                <!-- Quantity Option Chips (For multi-variant items) -->
                ${hasChips ? `
                  <div class="table-dish-chips" data-group="${group.id}">
                    ${group.variants.map(v => {
                      const vLabel = getVariantLabel(v);
                      const isSelected = v.id === activeVariant.id;
                      return `<button type="button" class="table-chip-btn ${isSelected ? 'active' : ''}" data-chip-action="select" data-group-id="${group.id}" data-variant-id="${v.id}" title="Select ${escapeHtml(vLabel)}">${escapeHtml(vLabel)}</button>`;
                    }).join('')}
                  </div>
                ` : ''}
              </div>

              <!-- Card Bottom Foot: Price & Add/Stepper Button (Always aligned at bottom) -->
              <div class="table-dish-foot ${isComingSoon ? 'table-dish-foot-coming-soon' : ''}">
                ${isComingSoon ? `
                  <div class="w-100 text-center">
                    <span class="table-badge-coming-soon-single">
                      <i class="bi bi-clock-history me-1"></i> Coming Soon
                    </span>
                  </div>
                ` : `
                  <div class="table-dish-price">
                    <small>Rs.</small> ${Number(activeVariant.price).toLocaleString()}
                  </div>
                  <div class="table-dish-action" id="action-${group.id}">
                    ${inCart ? `
                      <div class="table-stepper">
                        <button type="button" class="table-stepper-btn" data-action="decrease" data-id="${activeVariant.id}" aria-label="Decrease quantity">−</button>
                        <span class="table-stepper-qty">${qty}</span>
                        <button type="button" class="table-stepper-btn" data-action="increase" data-id="${activeVariant.id}" aria-label="Increase quantity">+</button>
                      </div>
                    ` : `
                      <button type="button" class="table-btn-add" data-action="add" data-id="${activeVariant.id}">
                        <i class="bi bi-plus-lg"></i>
                        <span>Add</span>
                      </button>
                    `}
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Chip Selection Listeners
    grid.querySelectorAll('[data-chip-action="select"]').forEach(chipBtn => {
      chipBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const groupId = this.getAttribute('data-group-id');
        const variantId = this.getAttribute('data-variant-id');
        selectedVariantMap[groupId] = variantId;
        renderDishesGrid();
      });
    });

    // Attach Add and Stepper Button Listeners
    grid.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const action = this.getAttribute('data-action');
        const variantId = this.getAttribute('data-id');

        if (action === 'add') {
          addToCart(variantId);
        } else if (action === 'increase') {
          updateQty(variantId, 1);
        } else if (action === 'decrease') {
          updateQty(variantId, -1);
        }
      });
    });
  }

  /**
   * Render Offcanvas Cart Drawer
   */
  function renderCartDrawer() {
    const cart = getCart();
    const itemsContainer = document.getElementById('table-cart-items');
    const totalEl = document.getElementById('table-cart-total-price');
    const totalHeaderEl = document.getElementById('table-cart-header-count');
    const confirmBtn = document.getElementById('btn-confirm-table-order');

    let totalQty = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      totalQty += item.qty;
      totalPrice += item.price * item.qty;
    });

    if (totalHeaderEl) {
      totalHeaderEl.textContent = `${totalQty} ${totalQty === 1 ? 'item' : 'items'}`;
    }

    if (totalEl) {
      totalEl.textContent = `Rs. ${totalPrice.toLocaleString()}`;
    }

    if (itemsContainer) {
      if (cart.length === 0) {
        itemsContainer.innerHTML = `
          <div class="table-empty-state">
            <div class="table-empty-icon">
              <i class="bi bi-basket3"></i>
            </div>
            <h5 class="fw-bold mb-1">Your Table Cart is Empty</h5>
            <p class="small text-muted mb-0">Browse our charcoal delicacies and tap "+ Add" to begin your table order.</p>
          </div>
        `;
        if (confirmBtn) {
          confirmBtn.disabled = true;
          confirmBtn.classList.add('opacity-50');
        }
      } else {
        if (confirmBtn) {
          confirmBtn.disabled = false;
          confirmBtn.classList.remove('opacity-50');
        }

        itemsContainer.innerHTML = cart.map(item => {
          const itemTotal = item.price * item.qty;
          const imgSrc = resolveImgPath(item.image);

          return `
            <div class="table-cart-item">
              <img src="${imgSrc}" alt="${escapeHtml(item.title)}" class="table-cart-item-img" onerror="this.src='../images/logo.jpg'">
              <div class="table-cart-item-info">
                <div class="table-cart-item-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</div>
                <div class="table-cart-item-price">Rs. ${item.price.toLocaleString()} × ${item.qty} = <span class="text-dark fw-bold">Rs. ${itemTotal.toLocaleString()}</span></div>
              </div>
              <div class="table-cart-stepper">
                <button type="button" data-cart-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                <span>${item.qty}</span>
                <button type="button" data-cart-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="table-cart-remove ms-1" data-cart-action="remove" data-id="${item.id}" title="Remove item" aria-label="Remove item">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          `;
        }).join('');

        // Attach events inside drawer
        itemsContainer.querySelectorAll('[data-cart-action]').forEach(btn => {
          btn.addEventListener('click', function () {
            const action = this.getAttribute('data-cart-action');
            const dishId = this.getAttribute('data-id');

            if (action === 'increase') {
              updateQty(dishId, 1);
            } else if (action === 'decrease') {
              updateQty(dishId, -1);
            } else if (action === 'remove') {
              removeFromCart(dishId);
            }
          });
        });
      }
    }
  }

  /**
   * Render Floating Bottom Cart Bar (Mobile)
   */
  function renderBottomBar() {
    const bottomBar = document.getElementById('table-bottom-bar');
    if (!bottomBar) return;

    const cart = getCart();
    let totalQty = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      totalQty += item.qty;
      totalPrice += item.price * item.qty;
    });

    const countEl = document.getElementById('table-bottom-count');
    const totalEl = document.getElementById('table-bottom-total');

    if (totalQty > 0) {
      if (countEl) countEl.textContent = `${totalQty} ${totalQty === 1 ? 'item' : 'items'}`;
      if (totalEl) totalEl.textContent = `Rs. ${totalPrice.toLocaleString()}`;
      bottomBar.classList.add('show');
    } else {
      bottomBar.classList.remove('show');
    }
  }

  /**
   * Update badges in navigation header
   */
  function renderNavBadges() {
    const cart = getCart();
    let totalQty = 0;
    cart.forEach(item => { totalQty += item.qty; });

    document.querySelectorAll('.cart-badge, .cart-badge-count').forEach(el => {
      el.textContent = totalQty;
      if (el.classList.contains('badge-count')) {
        el.style.display = totalQty > 0 ? 'inline-block' : 'none';
      }
    });
  }

  /**
   * Master Render Function
   */
  function renderAll() {
    renderDishesGrid();
    renderCartDrawer();
    renderBottomBar();
    renderNavBadges();
  }

  // --------------------------------------------------------------------------
  // 6. ORDER CONFIRMATION & WHATSAPP DISPATCH
  // --------------------------------------------------------------------------
  function handleOrderConfirmation() {
    const cart = getCart();
    const alertBox = document.getElementById('table-order-alert');
    const nameInput = document.getElementById('table-customer-name');
    const instructionsInput = document.getElementById('table-special-instructions');

    // Reset alert
    if (alertBox) {
      alertBox.classList.add('d-none');
      alertBox.textContent = '';
    }

    // 1. Validate Cart
    if (cart.length === 0) {
      showAlert('Your cart is empty. Please add items to your table order before confirming.', 'warning');
      return;
    }

    // 2. Validate Customer Name
    const customerName = (nameInput ? nameInput.value : '').trim();
    if (!customerName) {
      showAlert('Please enter your Name before confirming the order.', 'danger');
      if (nameInput) {
        nameInput.focus();
        nameInput.classList.add('is-invalid');
      }
      return;
    }
    if (nameInput) {
      nameInput.classList.remove('is-invalid');
    }

    const instructions = (instructionsInput ? instructionsInput.value : '').trim();

    // 3. Calculate Totals and Line Items (with explicit quantity in name)
    let grandTotal = 0;
    const itemsLines = cart.map((item, index) => {
      const itemTotal = item.price * item.qty;
      grandTotal += itemTotal;
      return `${index + 1}. ${item.title} x ${item.qty} — Rs. ${itemTotal.toLocaleString()}`;
    });

    // 4. Format Current Timestamp
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
    const fullTimestamp = `${dateString}, ${timeString}`;

    // 5. Construct Exact WhatsApp Message Format
    const messageLines = [
      `🍽️ *New Table Order — Kaka Bhaiya BBQ*`,
      `📍 Table No: ${TABLE_NUMBER}`,
      `👤 Name: ${customerName}`,
      `━━━━━━━━━━━━`,
      ...itemsLines,
      `━━━━━━━━━━━━`,
      `💰 *Total: Rs. ${grandTotal.toLocaleString()}*`,
      `📝 Instructions: ${instructions || 'None'}`,
      `🕒 Time: ${fullTimestamp}`
    ];

    const waText = messageLines.join('\n');
    const waUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(waText)}`;

    // 6. Close Cart Offcanvas
    const drawerEl = document.getElementById('tableCartDrawer');
    if (drawerEl && window.bootstrap && window.bootstrap.Offcanvas) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(drawerEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }

    // 7. Populate Success Modal
    const modalTableNo = document.getElementById('modal-table-number');
    const modalCustomer = document.getElementById('modal-customer-name');
    const modalTotal = document.getElementById('modal-order-total');
    const modalBtnWa = document.getElementById('btn-modal-open-wa');

    if (modalTableNo) modalTableNo.textContent = TABLE_NUMBER;
    if (modalCustomer) modalCustomer.textContent = customerName;
    if (modalTotal) modalTotal.textContent = `Rs. ${grandTotal.toLocaleString()}`;
    if (modalBtnWa) modalBtnWa.setAttribute('href', waUrl);

    // 8. Open Success Modal
    const modalEl = document.getElementById('tableOrderSuccessModal');
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
      const bsModal = new window.bootstrap.Modal(modalEl);
      bsModal.show();
    }

    // 9. Clear Cart for this table and reset inputs
    clearCart();
    if (nameInput) nameInput.value = '';
    if (instructionsInput) instructionsInput.value = '';
    renderAll();

    // 10. Automatically redirect/open WhatsApp
    try {
      window.open(waUrl, '_blank');
    } catch (e) {
      window.location.href = waUrl;
    }
  }

  function showAlert(msg, type) {
    const alertBox = document.getElementById('table-order-alert');
    if (!alertBox) {
      alert(msg);
      return;
    }
    alertBox.className = `alert alert-${type} py-2 px-3 small mt-2 mb-0`;
    alertBox.textContent = msg;
    alertBox.classList.remove('d-none');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // 7. INITIALIZATION & GLOBAL LISTENERS
  // --------------------------------------------------------------------------
  function init() {
    // 1. Dismiss Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 300);
    }

    // 2. Setup Sticky Navbar styling on scroll
    const navbar = document.querySelector('.navbar-bbq');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        if (navbar) navbar.classList.add('scrolled');
      } else {
        if (navbar) navbar.classList.remove('scrolled');
      }
    });

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 4. Live Search Input
    const searchInput = document.getElementById('table-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderDishesGrid();
      });
    }

    // 5. Order Confirm Button
    const confirmBtn = document.getElementById('btn-confirm-table-order');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', handleOrderConfirmation);
    }

    // 6. Render Categories and Menu Catalog
    renderCategories();
    renderAll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose Table Ordering interface for external interaction and testing
  window.TABLE_ORDERING = {
    addToCart: addToCart,
    updateQty: updateQty,
    removeFromCart: removeFromCart,
    handleOrderConfirmation: handleOrderConfirmation,
    getGroupedDishes: getGroupedDishes,
    getCart: getCart,
    renderAll: renderAll,
    selectedVariantMap: selectedVariantMap
  };

})();
