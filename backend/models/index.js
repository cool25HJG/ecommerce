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
  connection
  .sync({ alter: true })
  .then(() => console.log("tables are created"))
  .catch((err) => {
    throw err;
  });
  module.exports=db