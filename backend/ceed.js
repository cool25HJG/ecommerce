const db = require("./models/index"); // Adjust the path to your db.js file
const { User, Category, Products, Commande, OrderItem, Review } = db;

// Fake data for Users
const users = [
  {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    email: "john.doe@example.com",
    password: "password123",
    role: "client",
    image: "https://example.com/images/john-doe.jpg",
    adresse: "123 Main St, City, Country",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "0987654321",
    email: "jane.smith@example.com",
    password: "password123",
    role: "seller",
    image: "https://example.com/images/jane-smith.jpg",
    adresse: "456 Elm St, City, Country",
  },
  {
    firstName: "Admin",
    lastName: "User",
    phoneNumber: "1122334455",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    image: "https://example.com/images/admin.jpg",
    adresse: "789 Oak St, City, Country",
  },
];

// Fake data for Categories
const categories = [
  { name: "Women's Fashion" },
  { name: "Men's Fashion" },
  { name: "Electronics" },
  { name: "Home & Lifestyle" },
  { name: "Medicine" },
  { name: "Sports & Outdoor" },
  { name: "Baby's & Toys" },
  { name: "Groceries & Pets" },
  { name: "Health & Beauty" },
];

// Fake data for Products (prices as integers)
const products = [
  {
    name: "Women's Summer Dress",
    description: "Lightweight and comfortable summer dress for women.",
    price: 3999, // $39.99 in cents
    stock: 50,
    imageUrl: "https://example.com/images/womens-dress.jpg",
    categoryId: 1, // Women's Fashion
    isFavorite: false,
    averageRating: 4.5,
    totalReviews: 120,
    sellerId: 2, // Jane Smith (seller)
  },
  {
    name: "Men's Casual Shirt",
    description: "Stylish and comfortable casual shirt for men.",
    price: 2999, // $29.99 in cents
    stock: 75,
    imageUrl: "https://example.com/images/mens-shirt.jpg",
    categoryId: 2, // Men's Fashion
    isFavorite: true,
    averageRating: 4.7,
    totalReviews: 95,
    sellerId: 2, // Jane Smith (seller)
  },
  {
    name: "Wireless Bluetooth Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: 9999, // $99.99 in cents
    stock: 30,
    imageUrl: "https://example.com/images/bluetooth-earbuds.jpg",
    categoryId: 3, // Electronics
    isFavorite: true,
    averageRating: 4.8,
    totalReviews: 200,
    sellerId: 2, // Jane Smith (seller)
  },
  {
    name: "Modern Floor Lamp",
    description: "Sleek and modern floor lamp for your living room.",
    price: 8999, // $89.99 in cents
    stock: 20,
    imageUrl: "https://example.com/images/floor-lamp.jpg",
    categoryId: 4, // Home & Lifestyle
    isFavorite: false,
    averageRating: 4.6,
    totalReviews: 85,
    sellerId: 2, // Jane Smith (seller)
  },
  {
    name: "Vitamin C Supplements",
    description: "Boost your immune system with Vitamin C tablets.",
    price: 1499, // $14.99 in cents
    stock: 100,
    imageUrl: "https://example.com/images/vitamin-c.jpg",
    categoryId: 5, // Medicine
    isFavorite: false,
    averageRating: 4.4,
    totalReviews: 150,
    sellerId: 2, // Jane Smith (seller)
  },
  {
    name: "Yoga Mat",
    description: "Eco-friendly and non-slip yoga mat for all levels.",
    price: 2499, // $24.99 in cents
    stock: 60,
    imageUrl: "https://example.com/images/yoga-mat.jpg",
    categoryId: 6, // Sports & Outdoor
    isFavorite: true,
    averageRating: 4.9,
    totalReviews: 300,
    sellerId: 2, // Jane Smith (seller)
  },
  {
    name: "Soft Plush Teddy Bear",
    description: "Cute and cuddly teddy bear for babies and toddlers.",
    price: 1999, // $19.99 in cents
    stock: 40,
    imageUrl: "https://example.com/images/teddy-bear.jpg",
    categoryId: 7, // Baby's & Toys
    isFavorite: false,
    averageRating: 4.7,
    totalReviews: 90,
    sellerId: 2, // Jane Smith (seller)
  },
  {
    name: "Organic Dog Food",
    description: "Healthy and organic dog food for all breeds.",
    price: 3499, // $34.99 in cents
    stock: 80,
    imageUrl: "https://example.com/images/dog-food.jpg",
    categoryId: 8, // Groceries & Pets
    isFavorite: true,
    averageRating: 4.6,
    totalReviews: 110,
    sellerId: 2, // Jane Smith (seller)
  },
  {
    name: "Moisturizing Face Cream",
    description: "Hydrating face cream for all skin types.",
    price: 2299, // $22.99 in cents
    stock: 70,
    imageUrl: "https://example.com/images/face-cream.jpg",
    categoryId: 9, // Health & Beauty
    isFavorite: false,
    averageRating: 4.5,
    totalReviews: 180,
    sellerId: 2, // Jane Smith (seller)
  },
];

// Fake data for Commandes (totalPrice as integer)
const commandes = [
  {
    status: "pending",
    totalPrice: 6998, // $69.98 in cents (Dress + Shirt)
    clientId: 1, // John Doe (client)
  },
];



// Fake data for Reviews
const reviews = [
  {
    rating: 5,
    comment: "Great product! Highly recommended.",
    productId: 1, // Women's Summer Dress
    userId: 1, // John Doe (client)
  },
  {
    rating: 4,
    comment: "Good quality, but a bit expensive.",
    productId: 2, // Men's Casual Shirt
    userId: 1, // John Doe (client)
  },
];
// Fake data for OrderItems (price as integer)
const orderItems = [
  {
    quantity: 1,
    price: 3999, // $39.99 in cents (Dress)
    productId: 1, // Women's Summer Dress
    commandeId: 1, // First order
  },
  {
    quantity: 1,
    price: 2999, // $29.99 in cents (Shirt)
    productId: 2, // Men's Casual Shirt
    commandeId: 1, // First order
  },
];
const seedDatabase = async () => {
  try {
    // // Sync the database
    await db.connection.sync({ force: true }); // Use `force: true` to drop tables and recreate them
    console.log("Database synced!");

    // Insert users
    const createdUsers = await User.bulkCreate(users);
    console.log(`${createdUsers.length} users created!`);

    // Insert categories
    const createdCategories = await Category.bulkCreate(categories);
    console.log(`${createdCategories.length} categories created!`);

    // Insert products
    const createdProducts = await Products.bulkCreate(products);
    console.log(`${createdProducts.length} products created!`);

    // Insert commandes
    const createdCommandes = await Commande.bulkCreate(commandes);
    console.log(`${createdCommandes.length} commandes created!`);

    // Insert order items
    const createdOrderItems = await OrderItem.bulkCreate(orderItems);
    console.log(`${createdOrderItems.length} order items created!`);

    // Insert reviews
    const createdReviews = await Review.bulkCreate(reviews);
    console.log(`${createdReviews.length} reviews created!`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(); // Exit the script
  }
};

seedDatabase();