const express = require("express");
const Router = express.Router();
const {
  getAllCommande,
  addCommande,
  updateCommande,
  deleteCommande,
} = require("../controller/Commande.controller");
Router.get("/",getAllCommande);
Router.post("/",addCommande);
Router.put("/:id",updateCommande);
Router.delete("/:id",deleteCommande);

module.exports = Router;