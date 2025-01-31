const { Products, User, Category } = require("../models/index");

module.exports = {
 getAllProducts : async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [
        { model: User },
        { model: Category }
      ],
      order: [['createdAt', 'DESC']] // Order by createdAt in descending order
    });
    res.send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Failed to fetch products');
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
      const { name, description, price, stock, imageUrl } = req.body;
      const product = await Products.findOne({ where: { id } });
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      const updated = await Products.update({
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        stock: stock || product.stock,
        imageUrl: imageUrl || product.imageUrl
      }, {
        where: { id }
      });
      res.status(201).send({ message: "Product updated successfully", updated });
    } catch (error) {
      console.log(error, "from update");
      throw error;
    }
  },
  
  toggleFavorite: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Products.findOne({ where: { id } });
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      const updated = await Products.update(
        { isFavorite: !product.isFavorite },
        { where: { id } }
      );
      res.send({ message: "Product updated", updated });
    } catch (error) {
      throw error;
    }
  },
  
  getFavoriteProducts: async (req, res) => {
    try {
      const products = await Products.findAll({
        where: { isFavorite: true },
        include: [
          { model: User },
          { model: Category }
        ]
      });
      res.send(products);
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
        where: { id }
      });
      res.send({ message: "Product deleted successfully" });
    } catch (error) {
      throw error;
    }
  }
};