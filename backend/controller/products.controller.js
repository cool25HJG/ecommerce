const { where } = require("sequelize");
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
      const {name,description,price,stock,imageUrl}=req.body
      const product=await Products.findOne({where:{id:id}})
      if(!product){
      res.status(404).send({message:"product is not found"})
      }
      const updated = await Products.update({
        name:name||product.name,
        description:description||product.description,
        price:price||product.price,
        stock:stock||product.stock,
        imageUrl:imageUrl||product.imageUrl
      }, {
        where: { id: id }
      });
      res.status(201).send({ message: "Product is updated successfully", updated });
    } catch (error) {
      console.log(error,"from update")
      throw error;
    }
  },
  toggleProduct: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(401).send({ message: "id is not send" });
      }
      const oneproduct = await Todo.findeOne({where:{id:id}});
      if (!oneproduct) {
        return res
          .status(401)
          .send({ message: "product doesn't exist in database" });
      }

      const updated = await Todo.update({isFavorite:!oneproduct.isFavorite},{where:{id:id}})
      res.send({ message: "todo upadated", updated: updated });
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