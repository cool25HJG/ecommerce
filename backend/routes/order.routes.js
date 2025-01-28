const express = require("express");
const Router = express.Router();
const {addOrderItem } = require("../controller/orderItems");
Router.post("/orderitems", addOrderItem);