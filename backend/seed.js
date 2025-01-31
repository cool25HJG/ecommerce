const { Sequelize, DataTypes } = require("sequelize");
const { faker } = require('@faker-js/faker');
require("dotenv").config();

const connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
});

const db = {};
db.User = require("./models/user.model")(connection, DataTypes);
db.Category = require("./models/category.model")(connection, DataTypes);
db.Products = require("./models/products.model")(connection, DataTypes);
db.Commande = require("./models/commande.model")(connection, DataTypes);
db.OrderItem = require("./models/orderitems.model")(connection, DataTypes);
db.Review = require("./models/review.model")(connection, DataTypes);

db.User.hasMany(db.Products, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "sellerId" });
db.Products.belongsTo(db.User, { foreignKey: "sellerId" });
db.User.hasMany(db.Commande, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "clientId" });
db.Commande.belongsTo(db.User, { foreignKey: "clientId" });
db.Category.hasMany(db.Products, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "categoryId" });
db.Products.belongsTo(db.Category, { foreignKey: "categoryId" });
db.Commande.belongsToMany(db.Products, { through: db.OrderItem });
db.Products.belongsToMany(db.Commande, { through: db.OrderItem });
db.OrderItem.belongsTo(db.Products);
db.OrderItem.belongsTo(db.Commande);
db.Products.hasMany(db.OrderItem);
db.Commande.hasMany(db.OrderItem);
db.Products.hasMany(db.Review, { foreignKey: "productId" });
db.Review.belongsTo(db.Products, { foreignKey: "productId" });
db.User.hasMany(db.Review, { foreignKey: "userId" });
db.Review.belongsTo(db.User, { foreignKey: "userId" });

const seedDatabase = async () => {
  await connection.sync({ force: true });
  console.log("Database synced!");

  // Create categories
  const categories = [];
  const usedCategoryNames = new Set();
  while (categories.length < 5) {
    const categoryName = faker.commerce.department();
    if (!usedCategoryNames.has(categoryName)) {
      categories.push(await db.Category.create({
        name: categoryName,
      }));
      usedCategoryNames.add(categoryName);
    }
  }

  // Create users
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push(await db.User.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(["admin", "seller", "client"]),
      image: faker.image.avatar(),
      adresse: faker.location.streetAddress(),
    }));
  }

  // Create products
  const products = [];
  for (let i = 0; i < 20; i++) {
    products.push(await db.Products.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.number.int({ min: 1, max: 100 }),
      imageUrl: faker.image.url(),
      sellerId: faker.helpers.arrayElement(users.filter(user => user.role === "seller")).id,
      categoryId: faker.helpers.arrayElement(categories).id,
      isFavorite: faker.datatype.boolean(),
    }));
  }

  // Create commandes
  const commandes = [];
  for (let i = 0; i < 10; i++) {
    commandes.push(await db.Commande.create({
      status: faker.helpers.arrayElement(["pending", "completed", "cancelled"]),
      totalPrice: faker.commerce.price(),
      clientId: faker.helpers.arrayElement(users.filter(user => user.role === "client")).id,
    }));
  }

  // Create order items with unique combinations of CommandeId and ProductId
  const usedOrderItemKeys = new Set();
  for (let i = 0; i < 30; i++) {
    let CommandeId, ProductId, key;
    do {
      CommandeId = faker.helpers.arrayElement(commandes).id;
      ProductId = faker.helpers.arrayElement(products).id;
      key = `${CommandeId}-${ProductId}`;
    } while (usedOrderItemKeys.has(key));

    await db.OrderItem.create({
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: faker.commerce.price(),
      CommandeId,
      ProductId,
    });

    usedOrderItemKeys.add(key);
  }

  // Create reviews
  for (let i = 0; i < 50; i++) {
    await db.Review.create({
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.words(10),
      productId: faker.helpers.arrayElement(products).id,
      userId: faker.helpers.arrayElement(users).id,
    });
  }

  console.log("Database seeded!");
  process.exit(0);
};

seedDatabase().catch(error => {
  console.error("Error seeding database: ", error);
  process.exit(1);
});