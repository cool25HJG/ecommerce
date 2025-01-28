const express=require("express")
const app=express()
const PORT=4000
const cors=require("cors")
const db=require("./models/index")
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

app.use(cors())
app.use(express.json())
// Public routes for registration and login
app.use('/auth', authRoutes);

// Protected routes (only accessible with a valid JWT)
app.use('/protected', protectedRoutes);
const Category = require("./routes/Category.routes");
const Products = require("./routes/Products.routes");
const Commande = require("./routes/Commande.routes");
const User = require("./routes/User.routes")

const addOrderItem = require("./routes/order.routes");

app.use("/api/user",User)
app.use("/api/Category", Category);
app.use("/api/Products", Products);
app.use("/api/Commande", Commande);
app.use("/api/order", addOrderItem);
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });