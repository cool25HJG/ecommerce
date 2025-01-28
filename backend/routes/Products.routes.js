const express = require("express");
const Router = express.Router();
const {
  getAllProducts,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../controller/products.controller");
Router.get("/",getAllProducts);
Router.post("/",addProducts);
Router.put("/:id",updateProducts);
Router.delete("/:id",deleteProducts);

module.exports = Router;