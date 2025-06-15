const { Order, OrderItem, Product } = require("../models/models");
const sequelize = require("../db");
const { Op } = require("sequelize");

async function seedOrders() {
  await sequelize.authenticate();

  // List of products
  const products = await Product.findAll({ limit: 30 });

  const statuses = ["in_progress", "in_delivery", "delivered", "cancelled"];
  const paymentMethods = ["card", "paypal", "bill", "cash"];
  const address = {
    firstName: "Max",
    lastName: "Mustermann",
    email: "max@example.com",
    phone: "+49 123 456789",
    addressLine1: "Musterstraße 12",
    addressLine2: "",
    zip: "10115",
    city: "Berlin",
    country: "Deutschland",
  };

  for (let i = 0; i <= 10; i++) {
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - i); // -i days ago

    const items = [];
    let total = 0;

    // choose 3 random products
    const chosen = products
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 6) + 1);

    for (const p of chosen) {
      const quantity = Math.floor(Math.random() * 3) + 1;
      items.push({
        productId: p.id,
        quantity,
        price_cents: p.price_cents,
      });
      total += p.price_cents * quantity;
    }

    const order = await Order.create({
      userId: 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total_price_cents: total,
      createdAt: orderDate,
      paymentMethod:
        paymentMethods[Math.floor(Math.random() * statuses.length)],
      shipping_address: address,
    });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price_cents: item.price_cents,
      });
    }

    console.log(`Order #${order.id} with ${items.length} items created`);
  }

  process.exit();
}

seedOrders().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
