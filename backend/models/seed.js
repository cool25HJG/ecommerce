const { User, Products, OrderItem, Commande, Category } = require("./index");

const seedData = async () => {
  try {
    const usersSeedData = [
      {
        id: 1,
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@gmail.com',
        password: '$10$jJROBDDMnwHa1fGfifIaluTyomJi43xeQLhAUSFVg0hdhZVzEnase',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "https://as1.ftcdn.net/jpg/00/07/32/48/1000_F_7324864_FXazuBCI3dQBwIWY7gaWQzXskXJaTbrY.jpg",
        adresse: '123 Main St',
        phoneNumber: '1234567890'
      },
      {
        id: 2,
        firstName: 'client',
        lastName: 'client',
        email: 'client@gmail.com',
        password: '$10$1WliVBmwNI5ONoBV6UkIIO5Rj0Fp0Tt1mA7Hte.pd.KGEcKLAVEga',
        role: 'client',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "png.flaticon.com/512/6009/6009978.png",
        adresse: '456 Elm St',
        phoneNumber: '0987654321'
      },
      {
        id: 3,
        firstName: 'seller',
        lastName: 'seller',
        email: 'seller@gmail.com',
        password: '$10$GmL4/eaUQ7fOP5QFxhQle.EDYpqnaWaA2cp51H8vylLi/QJaPcyi.',
        role: 'seller',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "q=tbn:ANd9GcSS_impISzsKyTwKHDYYCU22SXql5QyZlvelg&s",
        adresse: '789 Oak St',
        phoneNumber: '1357902468'
      },
      {
        id: 4,
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        password: 'alicepass',
        role: 'client',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: null,
        adresse: '246 Pine St',
        phoneNumber: '9876543210'
      },
      {
        id: 5,
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob@example.com',
        password: 'bobpass',
        role: 'seller',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: null,
        adresse: '135 Maple St',
        phoneNumber: '0123456789'
      },
      // Add more users as needed
    ];
    
    const categoriesSeedData = [
      { id: 1, name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Books', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Clothing', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Sports', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Beauty', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Home & Kitchen', createdAt: new Date(), updatedAt: new Date() },
      // Add more categories as needed
    ];
    
    

    const productsSeedData = [
      {
        id: 1,
        name: 'Laptop',
        description: 'Powerful laptop for work and gaming',
        price: 1200.00,
        stock: 10,
        imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopsunder500-2048px-5452.jpg?auto=webp&quality=75&width=1024',
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
        imageUrl: 'https://m.media-amazon.com/images/I/41tp0JPPlmL.jpg',
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
        imageUrl: 'https://agora.tn/fr/42101-large_default/smartphone-smartec-vision-3go-64go-gold.jpg',
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
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzV_sbZRJAw16LM_CfZGCeQ82dUjB7Vuju7A&s',
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
        imageUrl: 'https://isto.pt/cdn/shop/files/Heavyweight_Black_ef459afb-ff7a-4f9a-b278-9e9621335444.webp?v=1710414950',
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
        imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2024/11/runningshoes-2048px-09528.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 4, // Sports category
        sellerId: 5    // Bob Brown (seller)
      },
      {
        id: 7,
        name: 'Eyeshadow Palette',
        description: 'Professional eyeshadow palette',
        price: 35.00,
        stock: 50,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQusltfQEcpN4D0l09d26sF8ZQgvokplNobmA&s',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 5, // Beauty category
        sellerId: 5    // Bob Brown (seller)
      },
      {
        id: 8,
        name: 'Kitchen Blender',
        description: 'High-performance blender for home use',
        price: 150.00,
        stock: 20,
        imageUrl: 'https://ae01.alicdn.com/kf/S71e7619de7f1490aa9dc1f0750a02bd5H.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6, // Home & Kitchen category
        sellerId: 2    // Jane Smith (seller)
      },
      {
        id: 9,
        name: 'Digital Camera',
        description: 'Compact digital camera for photography enthusiasts',
        price: 300.00,
        stock: 15,
        imageUrl: 'https://m.media-amazon.com/images/I/711X0g9zd5L.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1, // Electronics category
        sellerId: 2    // Jane Smith (seller)
      },
      {
        id: 10,
        name: 'Fictional Novel',
        description: 'Bestseller novel that captivates the imagination',
        price: 25.00,
        stock: 75,
        imageUrl: 'https://media.npr.org/assets/img/2021/08/13/711gd93ifkl_custom-80dd66e555a05cf605f043ca0095760a75d41be4.jpeg?s=1100&c=50&f=jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2, // Books category
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
      {
        id: 4,
        status: 'pending',
        totalPrice: 160.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: 5, // Bob Brown (client)
      },
      // Add more orders as needed
    ];
    

    const orderItemsSeedData = [
      {
        quantity: 2,
        price: 1200.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        CommandeId: 1, // Order with ID 1
        ProductId: 1   // Laptop (product with ID 1)
      },
      {
        quantity: 1,
        price: 150.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        CommandeId: 1, // Order with ID 1
        ProductId: 2   // Headphones (product with ID 2)
      },
      {
        quantity: 1,
        price: 800.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        CommandeId: 2, // Order with ID 2
        ProductId: 3   // Smartphone (product with ID 3)
      },
      {
        quantity: 1,
        price: 50.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        CommandeId: 2, // Order with ID 2
        ProductId: 4   // Python Programming Book (product with ID 4)
      },
      {
        quantity: 3,
        price: 60.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        CommandeId: 3, // Order with ID 3
        ProductId: 5   // T-shirt (product with ID 5)
      },
      {
        quantity: 1,
        price: 80.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        CommandeId: 3, // Order with ID 3
        ProductId: 6   // Running Shoes (product with ID 6)
      },
      {
        quantity: 2,
        price: 70.00,
        createdAt: new Date(),
        updatedAt: new Date(),
        CommandeId: 4, // Order with ID 4
        ProductId: 7   // Eyeshadow Palette (product with ID 7)
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
seedData()
module.exports = seedData;
