# Kaka Bhaiya BBQ - Production-Ready Multi-Page Website

A high-performance, ultra-modern (2026 Edition), responsive multi-page website built with semantic HTML5, modern CSS3, vanilla ES6 JavaScript, and Bootstrap 5 CDN for **Kaka Bhaiya BBQ** (Carrying the iconic **Bhaiya BBQ Model Town D-Block** heritage **Since 1970**).

---

## 🏛️ Brand Heritage & Leadership

- **Parent Group / Brand:** **Kaka's Life**
- **Kaka's Life Official Website:** [https://kakaslife.vercel.app/](https://kakaslife.vercel.app/)
- **Kaka's Life Brand Owner & CEO:** **Hafiz Muhammad Mubeen**
- **Roots & Lineage:** Famous **Bhaiya BBQ Model Town D Block, Lahore**, established **Since 1970** (56+ Years of Charcoal Pitmaster Heritage).
- **Single Exclusive Branch / Location:** **414-E, Hoo Chowk, Johar Town, Lahore, Pakistan**
- **Official Phone & WhatsApp:** **03228019941** (`+92 322 8019941`)
- **Group Categories under Kaka's Life:**
  1. 🍖 **Kaka Bhaiya BBQ** (Authentic Charcoal-Grilled Food & Barbecue)
  2. 🌸 **Kaka's Fragrance** (Luxury Attars & Perfumes)

---

## 📁 File Structure

```text
d:/KAKA_BHAIYA/
├── index.html           # Home page with 3D Runway Lookbook, Hero, Signature Dishes, Counters, etc.
├── menu.html            # Full interactive menu (40+ dishes, live search, category & spice filters)
├── about.html           # Brand story (Since 1970), Kaka's Life corporate showcase & leadership, pitmasters
├── gallery.html         # Responsive masonry grid with category filters & custom lightbox modal
├── product.html         # Dedicated product showcase page (HD imagery, specs, pricing, pairings, & live customer review submission system)
├── reviews.html         # Verified diner ratings, breakdown bars, interactive review form
├── reservation.html     # Table booking system (Johar Town Hoo Chowk) with instant modal
├── order.html           # Cart checkout, promo codes (KAKA10, BBQFEAST), & WhatsApp order generator (03228019941)
├── 404.html             # Custom 404 error page with BBQ theme
├── css/
│   └── style.css        # Master stylesheet (Light theme, ultra high-contrast dark footer, 3D engine, 2026 aesthetics)
├── js/
│   └── main.js          # Main interactive script (3D runway, cart state, counters 56+ yrs, WhatsApp checkout)
└── images/
    ├── dishes/          # Food photography
    └── ambience/        # Restaurant and dining atmosphere
```

---

## 🎨 Design System & 2026 Aesthetics

- **Theme Mode:** LIGHT Theme with high-contrast, crystal-clear elements
- **Background:** Warm cream / off-white (`#FFF8F0` / `#FFFDF9`)
- **Cards:** Pure white (`#FFFFFF`) with soft multi-layer drop shadows
- **Primary Accent:** Fire Charcoal Orange (`#FF541E`) & Deep Tandoori Crimson (`#9B1C1C`)
- **Footer:** Ultra High-Contrast Dark Charcoal (`#110E0D`) with pure white (`#FFFFFF`) headings/links and golden accent pills (`#FFB300`), 100% readable text, and integrated **Kaka's Life** corporate card.
- **Headings Font:** Google Fonts `Outfit` (Bold, Modern Display)
- **Body Font:** Google Fonts `Plus Jakarta Sans` (Clean, High Readability)

---

## 📞 Contact & Direct Ordering

- **Call:** `+92 322 8019941`
- **WhatsApp:** `https://wa.me/923228019941`
- **Location:** 414-E, Hoo Chowk, Johar Town, Lahore, Pakistan
- **Parent Portal:** [https://kakaslife.vercel.app/](https://kakaslife.vercel.app/)


---

## 📱 Smart Table-Based QR Ordering System (Tables 1 – 12)

A state-of-the-art in-restaurant contactless ordering experience built specifically for dine-in patrons and kitchen dispatch.

### 🌟 Key Features
1. **12 Dedicated Table Pages:**
   - `table-1.html` through `table-12.html`
   - Clean URL routing supported out of the box via subdirectories `/table-1/` through `/table-12/`
   - Universal fallback handler at `table.html?table=X`
   - Dynamic table detection locking the ordering session to the scanned table (e.g. *"Welcome to KAKA BHAIYA BBQ – Table 5"*)
2. **Comprehensive Live Catalog:**
   - All 33 restaurant menu items across 8 distinct categories (Mutton & Beef Karahi, Charcoal Kababs, Malai & Boti, Sajji & Handi, Platters, Rolls, Tandoori Breads, and Desserts & Beverages)
   - Product images, detailed ingredient descriptions, prices in PKR
   - Portion/size variations (Half vs Full, Chest vs Leg, Single vs Double)
3. **Interactive Table Cart:**
   - Portion selection, quantity steppers, item removal
   - Custom dish-level special instructions (e.g. *"Less spicy"*, *"Extra green chutney"*, *"Well-done"*)
   - General table order notes
   - Dynamic subtotal and grand total calculations
   - Floating cart bar on mobile viewports and full offcanvas checkout drawer
4. **Official WhatsApp Direct Kitchen Dispatch:**
   - Target Kitchen WhatsApp Number: `03228019941` (`+92 322 8019941`)
   - Generates the exact formatted WhatsApp message:
```text
KAKA BHAIYA BBQ – NEW TABLE ORDER

Table Number: Table 5
Customer Name: Hamza Khan

Order Details:
1. Chicken Tikka (Chest Piece) × 2 = Rs. 800 [Note: Less Spicy]
2. Malai Boti × 1 = Rs. 450
3. Cold Drink × 2 = Rs. 200

Subtotal: Rs. 1,450
Special Instructions: Less Spicy

TOTAL: Rs. 1,450

Please confirm this order.
```
   - Automatically opens WhatsApp via official click-to-chat API (`https://wa.me/923228019941?text=...`)
   - Full client-side validation prevents empty carts or missing diner names.

### 🏷️ QR Code Management & Printing Hub (`qr-codes.html`)
- **Central Management Dashboard:** Restaurant management can view, test, and export QR codes for all 12 tables.
- **Standalone QR Engine:** Pure JavaScript QR code generator (`js/qrcode.min.js`) requiring zero external network calls.
- **High-Res Canvas Export:** Download branded, ready-to-print 600×760 PNG tent cards for each individual table with 1-click.
- **Batch Export:** 1-click button to download all 12 table QR tent cards sequentially.
- **Print Table Tents:** Integrated print stylesheet (`@media print`) configured to print 12 foldable table tent cards on A4 / Letter paper with cut lines and table markers.
- **Domain Configuration:** Dynamic base URL switcher allowing the manager to set custom domains (e.g., `https://kakabhaiyabbq.com`) before exporting or printing.
