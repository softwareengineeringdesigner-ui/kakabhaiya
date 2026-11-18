/**
 * ==============================================================================
 * KAKA BHAIYA BBQ - SINGLE SOURCE OF TRUTH CONFIGURATION
 * Model Town D-Block Walay • Since 1970
 * File: js/config.js
 * ==============================================================================
 * Central business intelligence configuration for Kaka Bhaiya BBQ.
 * Used across client scripts, SEO metadata generators, and structured data.
 */

(function (window) {
  'use strict';

  const RESTAURANT_CONFIG = {
    // Brand & Entity Identification
    name: "Kaka Bhaiya BBQ",
    legalName: "Kaka Bhaiya BBQ (Model Town D-Block Walay)",
    alternateName: "Kaka Bhaiya BBQ Model Town D-Block Walay",
    tagline: "MODEL TOWN D-BLOCK WALAY",
    subTagline: "Authentic Charcoal Smokehouse Heritage Since 1970",
    heritageYear: 1970,
    yearsOfHeritage: 56,

    // Leadership & Personnel
    founder: "Hafiz Muhammad Mubeen",
    ceo: "Hafiz Muhammad Mubeen",
    patriarch: "Sufi Muhammad Ali",
    patriarchRole: "Head Pitmaster & Culinary Guardian (50+ Years Heritage)",
    owner: "Muhammad Afzal",
    ownerRole: "Owner & Managing Director",
    company: "Kaka's Life Enterprise",

    // Canonical & Domain URLs
    siteUrl: "https://kakabhaiyabbq.com",
    vercelUrl: "https://kaka-bhaiya-bbq.vercel.app",

    // Contact Information (Strictly WhatsApp & Direct Call - Zero Email per policy)
    phone: "+92 322 8019941",
    phoneRaw: "923228019941",
    phoneDisplay: "0322 8019941",
    whatsapp: "923228019941",
    whatsappLink: "https://wa.me/923228019941",
    email: "", // Strictly empty - user instruction: "email kahi b na ho kiyo k koi email nhi hai kakabhaiya ki"

    // Physical Location & Geo Coordinates (NAP Consistency)
    address: {
      streetAddress: "414-E, Hoo Chowk",
      addressLocality: "Johar Town",
      addressRegion: "Punjab",
      postalCode: "54770",
      addressCountry: "PK",
      city: "Lahore",
      countryName: "Pakistan",
      formatted: "414-E, Hoo Chowk, Johar Town, Lahore, Punjab 54770, Pakistan",
      landmark: "Hoo Chowk, Johar Town (Near Model Town Link Road & Khokhar Chowk)"
    },

    geo: {
      latitude: 31.4697,
      longitude: 74.2728,
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.045435987741!2d74.2706113!3d31.4697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919015f82b7ffff%3A0x6b840e6c5188f6fa!2sHoo%20Chowk!5e0!3m2!1sen!2s!4v1700000000000",
      mapsDirectionUrl: "https://maps.google.com/?q=Hoo+Chowk,+Johar+Town,+Lahore"
    },

    // Operating Hours
    openingHours: {
      days: "Monday - Sunday (Open 7 Days a Week)",
      hours: "05:00 PM – 03:00 AM",
      schemaSpecification: "Mo-Su 17:00-03:00",
      openTime: "17:00",
      closeTime: "03:00"
    },

    // Culinary Profile
    cuisine: [
      "Pakistani Barbecue",
      "Traditional Desi Charcoal Grill",
      "Bhaiya Beef Kabab",
      "Charcoal Boti & Tikka",
      "Crispy Paratha Rolls"
    ],
    priceRange: "PKR 40 - PKR 7,999",
    deliveryRadiusKm: 10,
    deliveryPolicy: "Delivery order service is strictly available within a 10 km radius of the restaurant (414-E Hoo Chowk, Johar Town, Lahore).",
    priceRangeSymbol: "$$",
    currency: "PKR",

    // Official Digital Profiles & Delivery Partners
    socialLinks: {
      facebook: "https://www.facebook.com/kakabhaiyabbq",
      instagram: "https://www.instagram.com/kakabhaiyabbq",
      tiktok: "https://www.tiktok.com/@kakabhaiyabbq",
      foodpanda: "https://www.foodpanda.pk/restaurant/r2pi/kaka-bhaiya-bar-b-q?srsltid=AYCX9vJ8TWc0L8LYB6IXUQjSeIZvWvsswnzelODpGlIIwmMnIBYlUg5S",
      googleMaps: "https://maps.google.com/?q=Hoo+Chowk,+Johar+Town,+Lahore"
    },

    // Signature Dishes (AEO & Search Highlights)
    signatureItems: [
      {
        name: "Bhaiya Special Beef Kabab",
        description: "Ancestral 1970 Model Town D-Block recipe of hand-minced prime beef infused with 14 stone-ground spices, roasted cumin, and rendered marrow, slow roasted over aromatic acacia coals.",
        price: "450",
        currency: "PKR"
      },
      {
        name: "Bhaiya Beef Kabab 1 Bite",
        description: "Bite-sized melt-in-mouth beef seekh kababs grilled over acacia embers, served hot with mint raita and kachumar salad.",
        price: "450",
        currency: "PKR"
      },
      {
        name: "Beef Boti",
        description: "Succulent beef tenderloin cubes cured in raw green papaya, pungent cold-pressed mustard oil, and crushed red chilies, skewered and seared.",
        price: "999",
        currency: "PKR"
      },
      {
        name: "Chicken Malai Boti",
        description: "Velvety boneless chicken breast cubes steeped in heavy cream, green cardamom, white pepper, and hung curd, charred lightly on skewers.",
        price: "720",
        currency: "PKR"
      },
      {
        name: "Chicken Kasturi Boti",
        description: "Juicy boneless chicken marinated with toasted fragrant kasuri methi, saffron-infused yogurt, and cracked black pepper.",
        price: "720",
        currency: "PKR"
      },
      {
        name: "Beef Kabab Paratha Roll",
        description: "Two prime Bhaiya beef kababs wrapped inside a hot, golden-fried layered paratha drizzled with tangy mint-coriander yogurt sauce and sliced onions.",
        price: "340",
        currency: "PKR"
      },
      {
        name: "Chicken B.B.Q Paratha Roll",
        description: "Smoky charcoal-grilled chicken boti wrapped in crispy pan-layered paratha with house spiced chutney.",
        price: "340",
        currency: "PKR"
      }
    ],

    // Geographic Coverage (Areas We Serve in Lahore)
    areasServed: [
      "Johar Town",
      "Model Town",
      "Faisal Town",
      "Garden Town",
      "Gulberg",
      "Wapda Town",
      "Township",
      "DHA (Defence Housing Authority) Lahore",
      "Bahria Town Lahore",
      "Canal View",
      "Valencia Town",
      "PCSIR Society",
      "PIA Society",
      "Lahore"
    ],
    // Search & Generative Query Keywords (SEO / AEO / GEO)
    searchKeywords: [
      "restaurant near me",
      "best restaurant near me",
      "bbq near me",
      "kabab near me",
      "bhaiya",
      "bhaiya bbq",
      "bhaiya kabab",
      "bhaiya beef kabab",
      "beef kabab",
      "best beef kabab in lahore",
      "beef boti",
      "chicken malai boti",
      "chicken kasturi boti",
      "quarter chicken tikka",
      "paratha rolls near me",
      "late night restaurant near me",
      "johar town restaurant near me",
      "model town d block walay"
    ],
  };

  // Attach to window object for global client script accessibility
  window.RESTAURANT_CONFIG = Object.freeze(RESTAURANT_CONFIG);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = RESTAURANT_CONFIG;
  }
})(typeof window !== 'undefined' ? window : this);
