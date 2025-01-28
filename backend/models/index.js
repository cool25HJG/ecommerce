const { Sequelize, DataTypes } = require("sequelize");

const connection = new Sequelize("ecommercefirst", "root", "root", {
  host: "localhost",
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
  db.User.hasMany(db.Products, { foreignKey: "sellerId" });
db.Products.belongsTo(db.User, { foreignKey: "sellerId" }); 
db.User.hasMany(db.Commande, { foreignKey: "clientId" }); 
db.Commande.belongsTo(db.User, { foreignKey: "clientId" }); 
Category.hasMany(db.Products, { foreignKey: "categoryId" }); 
db.Products.belongsTo(Category, { foreignKey: "categoryId" }); 
db.Commande.belongsToMany(db.Products, { through: OrderItem });
 db.Products.belongsToMany(db.Commande, { through: OrderItem }); 
  // connection
  // .sync({ force: true })
  // .then(() => console.log("tables are created"))
  // .catch((err) => {
  //   throw err;
  // });
  module.exports=db