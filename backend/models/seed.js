const { User } = require("./index")
const { Products } = require('./index');
const { OrderItem } = require('./index');
const { Commande } = require('./index');
const { Category } = require('./index');

const seedData = async () => {
  try {
    const usersSeedData = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: 'client',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'secret321',
          role: 'seller',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'adminpassword',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Alice Johnson',
          email: 'alice@example.com',
          password: 'alicepass',
          role: 'client',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Bob Brown',
          email: 'bob@example.com',
          password: 'bobpass',
          role: 'seller',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Add more users as needed
      ];
      const categoriesSeedData = [
        { id: 1, name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'Books', createdAt: new Date(), updatedAt: new Date() },
        { id: 3, name: 'Clothing', createdAt: new Date(), updatedAt: new Date() },
        { id: 4, name: 'Sports', createdAt: new Date(), updatedAt: new Date() },
        // Add more categories as needed
      ];
      const productsSeedData = [
        {
          id: 1,
          name: 'Laptop',
          description: 'Powerful laptop for work and gaming',
          price: 1200.00,
          stock: 10,
          imageUrl: 'https://example.com/laptop.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: 1, // Electronics category
          sellerId: 2    // Jane Smith (seller)
        },
        {
          id: 2,
          name: 'Headphones',
          description: 'High-quality noise-canceling headphones',
          price: 150.00,
          stock: 25,
          imageUrl: 'https://example.com/headphones.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: 1, // Electronics category
          sellerId: 2    // Jane Smith (seller)
        },
        {
          id: 3,
          name: 'Smartphone',
          description: 'Latest model with advanced features',
          price: 800.00,
          stock: 15,
          imageUrl: 'https://example.com/smartphone.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: 1, // Electronics category
          sellerId: 2    // Jane Smith (seller)
        },
        {
          id: 4,
          name: 'Python Programming Book',
          description: 'Comprehensive guide to Python programming',
          price: 50.00,
          stock: 50,
          imageUrl: 'https://example.com/python-book.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: 2, // Books category
          sellerId: 2    // Jane Smith (seller)
        },
        {
          id: 5,
          name: 'T-shirt',
          description: 'Comfortable cotton t-shirt',
          price: 20.00,
          stock: 100,
          imageUrl: 'https://example.com/t-shirt.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: 3, // Clothing category
          sellerId: 5    // Bob Brown (seller)
        },
        {
          id: 6,
          name: 'Running Shoes',
          description: 'Lightweight running shoes',
          price: 80.00,
          stock: 30,
          imageUrl: 'https://example.com/running-shoes.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: 4, // Sports category
          sellerId: 5    // Bob Brown (seller)
        },
        // Add more products as needed
      ];
      const commandesSeedData = [
        {
          id: 1,
          status: 'pending',
          totalPrice: 1350.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          clientId: 1, // John Doe (client)
        },
        {
          id: 2,
          status: 'completed',
          totalPrice: 250.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          clientId: 1, // John Doe (client)
        },
        {
          id: 3,
          status: 'cancelled',
          totalPrice: 400.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          clientId: 4, // Alice Johnson (client)
        },
        // Add more orders as needed
      ];
      const orderItemsSeedData = [
        {
          quantity: 2,
          price: 1200.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          commandeId: 1, // Order with ID 1
          productId: 1   // Laptop (product with ID 1)
        },
        {
          quantity: 1,
          price: 150.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          commandeId: 1, // Order with ID 1
          productId: 2   // Headphones (product with ID 2)
        },
        {
          quantity: 1,
          price: 800.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          commandeId: 2, // Order with ID 2
          productId: 3   // Smartphone (product with ID 3)
        },
        {
          quantity: 1,
          price: 50.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          commandeId: 2, // Order with ID 2
          productId: 4   // Python Programming Book (product with ID 4)
        },
        {
          quantity: 3,
          price: 60.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          commandeId: 3, // Order with ID 3
          productId: 5   // T-shirt (product with ID 5)
        },
        {
          quantity: 2,
          price: 160.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          commandeId: 3, // Order with ID 3
          productId: 6   // Running Shoes (product with ID 6)
        },
        // Add more order items as needed
      ];

      await User.bulkCreate(usersSeedData);
      await Category.bulkCreate(categoriesSeedData);
      await Products.bulkCreate(productsSeedData);
      await Commande.bulkCreate(commandesSeedData);
      await OrderItem.bulkCreate(orderItemsSeedData);
  
      console.log('Seed data inserted successfully.');
    } catch (error) {
      console.error('Error seeding data:', error);
    } 
};
seedData();

module.exports = seedData;
