const {OrderItem}=require("../models/index")

exports.addOrderItem = async (req, res) => {
    try {
      const orderItem = await OrderItem.create(req.body);
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: "Error creating order item", error });
    }
}