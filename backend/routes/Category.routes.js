const express = require("express");
const Router = express.Router();
const {
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
Router.get("/",getAllCategory);
Router.post("/",addCategory);
Router.put("/:id",updateCategory);
Router.delete("/:id",deleteCategory);

module.exports = Router;