const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const axios = require("axios");
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const protectedRoutes = require("./routes/protectedRoutes");
const Category = require("./routes/Category.routes");
const Products = require("./routes/Products.routes");
const Commande = require("./routes/Commande.routes");
const Order = require("./routes/order.routes");
const User = require("./routes/User.routes");
const Review=require("./routes/review.routes")
app.use("/api/user", User);
app.use("/api/Category", Category);
app.use("/api/Products", Products);
app.use("/api/Commande", Commande);
app.use("/api/order", Order);
app.use("/api/review", Review);
// Payment endpoint
app.post('/create-payment', async (req, res) => {
  const {
    amount,
    currency,
    description,
    firstName,
    lastName,
    phoneNumber,
    email,
    orderId
  } = req.body;

  try {
    console.log('Creating payment with:', {
      amount,
      currency,
      description,
      firstName,
      lastName,
      phoneNumber,
      email,
      orderId
    });

    const response = await axios.post('https://api.preprod.konnect.network/api/v2/payments/init-payment', {
      receiverWalletId: process.env.KONNECT_WALLET_ID,
      token: currency,
      amount,
      type: "immediate",
      description,
      acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR"],
      lifespan: 10,
      checkoutForm: true,
      addPaymentFeesToAmount: true,
      firstName,
      lastName,
      phoneNumber,
      email,
      orderId,
      webhook: "https://yourdomain.com/webhook",
      silentWebhook: true,
      successUrl: "https://yourdomain.com/success",
      failUrl: "https://yourdomain.com/failure",
      theme: "dark"
    }, {
      headers: {
        'x-api-key': process.env.KONNECT_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('Payment response:', response.data);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      res.status(500).json({ error: error.response.data });
    } else if (error.request) {
      console.error('Error request:', error.request);
      res.status(500).json({ error: 'No response received from Konnect API' });
    } else {
      console.error('Error message:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});