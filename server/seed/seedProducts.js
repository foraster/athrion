const { Product } = require("../models/models");
require('dotenv').config();
const sequelize = require("../db"); 

async function seedProducts() {
    console.log("Password type:", typeof process.env.DB_PASSWORD);
  await sequelize.authenticate();

  const products = [];

  for (let i = 1; i <= 20; i++) {
    products.push({
      title: `Test Product ${i}`,
      price_cents: 1999 + i * 100,
      category: "equipment",
      subcategory: "band",
      image: "placeholder.jpg",
      isActive: true,
      stock_quantity: 10,
      description: {
        de: {
          introTitle: "Test Intro",
          introText: "Test Beschreibung",
          features: ["Feature A", "Feature B"],
          highlights: ["Highlight 1"],
          closingText: "Abschluss",
        },
        en: {
          introTitle: "Test Intro",
          introText: "Test Description",
          features: ["Feature A", "Feature B"],
          highlights: ["Highlight 1"],
          closingText: "Conclusion",
        },
      },
    });
  }

  await Product.bulkCreate(products);
  console.log("Test products created.");
  process.exit();
}

seedProducts().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});