const { Sequelize, DataTypes } = require("sequelize")
require("dotenv").config()
const connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
});
connection
  .authenticate()
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    throw err;
  });
  const db={}
  db.User=require("./user.model")(connection,DataTypes)
  db.Category=require("./category.model")(connection,DataTypes)
  db.Products=require("./products.model")(connection,DataTypes)
  db.Commande=require("./commande.model")(connection,DataTypes)
  db.OrderItem=require("./orderitems.model")(connection,DataTypes)

  db.User.hasMany(db.Products, { onDelete:"CASCADE" , onUpdate:"CASCADE", foreignKey: "sellerId" });
db.Products.belongsTo(db.User, {  foreignKey: "sellerId" }); 
db.User.hasMany(db.Commande, {onDelete:"CASCADE" , onUpdate:"CASCADE", foreignKey: "clientId" }); 
db.Commande.belongsTo(db.User, { foreignKey: "clientId" }); 
db.Category.hasMany(db.Products, { onDelete:"CASCADE" , onUpdate:"CASCADE", foreignKey: "categoryId" }); 
db.Products.belongsTo(db.Category, { foreignKey: "categoryId" }); 
db.Commande.belongsToMany(db.Products, { through: db.OrderItem });
 db.Products.belongsToMany(db.Commande, { through: db.OrderItem }); 
 db.OrderItem.belongsTo(db.Products);
 db.OrderItem.belongsTo(db.Commande);
 db.Products.hasMany(db.OrderItem);
 db.Commande.hasMany(db.OrderItem);
 
  // connection
  // .sync({ alter: true })
  // .then(() => console.log("tables are created"))
  // .catch((err) => {
  //   throw err;
  // });
  module.exports=db