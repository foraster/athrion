const { User, Order, OrderItem, Product } = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderController {
  async create(req, res, next) {
    const { userId, totalPriceCents, products } = req.body;
    if (!userId || !totalPriceCents || !products) {
      return next(
        ApiError.badRequest(
          "The userId, totalPriceCents and products must be provided"
        )
      );
    }
    const order = await Order.create({
      userId,
      total_price_cents: totalPriceCents,
      status: "in_progress",
    });

    for (const item of products) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        price_cents: item.price_cents,
      });
    }

    return res
      .status(200)
      .json({ message: "Order successfully created", orderId: order.id });
  }
  async getAllOrders(req, res, next) {
  try {
    const orders = await Order.findAll(
      {
      include: [
        {
          model: User,
          attributes: ["email"], 
        },
      ],
      order: [["createdAt", "DESC"]],
    }
  );

    return res.json(orders);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal("Failed to fetch orders"));
  }
}
  async getOneOrder(req, res, next) {
    const { orderId } = req.params;
    if (!orderId) {
      return next(ApiError.badRequest("OrderID must be provided"));
    }
    try {
      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                attributes: ["id", "title"],
              },
            ],
          },
        ],
      });
      if (!order) {
        return next(ApiError.notFound("Order with this ID was not found"));
      }
      return res.json(order);
    } catch (error) {
      console.error(error)
      return next(
        ApiError.internal("An unknown error occurred while fetching order")
      );
    }
  }
  async getByUserId(req, res, next) {
    const { userId } = req.params;
    if (!userId) {
      return next(ApiError.badRequest("UserID must be provided"));
    }
    try {
      const orders = await Order.findAll({ where: { userId } });
      return res.json(orders);
    } catch (error) {
      return next(ApiError.internal("An unknown error while fetching orders"));
    }
  }
  async changeStatus(req, res, next) {
    const { status } = req.body;
    const { orderId } = req.params;
    if (!orderId || !status) {
      return next(ApiError.badRequest("OrderID and status must be provided"));
    }
    try {
      const order = await Order.findOne({ where: { id: orderId } });
      if (!order) {
        return next(ApiError.notFound("Order was not found"));
      }
      await order.update({
        status: status,
      });
      return res.json({ message: "Order successfully created" });
    } catch (error) {
      return next(ApiError.internal("Failed to change order status"));
    }
  }
}
module.exports = new OrderController();
