const { Products, User, Category } = require("../models/index");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Products.findAll({
        include: [
          { model: User, as: 'seller' },
          { model: Category }
        ]
      });
      res.send(products);
    } catch (error) {
      throw error;
    }
  },
  
  addProducts: async (req, res) => {
    try {
      const body = req.body;
      const newProduct = await Products.create(body);
      res.status(201).send({ message: "Product is created successfully", newProduct });
    } catch (error) {
      throw error;
    }
  },
  
  updateProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      if (!body) {
        res.status(401).send({ message: "Body is not sent" });
      }
      const updated = await Products.update(body, {
        where: { id: id }
      });
      res.status(201).send({ message: "Product is updated successfully", updated });
    } catch (error) {
      throw error;
    }
  },
  
  deleteProducts: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(401).send({ message: "ID is not sent" });
      }
      await Products.destroy({
        where: { id: id }
      });
      res.send({ message: "Product is deleted successfully" });
    } catch (error) {
      throw error;
    }
  }
};