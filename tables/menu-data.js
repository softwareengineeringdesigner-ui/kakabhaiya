/**
 * Kaka Bhaiya BBQ - Shared Table Menu Catalog
 * Custom-tailored for Table Ordering (tables/table-1.html to table-12.html)
 */
window.TABLE_MENU_DATA = [
  // --------------------------------------------------------------------------
  // 1. EXCLUSIVE DEALS (Fixed single options - No chips)
  // --------------------------------------------------------------------------
  {
    "id": "deal_1_person_chicken",
    "title": "1 PERSON DEAL (Chicken)",
    "category": "Exclusive Deals",
    "price": 899,
    "image": "https://images.unsplash.com/photo-1775211578178-61f06027adf3?w=600&q=80",
    "desc": "Perfect solo feast: 1 Charcoal Chicken Leg Piece, 2 Chicken Kababs, 2 Sada Naans, 345ml cold bottle, served with signature Raita & Imli sauce.",
    "lookBadge": "Solo Special",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "deal_1_person_beef",
    "title": "1 PERSON DEAL (Beef)",
    "category": "Exclusive Deals",
    "price": 1249,
    "image": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80",
    "desc": "Prime beef lover's feast: 6 Bhaiya Beef Kababs, 8 Beef Afghani Botis, 8 Beef Botis, 2 Sada Naans, with zesty Raita & Imli sauce.",
    "lookBadge": "Prime Beef Solo",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "deal_2_person",
    "title": "2 PERSON DEAL",
    "category": "Exclusive Deals",
    "price": 699,
    "image": "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&q=80",
    "desc": "Great duo value: 1 Tandoori Naan Chicken Kabab Roll, 1 Naan Beef Kabab Roll, 500ml cold drink, and signature dipping sauces.",
    "lookBadge": "Duo Roll Combo",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "deal_4_person",
    "title": "4 PERSON DEAL",
    "category": "Exclusive Deals",
    "price": 2599,
    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
    "desc": "Hungry group combo: 2 Chicken Pieces, 8 tender Chicken Malai Botis, 4 Chicken Kababs, 4 Sada Naans, large 1.5L cold bottle, with salad and sauces.",
    "lookBadge": "Friends Feast",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 4 Persons"
  },
  {
    "id": "deal_shapata",
    "title": "SHAPATA DEAL",
    "category": "Exclusive Deals",
    "price": 2299,
    "image": "https://images.unsplash.com/photo-1567932783552-e305bbf70b63?w=600&q=80",
    "desc": "Authentic street food organ specialty: 20 PC Domchi, 20 PC Dili, 12 PC Pota, 20 PC Kalaji, served sizzling with fresh salad, raita, and imli sauce.",
    "lookBadge": "Traditional Special",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "deal_special",
    "title": "SPECIAL DEAL",
    "category": "Exclusive Deals",
    "price": 1099,
    "image": "https://images.unsplash.com/photo-1781332150932-e4af32932ee9?w=600&q=80",
    "desc": "Top rated variety combo: 4 Chicken Malai Botis, 4 Chicken Tikka Botis, 2 Chicken Kababs, 2 Sada Naans, 300ml cold drink, salad and raita.",
    "lookBadge": "Customer Favorite",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "deal_family_1",
    "title": "FAMILY DEAL 1 (The Feast)",
    "category": "Exclusive Deals",
    "price": 5999,
    "image": "https://images.unsplash.com/photo-1771285119318-b342c3ecc51c?w=800&q=80",
    "desc": "The ultimate party platter: 6 Chicken Kababs, 16 Chicken Tikka Botis, 20 Bhaiya Beef Kababs, 16 Chicken Malai Botis, 16 Beef Afghani Botis, 16 Bhaiya Beef Botis, 8 Sada Naans, 2x 1L bottles, with fresh salad and sauces.",
    "lookBadge": "Mega Family Feast",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 6-8 Persons"
  },
  {
    "id": "deal_family_2",
    "title": "FAMILY DEAL 2 (The Grand Feast)",
    "category": "Exclusive Deals",
    "price": 7999,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    "desc": "The King of Deals (Top Price Deal): 8 Chicken Gola Kababs, 16 Chicken Tikka Botis, 4 Charbroiled Chicken Pieces (2 Breast / 2 Leg), 16 Chicken Malai Botis, 16 Chicken Green Botis, 10 Sada Naans, 2x 1.5L large bottles, plus full salad and raita platter.",
    "lookBadge": "TOP DEAL (Rs 7,999)",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 6-8 Persons"
  },

  // --------------------------------------------------------------------------
  // 2. BEEF B.B.Q (Seekh Variants: 1 Seekh = 1 PC for Kabab; 1 Seekh = 4 PC for Boti)
  // --------------------------------------------------------------------------

  // Bhaiya Beef Kabab 1 Bite (Kabab: 1 Seekh = 1 PC)
  {
    "id": "beef_kabab_1_seekh",
    "title": "Bhaiya Beef Kabab 1 Bite (1 Seekh)",
    "category": "Beef B.B.Q",
    "price": 80,
    "variantLabel": "1 seekh",
    "image": "images/dishes/bhaiya_beef_kabab_1bite.png",
    "desc": "Traditional hand-minced prime beef skewers infused with roasted cumin, charred brown onions, fresh mint, and 14 secret whole spices, grilled on acacia coals.",
    "lookBadge": "Qty: 1 Seekh (1 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "1 Seekh (1 PC)"
  },
  {
    "id": "beef_kabab_3_seekh",
    "title": "Bhaiya Beef Kabab 1 Bite (3 Seekh)",
    "category": "Beef B.B.Q",
    "price": 230,
    "variantLabel": "3 seekh",
    "image": "images/dishes/bhaiya_beef_kabab_1bite.png",
    "desc": "Traditional hand-minced prime beef skewers infused with roasted cumin, charred brown onions, fresh mint, and 14 secret whole spices, grilled on acacia coals.",
    "lookBadge": "Qty: 3 Seekh (3 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "3 Seekh (3 PC)"
  },
  {
    "id": "beef_kabab_6_seekh",
    "title": "Bhaiya Beef Kabab 1 Bite (6 Seekh)",
    "category": "Beef B.B.Q",
    "price": 450,
    "variantLabel": "6 seekh",
    "image": "images/dishes/bhaiya_beef_kabab_1bite.png",
    "desc": "Traditional hand-minced prime beef skewers infused with roasted cumin, charred brown onions, fresh mint, and 14 secret whole spices, grilled on acacia coals.",
    "lookBadge": "Qty: 6 Seekh (6 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "6 Seekh (6 PC)"
  },
  {
    "id": "beef_kabab_12_seekh",
    "title": "Bhaiya Beef Kabab 1 Bite (12 Seekh)",
    "category": "Beef B.B.Q",
    "price": 890,
    "variantLabel": "12 seekh",
    "image": "images/dishes/bhaiya_beef_kabab_1bite.png",
    "desc": "A full dozen prime beef seekh kababs slow-roasted over glowing coals for melting, tender indulgence.",
    "lookBadge": "Qty: 12 Seekh (12 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "12 Seekh (12 PC)"
  },

  // Beef Boti (Boti: 1 Seekh = 4 PC)
  {
    "id": "beef_boti_1_seekh",
    "title": "Beef Boti (1 Seekh)",
    "category": "Beef B.B.Q",
    "price": 175,
    "variantLabel": "1 seekh",
    "image": "images/dishes/beef_boti.png",
    "desc": "Succulent beef tenderloin cubes cured in raw green papaya, pungent mustard oil, and crushed red chilies, skewered and seared.",
    "lookBadge": "Qty: 1 Seekh (4 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "1 Seekh (4 PC)"
  },
  {
    "id": "beef_boti_3_seekh",
    "title": "Beef Boti (3 Seekh)",
    "category": "Beef B.B.Q",
    "price": 500,
    "variantLabel": "3 seekh",
    "image": "images/dishes/beef_boti.png",
    "desc": "Succulent beef tenderloin cubes cured in raw green papaya, pungent mustard oil, and crushed red chilies, skewered and seared.",
    "lookBadge": "Qty: 3 Seekh (12 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "3 Seekh (12 PC)"
  },
  {
    "id": "beef_boti_6_seekh",
    "title": "Beef Boti (6 Seekh)",
    "category": "Beef B.B.Q",
    "price": 999,
    "variantLabel": "6 seekh",
    "image": "images/dishes/beef_boti.png",
    "desc": "Succulent beef tenderloin cubes cured in raw green papaya, pungent mustard oil, and crushed red chilies, skewered and seared.",
    "lookBadge": "Qty: 6 Seekh (24 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "6 Seekh (24 PC)"
  },
  {
    "id": "beef_boti_12_seekh",
    "title": "Beef Boti (12 Seekh)",
    "category": "Beef B.B.Q",
    "price": 1899,
    "variantLabel": "12 seekh",
    "image": "images/dishes/beef_boti.png",
    "desc": "Mega family feast platter of charred, smoky beef boti skewers served hot from the coals.",
    "lookBadge": "Qty: 12 Seekh (48 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "12 Seekh (48 PC)"
  },

  // Beef Afghani Boti (Boti: 1 Seekh = 4 PC)
  {
    "id": "beef_afghani_boti_1_seekh",
    "title": "Beef Afghani Boti (1 Seekh)",
    "category": "Beef B.B.Q",
    "price": 175,
    "variantLabel": "1 seekh",
    "image": "images/dishes/bhaiya_beef_afghani_boti.jpg",
    "desc": "Authentic tribal-style beef boti seasoned lightly with rock salt, cracked black pepper, and tenderized in natural beef fat baste.",
    "lookBadge": "Qty: 1 Seekh (4 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "1 Seekh (4 PC)"
  },
  {
    "id": "beef_afghani_boti_3_seekh",
    "title": "Beef Afghani Boti (3 Seekh)",
    "category": "Beef B.B.Q",
    "price": 500,
    "variantLabel": "3 seekh",
    "image": "images/dishes/bhaiya_beef_afghani_boti.jpg",
    "desc": "Authentic tribal-style beef boti seasoned lightly with rock salt, cracked black pepper, and tenderized in natural beef fat baste.",
    "lookBadge": "Qty: 3 Seekh (12 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "3 Seekh (12 PC)"
  },
  {
    "id": "beef_afghani_boti_6_seekh",
    "title": "Beef Afghani Boti (6 Seekh)",
    "category": "Beef B.B.Q",
    "price": 999,
    "variantLabel": "6 seekh",
    "image": "images/dishes/bhaiya_beef_afghani_boti.jpg",
    "desc": "Authentic tribal-style beef boti seasoned lightly with rock salt, cracked black pepper, and tenderized in natural beef fat baste.",
    "lookBadge": "Qty: 6 Seekh (24 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "6 Seekh (24 PC)"
  },
  {
    "id": "beef_afghani_boti_12_seekh",
    "title": "Beef Afghani Boti (12 Seekh)",
    "category": "Beef B.B.Q",
    "price": 1899,
    "variantLabel": "12 seekh",
    "image": "images/dishes/bhaiya_beef_afghani_boti.jpg",
    "desc": "Massive tribal feast of tender Afghani beef boti grilled slowly over red acacia coal embers.",
    "lookBadge": "Qty: 12 Seekh (48 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "12 Seekh (48 PC)"
  },

  // --------------------------------------------------------------------------
  // 3. CHICKEN B.B.Q (Seekh Variants: 1 Seekh = 1 PC for Kabab; 1 Seekh = 4 PC for Boti)
  // --------------------------------------------------------------------------

  // Chicken Kabab (Kabab: 1 Seekh = 1 PC)
  {
    "id": "chicken_kabab_1_seekh",
    "title": "Chicken Kabab (1 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 120,
    "variantLabel": "1 seekh",
    "image": "images/dishes/chicken_kabab.jpg",
    "desc": "Tender minced chicken skewers kneaded with green chilies, cilantro, roasted cumin, and butter, flame grilled on skewers.",
    "lookBadge": "Qty: 1 Seekh (1 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "1 Seekh (1 PC)"
  },
  {
    "id": "chicken_kabab_3_seekh",
    "title": "Chicken Kabab (3 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 350,
    "variantLabel": "3 seekh",
    "image": "images/dishes/chicken_kabab.jpg",
    "desc": "Tender minced chicken skewers kneaded with green chilies, cilantro, roasted cumin, and butter, flame grilled on skewers.",
    "lookBadge": "Qty: 3 Seekh (3 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "3 Seekh (3 PC)"
  },
  {
    "id": "chicken_kabab_6_seekh",
    "title": "Chicken Kabab (6 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 699,
    "variantLabel": "6 seekh",
    "image": "images/dishes/chicken_kabab.jpg",
    "desc": "Tender minced chicken skewers kneaded with green chilies, cilantro, roasted cumin, and butter, flame grilled on skewers.",
    "lookBadge": "Qty: 6 Seekh (6 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "6 Seekh (6 PC)"
  },
  {
    "id": "chicken_kabab_12_seekh",
    "title": "Chicken Kabab (12 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 1380,
    "variantLabel": "12 seekh",
    "image": "images/dishes/chicken_kabab.jpg",
    "desc": "Tender minced chicken skewers kneaded with green chilies, cilantro, roasted cumin, and butter, flame grilled on skewers.",
    "lookBadge": "Qty: 12 Seekh (12 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "12 Seekh (12 PC)"
  },

  // Chicken Tikka Boti (Boti: 1 Seekh = 4 PC)
  {
    "id": "chicken_tikka_boti_1_seekh",
    "title": "Chicken Tikka Boti (1 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 270,
    "variantLabel": "1 seekh",
    "image": "https://images.unsplash.com/photo-1755090154782-5215189b4083?w=600&q=80",
    "desc": "Boneless chicken thigh cubes bathed in tandoori yogurt marinade, carom seeds, and crushed spices, flame seared.",
    "lookBadge": "Qty: 1 Seekh (4 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "1 Seekh (4 PC)"
  },
  {
    "id": "chicken_tikka_boti_3_seekh",
    "title": "Chicken Tikka Boti (3 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 799,
    "variantLabel": "3 seekh",
    "image": "https://images.unsplash.com/photo-1755090154782-5215189b4083?w=600&q=80",
    "desc": "Boneless chicken thigh cubes bathed in tandoori yogurt marinade, carom seeds, and crushed spices, flame seared.",
    "lookBadge": "Qty: 3 Seekh (12 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "3 Seekh (12 PC)"
  },
  {
    "id": "chicken_tikka_boti_6_seekh",
    "title": "Chicken Tikka Boti (6 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 1580,
    "variantLabel": "6 seekh",
    "image": "https://images.unsplash.com/photo-1755090154782-5215189b4083?w=600&q=80",
    "desc": "Boneless chicken thigh cubes bathed in tandoori yogurt marinade, carom seeds, and crushed spices, flame seared.",
    "lookBadge": "Qty: 6 Seekh (24 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "6 Seekh (24 PC)"
  },
  {
    "id": "chicken_tikka_boti_12_seekh",
    "title": "Chicken Tikka Boti (12 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 3100,
    "variantLabel": "12 seekh",
    "image": "https://images.unsplash.com/photo-1755090154782-5215189b4083?w=600&q=80",
    "desc": "Boneless chicken thigh cubes bathed in tandoori yogurt marinade, carom seeds, and crushed spices, flame seared.",
    "lookBadge": "Qty: 12 Seekh (48 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "12 Seekh (48 PC)"
  },

  // Chicken Boneless Boti (Boti: 1 Seekh = 4 PC)
  {
    "id": "chicken_boneless_boti_1_seekh",
    "title": "Chicken Boneless Boti (1 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 310,
    "variantLabel": "1 seekh",
    "image": "images/dishes/chicken_boneless_boti.jpg",
    "desc": "Tender boneless chicken cuts marinated in lemon herb marinade, skewered over live coal fire.",
    "lookBadge": "Qty: 1 Seekh (4 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "1 Seekh (4 PC)"
  },
  {
    "id": "chicken_boneless_boti_3_seekh",
    "title": "Chicken Boneless Boti (3 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 920,
    "variantLabel": "3 seekh",
    "image": "images/dishes/chicken_boneless_boti.jpg",
    "desc": "Tender boneless chicken cuts marinated in lemon herb marinade, skewered over live coal fire.",
    "lookBadge": "Qty: 3 Seekh (12 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "3 Seekh (12 PC)"
  },
  {
    "id": "chicken_boneless_boti_6_seekh",
    "title": "Chicken Boneless Boti (6 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 1800,
    "variantLabel": "6 seekh",
    "image": "images/dishes/chicken_boneless_boti.jpg",
    "desc": "Generous cuts of tender boneless chicken marinated in lemon herb marinade, skewered over live coal fire.",
    "lookBadge": "Qty: 6 Seekh (24 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "6 Seekh (24 PC)"
  },
  {
    "id": "chicken_boneless_boti_12_seekh",
    "title": "Chicken Boneless Boti (12 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 3550,
    "variantLabel": "12 seekh",
    "image": "images/dishes/chicken_boneless_boti.jpg",
    "desc": "Large family feast platter of tender boneless chicken marinated in lemon herb marinade, skewered over live coals.",
    "lookBadge": "Qty: 12 Seekh (48 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "12 Seekh (48 PC)"
  },

  // Chicken Malai Boti (Boti: 1 Seekh = 4 PC)
  {
    "id": "chicken_malai_boti_1_seekh",
    "title": "Chicken Malai Boti (1 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 360,
    "variantLabel": "1 seekh",
    "image": "images/dishes/chicken_malai_boti.jpg",
    "desc": "Velvety chicken chunks steeped in fresh malai, ground cashew nut paste, white pepper, and green cardamom.",
    "lookBadge": "Qty: 1 Seekh (4 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "1 Seekh (4 PC)"
  },
  {
    "id": "chicken_malai_boti_3_seekh",
    "title": "Chicken Malai Boti (3 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 1060,
    "variantLabel": "3 seekh",
    "image": "images/dishes/chicken_malai_boti.jpg",
    "desc": "Velvety chicken chunks steeped in fresh malai, ground cashew nut paste, white pepper, and green cardamom.",
    "lookBadge": "Qty: 3 Seekh (12 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "3 Seekh (12 PC)"
  },
  {
    "id": "chicken_malai_boti_6_seekh",
    "title": "Chicken Malai Boti (6 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 2099,
    "variantLabel": "6 seekh",
    "image": "images/dishes/chicken_malai_boti.jpg",
    "desc": "Velvety chicken chunks steeped in fresh malai, ground cashew nut paste, white pepper, and green cardamom for tender indulgence.",
    "lookBadge": "Qty: 6 Seekh (24 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "6 Seekh (24 PC)"
  },
  {
    "id": "chicken_malai_boti_12_seekh",
    "title": "Chicken Malai Boti (12 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 4150,
    "variantLabel": "12 seekh",
    "image": "images/dishes/chicken_malai_boti.jpg",
    "desc": "Mega platter of velvety chicken chunks steeped in fresh malai, ground cashew nut paste, white pepper, and green cardamom.",
    "lookBadge": "Qty: 12 Seekh (48 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "12 Seekh (48 PC)"
  },

  // Chicken Green Boti (Boti: 1 Seekh = 4 PC)
  {
    "id": "chicken_green_boti_1_seekh",
    "title": "Chicken Green Boti (1 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 360,
    "variantLabel": "1 seekh",
    "image": "images/dishes/chicken_green_boti.jpg",
    "desc": "Spicy green haryali chicken boti infused with fresh garden mint, pungent green chilies, garlic, and fresh lime.",
    "lookBadge": "Qty: 1 Seekh (4 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "1 Seekh (4 PC)"
  },
  {
    "id": "chicken_green_boti_3_seekh",
    "title": "Chicken Green Boti (3 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 1060,
    "variantLabel": "3 seekh",
    "image": "images/dishes/chicken_green_boti.jpg",
    "desc": "Spicy green haryali chicken boti infused with fresh garden mint, pungent green chilies, garlic, and fresh lime.",
    "lookBadge": "Qty: 3 Seekh (12 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "3 Seekh (12 PC)"
  },
  {
    "id": "chicken_green_boti_6_seekh",
    "title": "Chicken Green Boti (6 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 2099,
    "variantLabel": "6 seekh",
    "image": "images/dishes/chicken_green_boti.jpg",
    "desc": "Spicy green haryali chicken boti infused with fresh garden mint, pungent green chilies, garlic, and fresh lime.",
    "lookBadge": "Qty: 6 Seekh (24 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "6 Seekh (24 PC)"
  },
  {
    "id": "chicken_green_boti_12_seekh",
    "title": "Chicken Green Boti (12 Seekh)",
    "category": "Chicken B.B.Q",
    "price": 4150,
    "variantLabel": "12 seekh",
    "image": "images/dishes/chicken_green_boti.jpg",
    "desc": "Massive platter of spicy green haryali chicken boti infused with fresh garden mint, pungent green chilies, and lime.",
    "lookBadge": "Qty: 12 Seekh (48 PC)",
    "spiceBadge": "Medium Charcoal",
    "portion": "12 Seekh (48 PC)"
  },

  // Chicken Pieces (Individual quarter portions)
  {
    "id": "chicken_leg_piece",
    "title": "Chicken Leg Piece (1 PC)",
    "category": "Chicken B.B.Q",
    "price": 459,
    "image": "images/dishes/chicken_leg_piece.jpg",
    "desc": "Whole succulent chicken leg quarter scored deeply and basted in traditional tandoori red masala over glowing coals.",
    "lookBadge": "Qty: 1 PC",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "chicken_breast_piece",
    "title": "Chicken Breast Piece (1 PC)",
    "category": "Chicken B.B.Q",
    "price": 499,
    "image": "https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?w=600&q=80",
    "desc": "Juicy, meaty chicken breast quarter seasoned with lemon, black pepper, and roasted chili flakes, flame broiled.",
    "lookBadge": "Qty: 1 PC",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "chicken_malai_piece",
    "title": "Chicken Malai Piece (1 PC)",
    "category": "Chicken B.B.Q",
    "price": 599,
    "image": "images/dishes/chicken_malai_piece.png",
    "desc": "Full prime chicken quarter marinated in rich clotted cream, saffron butter, and gentle cardamom glaze.",
    "lookBadge": "Qty: 1 PC",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },

  // --------------------------------------------------------------------------
  // 4. PARATHA ROLLS
  // --------------------------------------------------------------------------
  {
    "id": "roll_chicken_kabab",
    "title": "Chicken Kabab Roll",
    "category": "Paratha Rolls",
    "price": 349,
    "image": "https://images.unsplash.com/photo-1745126009946-1b35b1a16fec?w=600&q=80",
    "desc": "Crispy pan-fried golden paratha rolled with seasoned chicken seekh kabab, crunchy onions, and mint raita.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_chicken_malai",
    "title": "Chicken Malai Roll",
    "category": "Paratha Rolls",
    "price": 499,
    "image": "https://images.unsplash.com/photo-1748955308143-5055af50bba6?w=600&q=80",
    "desc": "Flaky golden lachha paratha wrapped around tender chicken malai boti and garlic-herb cream sauce.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_special_malai",
    "title": "Special Malai Roll",
    "category": "Paratha Rolls",
    "price": 549,
    "image": "https://images.unsplash.com/photo-1762284513008-08f897ff5041?w=600&q=80",
    "desc": "Extra-loaded malai boti roll topped with melted cheese drizzle, thick cream, and secret herb mayo.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_beef_kabab",
    "title": "Beef Kabab Roll",
    "category": "Paratha Rolls",
    "price": 399,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80",
    "desc": "Smoky beef seekh kabab rolled in hot crisp paratha with tangy imli tamarind chutney and onion rings.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_beef_boti",
    "title": "Beef Boti Roll",
    "category": "Paratha Rolls",
    "price": 599,
    "image": "https://images.unsplash.com/photo-1778168199427-4e839943d20f?w=600&q=80",
    "desc": "Tender char-grilled spicy beef boti cuts wrapped in crispy lachha paratha with freshly sliced salad.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_special_beef_boti",
    "title": "Special Beef Boti Roll",
    "category": "Paratha Rolls",
    "price": 799,
    "image": "https://images.unsplash.com/photo-1561760041-ca62af0d9047?w=600&q=80",
    "desc": "Double portion of charcoal beef boti loaded into flaky paratha with melted butter and spicy secret sauces.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_chicken_cheese",
    "title": "Chicken Cheese Roll",
    "category": "Paratha Rolls",
    "price": 499,
    "image": "https://images.unsplash.com/photo-1740377015738-b0f49643d468?w=600&q=80",
    "desc": "Succulent chicken boti layered with gooey melted mozzarella cheese inside golden buttery paratha.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_shapata",
    "title": "Shapata Roll",
    "category": "Paratha Rolls",
    "price": 799,
    "image": "images/dishes/shapata_roll.jpg",
    "desc": "Signature Kaka Bhaiya Shapata roll packed with special mixed meats, charred green chilies, and fiery masala crunch.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_wehshi",
    "title": "Wehshi Roll",
    "category": "Paratha Rolls",
    "price": 999,
    "image": "https://plus.unsplash.com/premium_photo-1731512475641-191f7841512e?w=600&q=80",
    "desc": "The legendary jumbo monster roll loaded with double beef boti, chicken malai, seekh kababs, and melted cheese.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_naan_beef_kabab",
    "title": "Naan Beef Kabab Roll",
    "category": "Paratha Rolls",
    "price": 290,
    "image": "images/dishes/naan_beef_kabab_roll.png",
    "desc": "Freshly baked soft tandoori clay oven naan rolled around juicy beef seekh kabab with onion salad and mint dip.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "roll_naan_chicken_kabab",
    "title": "Naan Chicken Kabab Roll",
    "category": "Paratha Rolls",
    "price": 295,
    "image": "images/dishes/naan_chicken_kabab_roll.png",
    "desc": "Soft clay tandoor naan wrapping freshly grilled chicken seekh kabab with cooling coriander yogurt raita.",
    "lookBadge": "Qty: 1 Roll",
    "spiceBadge": "Medium Charcoal",
    "portion": "Serves 1-2 Persons"
  },

  // --------------------------------------------------------------------------
  // 5. FISH (SEASONAL)
  // Grill Fish: selectable weights (Half KG, 1 KG, 1.5 KG)
  // Fried Fish: Coming Soon (no price, not purchasable)
  // --------------------------------------------------------------------------
  {
    "id": "fish_grill_half_kg",
    "title": "Grill Fish (Half KG)",
    "category": "Fish (Seasonal)",
    "price": 850,
    "variantLabel": "Half KG",
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    "desc": "Fresh seasonal river fish marinated in roasted ajwain, sea salt, lemon, and stone-ground masalas, grilled over live coals.",
    "lookBadge": "Qty: Half KG",
    "spiceBadge": "Medium Charcoal",
    "portion": "Half KG (0.5 KG)"
  },
  {
    "id": "fish_grill_1_kg",
    "title": "Grill Fish (1 KG)",
    "category": "Fish (Seasonal)",
    "price": 1580,
    "variantLabel": "1 KG",
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    "desc": "Fresh seasonal river fish marinated in roasted ajwain, sea salt, lemon, and stone-ground masalas, grilled over live coals.",
    "lookBadge": "Qty: 1 KG",
    "spiceBadge": "Medium Charcoal",
    "portion": "1 KG"
  },
  {
    "id": "fish_grill_1_5_kg",
    "title": "Grill Fish (1.5 KG)",
    "category": "Fish (Seasonal)",
    "price": 2370,
    "variantLabel": "1.5 KG",
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    "desc": "Fresh seasonal river fish marinated in roasted ajwain, sea salt, lemon, and stone-ground masalas, grilled over live coals.",
    "lookBadge": "Qty: 1.5 KG",
    "spiceBadge": "Medium Charcoal",
    "portion": "1.5 KG"
  },
  {
    "id": "fish_fried",
    "title": "Fried Fish",
    "category": "Fish (Seasonal)",
    "price": null,
    "isComingSoon": true,
    "image": "images/dishes/fried_fish.png",
    "desc": "Crispy Lahori batter-fried river fish with aromatic carom and coriander crust. Coming soon this winter season!",
    "lookBadge": "Coming Soon",
    "spiceBadge": "Medium Charcoal",
    "portion": "Coming Soon"
  },

  // --------------------------------------------------------------------------
  // 6. SIDES ITEMS & DRINKS
  // --------------------------------------------------------------------------
  {
    "id": "side_sada_roti",
    "title": "Sada Roti",
    "category": "Sides Items & Drinks",
    "price": 30,
    "image": "images/dishes/sada_roti.jpg",
    "desc": "Traditional thin whole wheat roti baked fresh on clay tandoor walls.",
    "lookBadge": "Qty: 1 PC",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "side_sada_naan",
    "title": "Sada Naan",
    "category": "Sides Items & Drinks",
    "price": 40,
    "image": "images/dishes/sada_naan.jpg",
    "desc": "Fluffy hot clay oven tandoori naan with blistered golden crust and soft crumb.",
    "lookBadge": "Qty: 1 PC",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "side_malwari_paratha",
    "title": "Malwari Paratha",
    "category": "Sides Items & Drinks",
    "price": 150,
    "image": "images/dishes/malwari_paratha.jpg",
    "desc": "Crispy, multi-layered golden Malwari lachha paratha pan-fried in authentic desi ghee.",
    "lookBadge": "Qty: 1 PC",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "side_raita_imli",
    "title": "Raita & Imli",
    "category": "Sides Items & Drinks",
    "price": 120,
    "image": "images/dishes/raita_imli_sauce.jpg",
    "desc": "Chilled zeera mint curd raita served alongside our signature sweet-and-sour tamarind imli chutney.",
    "lookBadge": "Qty: 1 Serving",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "side_fresh_salad",
    "title": "Fresh Salad",
    "category": "Sides Items & Drinks",
    "price": 150,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    "desc": "Fresh crisp red onion rings, cucumber slices, juicy tomatoes, green chilies, and lemon wedges.",
    "lookBadge": "Qty: 1 Platter",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "drink_regular_bottle",
    "title": "Regular Bottle",
    "category": "Sides Items & Drinks",
    "price": 120,
    "image": "images/dishes/regular_bottle_345ml.jpg",
    "desc": "Ice-cold 250ml glass bottle soda: Pepsi, 7Up, Mirinda, or Coke.",
    "lookBadge": "Qty: 250 ml",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "drink_bottle_500ml",
    "title": "Bottle (500 ml)",
    "category": "Sides Items & Drinks",
    "price": 200,
    "variantLabel": "500 ml",
    "image": "images/dishes/bottle_500ml.png",
    "desc": "Chilled 500ml soft drink bottle for personal dining refreshment.",
    "lookBadge": "Qty: 500 ml",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "drink_bottle_1500ml",
    "title": "Bottle (1.5 L)",
    "category": "Sides Items & Drinks",
    "price": 350,
    "variantLabel": "1.5 L",
    "image": "images/dishes/bottle_1500ml.png",
    "desc": "Large 1.5 Litre cold drink bottle ideal for family feasts and group dining.",
    "lookBadge": "Qty: 1.5 L",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "drink_lemon_soda",
    "title": "Lemon Soda",
    "category": "Sides Items & Drinks",
    "price": 200,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
    "desc": "Zesty freshly squeezed lemon juice in fizzy soda with roasted cumin black salt and crushed mint.",
    "lookBadge": "Qty: 1 Glass",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "drink_mineral_water_500ml",
    "title": "Mineral Water (500 ml)",
    "category": "Sides Items & Drinks",
    "price": 120,
    "variantLabel": "500 ml",
    "image": "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80",
    "desc": "Chilled, sealed 500ml bottle of pure premium mineral drinking water.",
    "lookBadge": "Qty: 500 ml",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  },
  {
    "id": "drink_mineral_water_1500ml",
    "title": "Mineral Water (1.5 L)",
    "category": "Sides Items & Drinks",
    "price": 200,
    "variantLabel": "1.5 L",
    "image": "https://plus.unsplash.com/premium_photo-1681284939219-acfc2faa7eb8?w=600&q=80",
    "desc": "Full 1.5 Litre sealed family bottle of pure premium mineral water.",
    "lookBadge": "Qty: 1.5 L",
    "spiceBadge": "Authentic Taste",
    "portion": "Serves 1-2 Persons"
  }
];
