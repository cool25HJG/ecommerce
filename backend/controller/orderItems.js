const { OrderItem, Products, Commande } = require("../models/index");

module.exports = {
  addOrderItem: async (req, res) => {
    try {
      const orderItem = await OrderItem.create(req.body);
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: "Error creating order item", error });
    }
  },

  getOrderItems: async (req, res) => {
    try {
      const orderItems = await OrderItem.findAll({
        include: [
          { model: Products },
          { model: Commande }
        ]
      });
      res.send(orderItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order items", error });
    }
  }
};