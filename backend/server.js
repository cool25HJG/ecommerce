const express=require("express")
const app=express()
const PORT=4000
const cors=require("cors")
const db=require("./models/index")
app.use(cors())
app.use(express.json())
const Category = require("./routes/Category.routes");
const Products = require("./routes/Products.routes");


app.use("/api/Category", Category);
app.use("/api/Products", Products);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });