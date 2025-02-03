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
  {
    firstName: "Alice",
    lastName: "Johnson",
    phoneNumber: "5555555555",
    email: "alice.johnson@example.com",
    password: "password123",
    role: "client",
    image: "https://example.com/images/alice-johnson.jpg",
    adresse: "321 Pine St, City, Country",
  },
  {
    firstName: "Bob",
    lastName: "Brown",
    phoneNumber: "6666666666",
    email: "bob.brown@example.com",
    password: "password123",
    role: "client",
    image: "https://example.com/images/bob-brown.jpg",
    adresse: "654 Cedar St, City, Country",
  },
  {
    firstName: "Ghassen",
    lastName: "Kharrat",
    phoneNumber: "99461666",
    email: "ghassen@gmail.com",
    password: "$10$JZ7q92QLldzvS3nfBMJQUuxbP08nUefAy7Nqjt86ts0hOKHq9jFrC",
    role: "admin",
    image: "https://example.com/images/admin.jpg",
    adresse: "789 Oak St, City, Country",
  },
  {
    firstName: "Houssem",
    lastName: "Saad Bennani",
    phoneNumber: "23123456",
    email: "houssem@gmail.com",
    password: "$10$JZ7q92QLldzvS3nfBMJQUuxbP08nUefAy7Nqjt86ts0hOKHq9jFrC",
    role: "admin",
    image: "https://example.com/images/admin.jpg",
    adresse: "789 Oak St, City, Country",
  },
  {
    firstName: "Lilia",
    lastName: "Ghezaiel",
    phoneNumber: "98988989",
    email: "lilia@gmail.com",
    password: "$10$JZ7q92QLldzvS3nfBMJQUuxbP08nUefAy7Nqjt86ts0hOKHq9jFrC",
    role: "admin",
    image: "https://example.com/images/admin.jpg",
    adresse: "789 Oak St, City, Country",
  },
  {
    firstName: "Nour",
    lastName: "Tebourski",
    phoneNumber: "99666666",
    email: "nour@gmail.com",
    password: "$10$JZ7q92QLldzvS3nfBMJQUuxbP08nUefAy7Nqjt86ts0hOKHq9jFrC",
    role: "admin",
    image: "https://example.com/images/admin.jpg",
    adresse: "789 Oak St, City, Country",
  },
  {
    firstName: "Anas",
    lastName: "Saoudi Khemiri",
    phoneNumber: "22222333",
    email: "anas@gmail.com",
    password: "$10$JZ7q92QLldzvS3nfBMJQUuxbP08nUefAy7Nqjt86ts0hOKHq9jFrC",
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
    price: 3999,
    stock: 50,
    imageUrl: "https://tse3.mm.bing.net/th?id=OIP.QS41gD6-IhgF3p2tZtzrjQHaJ4&pid=Api&P=0&h=180", // Summer dress
    categoryId: 1,
    isFavorite: false,
    averageRating: 4.5,
    totalReviews: 120,
    sellerId: 2,
  },
  {
    name: "Men's Casual Shirt",
    description: "Stylish and comfortable casual shirt for men.",
    price: 2999,
    stock: 75,
    imageUrl: "https://tse1.mm.bing.net/th?id=OIP.22hRUwhE6ZgBP_zYOeHpewHaLM&pid=Api&P=0&h=180", // Casual shirt
    categoryId: 2,
    isFavorite: true,
    averageRating: 4.7,
    totalReviews: 95,
    sellerId: 2,
  },
  {
    name: "Wireless Bluetooth Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: 9999,
    stock: 30,
    imageUrl: "https://sp.yimg.com/ib/th?id=OPEC.wn33VSseHfw9Cw474C474&o=5&pid=21.1&w=160&h=105", // Bluetooth earbuds
    categoryId: 3,
    isFavorite: true,
    averageRating: 4.8,
    totalReviews: 200,
    sellerId: 2,
  },
  {
    name: "Modern Floor Lamp",
    description: "Sleek and modern floor lamp for your living room.",
    price: 8999,
    stock: 20,
    imageUrl: "https://tse4.mm.bing.net/th?id=OIP.R7u4-h1yruGbsWEYIujDYAHaHa&pid=Api&P=0&h=180", // Floor lamp
    categoryId: 4,
    isFavorite: false,
    averageRating: 4.6,
    totalReviews: 85,
    sellerId: 2,
  },
  {
    name: "Vitamin C Supplements",
    description: "Boost your immune system with Vitamin C tablets.",
    price: 1499,
    stock: 100,
    imageUrl: "https://sp.yimg.com/ib/th?id=OPEC.hLXBFxiviYn9Rg474C474&o=5&pid=21.1&w=160&h=105", // Vitamin C
    categoryId: 5,
    isFavorite: false,
    averageRating: 4.4,
    totalReviews: 150,
    sellerId: 2,
  },
  {
    name: "Yoga Mat",
    description: "Eco-friendly and non-slip yoga mat for all levels.",
    price: 2499,
    stock: 60,
    imageUrl: "https://tse3.mm.bing.net/th?id=OIP.xZivnhLOBvhYrblYtfWC_wHaE8&pid=Api&P=0&h=180", // Yoga mat
    categoryId: 6,
    isFavorite: true,
    averageRating: 4.9,
    totalReviews: 300,
    sellerId: 2,
  },
  {
    name: "Soft Plush Teddy Bear",
    description: "Cute and cuddly teddy bear for babies and toddlers.",
    price: 1999,
    stock: 40,
    imageUrl: "https://tse4.mm.bing.net/th?id=OIP.5aiL4kzk2-_tcsCUzpZWlQHaHa&pid=Api&P=0&h=180", // Teddy bear
    categoryId: 7,
    isFavorite: false,
    averageRating: 4.7,
    totalReviews: 90,
    sellerId: 2,
  },
  {
    name: "Organic Dog Food",
    description: "Healthy and organic dog food for all breeds.",
    price: 3499,
    stock: 80,
    imageUrl: "https://tse3.mm.bing.net/th?id=OIP.N_QBBMD1s4T59ObvNxiiBQHaM-&pid=Api&P=0&h=180", // Dog food
    categoryId: 8,
    isFavorite: true,
    averageRating: 4.6,
    totalReviews: 110,
    sellerId: 2,
  },
  {
    name: "Moisturizing Face Cream",
    description: "Hydrating face cream for all skin types.",
    price: 2299,
    stock: 70,
    imageUrl: "https://sp.yimg.com/ib/th?id=OPEC.lN%2fSh8%2fGVWYS%2fg474C474&o=5&pid=21.1&w=160&h=105", // Face cream
    categoryId: 9,
    isFavorite: false,
    averageRating: 4.5,
    totalReviews: 180,
    sellerId: 2,
  },
  {
    name: "Leather Handbag",
    description: "Elegant leather handbag for women.",
    price: 7999,
    stock: 25,
    imageUrl: "https://tse1.mm.bing.net/th?id=OIP.qLQo_DIMqXI9-yNI7_q2pgHaHa&pid=Api&P=0&h=180", // Leather handbag
    categoryId: 1,
    isFavorite: true,
    averageRating: 4.7,
    totalReviews: 90,
    sellerId: 2,
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes for men.",
    price: 5999,
    stock: 50,
    imageUrl: "https://tse2.mm.bing.net/th?id=OIP.olPFOHywc8X6Awpjj58iEgHaEL&pid=Api&P=0&h=180", // Running shoes
    categoryId: 2,
    isFavorite: false,
    averageRating: 4.6,
    totalReviews: 120,
    sellerId: 2,
  },
  {
    name: "Smartwatch",
    description: "Feature-packed smartwatch with fitness tracking.",
    price: 12999,
    stock: 15,
    imageUrl: "https://sp.yimg.com/ib/th?id=OPEC.15FI7H8oWKfUrA474C474&o=5&pid=21.1&w=160&h=105", // Smartwatch
    categoryId: 3,
    isFavorite: true,
    averageRating: 4.8,
    totalReviews: 200,
    sellerId: 2,
  },
  {
    name: "Coffee Maker",
    description: "Automatic coffee maker for your home.",
    price: 8999,
    stock: 30,
    imageUrl: "https://tse1.mm.bing.net/th?id=OIP.v7ORILVh4Fl0C88CzQDN9QHaHa&pid=Api&P=0&h=180", // Coffee maker
    categoryId: 4,
    isFavorite: false,
    averageRating: 4.5,
    totalReviews: 150,
    sellerId: 2,
  },
  {
    name: "Multivitamin Tablets",
    description: "Daily multivitamin tablets for overall health.",
    price: 1999,
    stock: 100,
    imageUrl: "https://tse1.mm.bing.net/th?id=OIP.g9aN81YBovEmMBwDf_VckQHaHa&pid=Api&P=0&h=180", // Multivitamin
    categoryId: 5,
    isFavorite: false,
    averageRating: 4.3,
    totalReviews: 80,
    sellerId: 2,
  },
  {
    name: "Camping Tent",
    description: "Durable camping tent for outdoor adventures.",
    price: 14999,
    stock: 10,
    imageUrl: "https://tse3.mm.bing.net/th?id=OIP.fzer1T0yax_DoY6OhJsaMwHaGD&pid=Api&P=0&h=180", // Camping tent
    categoryId: 6,
    isFavorite: true,
    averageRating: 4.9,
    totalReviews: 250,
    sellerId: 2,
  },
  {
    name: "Baby Stroller",
    description: "Lightweight and foldable baby stroller.",
    price: 12999,
    stock: 20,
    imageUrl: "https://tse1.mm.bing.net/th?id=OIP.JtqC9rw9IMqNDS-Yq-pg-wHaHa&pid=Api&P=0&h=180", // Baby stroller
    categoryId: 7,
    isFavorite: false,
    averageRating: 4.7,
    totalReviews: 100,
    sellerId: 2,
  },
  {
    name: "Cat Food",
    description: "Healthy and nutritious cat food.",
    price: 2499,
    stock: 60,
    imageUrl: "https://tse3.mm.bing.net/th?id=OIP.xlGqyOXdRa08UNCNsCN0PgHaHa&pid=Api&P=0&h=180", // Cat food
    categoryId: 8,
    isFavorite: true,
    averageRating: 4.6,
    totalReviews: 90,
    sellerId: 2,
  },
  {
    name: "Hair Dryer",
    description: "Professional hair dryer for salon-quality results.",
    price: 4999,
    stock: 40,
    imageUrl: "https://tse2.mm.bing.net/th?id=OIP.yp4oCLKBUmbJaeL5F6hdkQHaHa&pid=Api&P=0&h=180", // Hair dryer
    categoryId: 9,
    isFavorite: false,
    averageRating: 4.5,
    totalReviews: 120,
    sellerId: 2,
  },
  {
    name: "Sunglasses",
    description: "Stylish sunglasses with UV protection.",
    price: 2999,
    stock: 50,
    imageUrl: "https://tse1.mm.bing.net/th?id=OIP.-PouQOy_kmP-NjR7bAQf5wHaJb&pid=Api&P=0&h=180", // Sunglasses
    categoryId: 1,
    isFavorite: true,
    averageRating: 4.7,
    totalReviews: 110,
    sellerId: 2,
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket for men.",
    price: 6999,
    stock: 30,
    imageUrl: "https://sp.yimg.com/ib/th?id=OPEC.wwlmi86%2fbVtdeQ474C474&o=5&pid=21.1&w=160&h=105", // Denim jacket
    categoryId: 2,
    isFavorite: false,
    averageRating: 4.6,
    totalReviews: 100,
    sellerId: 2,
  },
  {
    name: "Laptop Backpack",
    description: "Durable and stylish laptop backpack.",
    price: 4999,
    stock: 40,
    imageUrl: "https://tse2.mm.bing.net/th?id=OIP.CiydXKhm4dnMx_4EvRojaAHaHa&pid=Api&P=0&h=180", // Laptop backpack
    categoryId: 3,
    isFavorite: true,
    averageRating: 4.8,
    totalReviews: 150,
    sellerId: 2,
  },
  {
    name: "Air Purifier",
    description: "High-efficiency air purifier for your home.",
    price: 14999,
    stock: 15,
    imageUrl: "https://tse3.mm.bing.net/th?id=OIP.PG3g6bOFkvPkpdYwha5y2QHaHa&pid=Api&P=0&h=180", // Air purifier
    categoryId: 4,
    isFavorite: false,
    averageRating: 4.7,
    totalReviews: 90,
    sellerId: 2,
  },
  {
    name: "Pain Reliever Tablets",
    description: "Fast-acting pain reliever tablets.",
    price: 999,
    stock: 200,
    imageUrl: "https://tse2.mm.bing.net/th?id=OIP.FlSzmmopisQSr76tYbbCsQHaHa&pid=Api&P=0&h=180", // Pain reliever
    categoryId: 5,
    isFavorite: false,
    averageRating: 4.4,
    totalReviews: 120,
    sellerId: 2,
  },
  {
    name: "Cycling Helmet",
    description: "Lightweight and durable cycling helmet.",
    price: 3999,
    stock: 50,
    imageUrl: "https://tse3.mm.bing.net/th?id=OIP.-hg-3-XYbkoWQ3otJ0HmHAHaHa&pid=Api&P=0&h=180", // Cycling helmet
    categoryId: 6,
    isFavorite: true,
    averageRating: 4.9,
    totalReviews: 200,
    sellerId: 2,
  },
  {
    name: "Building Blocks Set",
    description: "Educational building blocks set for kids.",
    price: 2999,
    stock: 60,
    imageUrl: "https://tse2.mm.bing.net/th?id=OIP.BhgBykovqhmYtVKZRgcWOAHaHa&pid=Api&P=0&h=180", // Building blocks
    categoryId: 7,
    isFavorite: false,
    averageRating: 4.7,
    totalReviews: 90,
    sellerId: 2,
  },
  {
    name: "Dog Leash",
    description: "Durable and adjustable dog leash.",
    price: 1499,
    stock: 80,
    imageUrl: "https://tse4.mm.bing.net/th?id=OIP.0gTwmL-_EbFxp0kcY4va4AHaHa&pid=Api&P=0&h=180", // Dog leash
    categoryId: 8,
    isFavorite: true,
    averageRating: 4.6,
    totalReviews: 100,
    sellerId: 2,
  },
  {
    name: "Electric Toothbrush",
    description: "Advanced electric toothbrush for oral care.",
    price: 5999,
    stock: 40,
    imageUrl: "https://tse1.mm.bing.net/th?id=OIP.NSYw4JqOlRO8BVWFuMNjHAHaHa&pid=Api&P=0&h=180", // Electric toothbrush
    categoryId: 9,
    isFavorite: false,
    averageRating: 4.5,
    totalReviews: 120,
    sellerId: 2,
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
    userId: 1,
  },
  {
    rating: 4,
    comment: "Good quality, but a bit expensive.",
    productId: 2, // Men's Casual Shirt
    userId: 1,
  },
  {
    rating: 3,
    comment: "Average quality, expected better.",
    productId: 3, // Sneakers
    userId: 2,
  },
  {
    rating: 5,
    comment: "Absolutely love it! Perfect fit.",
    productId: 4, // Leather Handbag
    userId: 3,
  },
  {
    rating: 4,
    comment: "Comfortable but color faded a bit.",
    productId: 5, // Running Shoes
    userId: 2,
  },
  {
    rating: 2,
    comment: "Not worth the price, disappointed.",
    productId: 6, // Sunglasses
    userId: 2,
  },
  {
    rating: 5,
    comment: "Super stylish and great quality.",
    productId: 7, // Denim Jacket
    userId: 1,
  },
  {
    rating: 4,
    comment: "Nice design, but took too long to arrive.",
    productId: 8, // Smartwatch
    userId: 3,
  },
  {
    rating: 5,
    comment: "Perfect for my workouts, love it!",
    productId: 9, // Sports T-Shirt
    userId: 3,
  },
  {
    rating: 3,
    comment: "Material is a bit thin but okay.",
    productId: 1,
    userId: 2,
  },
  {
    rating: 4,
    comment: "Very comfortable and looks great!",
    productId: 2,
    userId: 1,
  },
  {
    rating: 1,
    comment: "Not what I expected. Poor quality.",
    productId: 3,
    userId: 3,
  },
  {
    rating: 5,
    comment: "Best purchase ever! So happy with it.",
    productId: 4,
    userId: 1,
  },
  {
    rating: 2,
    comment: "Not durable. Broke within a week.",
    productId: 5,
    userId: 2,
  },
  {
    rating: 5,
    comment: "Excellent value for money.",
    productId: 6,
    userId: 1,
  },
  {
    rating: 4,
    comment: "Works well, but battery life is short.",
    productId: 7,
    userId: 3,
  },
  {
    rating: 3,
    comment: "Okay product, nothing special.",
    productId: 8,
    userId: 2,
  },
  {
    rating: 5,
    comment: "Love the features! A must-have.",
    productId: 9,
    userId: 2,
  },
  {
    rating: 4,
    comment: "Soft and cozy, great for winter.",
    productId: 1,
    userId: 1,
  },
  {
    rating: 3,
    comment: "Looks good but not very comfortable.",
    productId: 2,
    userId: 3,
  },
  {
    rating: 5,
    comment: "Amazing product, exceeded expectations.",
    productId: 3,
    userId: 3,
  },
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
  {
    rating: 5,
    comment: "Absolutely love this product! It's perfect for summer.",
    productId: 1, // Women's Summer Dress
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 4,
    comment: "Great shirt, fits well and looks stylish.",
    productId: 2, // Men's Casual Shirt
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 3,
    comment: "The earbuds are good, but the battery life could be better.",
    productId: 3, // Wireless Bluetooth Earbuds
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "This lamp is a great addition to my living room!",
    productId: 4, // Modern Floor Lamp
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "Effective supplements, I feel more energetic.",
    productId: 5, // Vitamin C Supplements
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "The yoga mat is fantastic, very comfortable and durable.",
    productId: 6, // Yoga Mat
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "Cute teddy bear, my baby loves it!",
    productId: 7, // Soft Plush Teddy Bear
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "My dog loves this food, and it's healthy too!",
    productId: 8, // Organic Dog Food
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "This face cream works wonders for my skin.",
    productId: 9, // Moisturizing Face Cream
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "The handbag is beautiful and well-made.",
    productId: 10, // Leather Handbag
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "Comfortable shoes, great for running.",
    productId: 11, // Running Shoes
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "This smartwatch has all the features I need.",
    productId: 12, // Smartwatch
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The coffee maker is easy to use and makes great coffee.",
    productId: 13, // Coffee Maker
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "These multivitamins are a great addition to my daily routine.",
    productId: 14, // Multivitamin Tablets
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The tent is sturdy and easy to set up.",
    productId: 15, // Camping Tent
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "The stroller is lightweight and easy to maneuver.",
    productId: 16, // Baby Stroller
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "My cat loves this food, and it's healthy too!",
    productId: 17, // Cat Food
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "This hair dryer is powerful and dries my hair quickly.",
    productId: 18, // Hair Dryer
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The sunglasses are stylish and provide good UV protection.",
    productId: 19, // Sunglasses
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "The denim jacket is a great addition to my wardrobe.",
    productId: 20, // Denim Jacket
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The backpack is durable and has plenty of space.",
    productId: 21, // Laptop Backpack
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "The air purifier works great and has improved the air quality in my home.",
    productId: 22, // Air Purifier
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The pain reliever works quickly and effectively.",
    productId: 23, // Pain Reliever Tablets
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "The cycling helmet is comfortable and provides good protection.",
    productId: 24, // Cycling Helmet
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The building blocks are fun and educational for my kids.",
    productId: 25, // Building Blocks Set
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "The dog leash is sturdy and adjustable, perfect for walks.",
    productId: 26, // Dog Leash
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The electric toothbrush is effective and easy to use.",
    productId: 27, // Electric Toothbrush
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "The dress is beautiful and fits perfectly.",
    productId: 1, // Women's Summer Dress
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The shirt is comfortable and looks great.",
    productId: 2, // Men's Casual Shirt
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "The earbuds are amazing, great sound quality.",
    productId: 3, // Wireless Bluetooth Earbuds
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 5,
    comment: "This dress is perfect for summer outings! Fits like a dream.",
    productId: 1, // Women's Summer Dress
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 4,
    comment: "The shirt is comfortable, but the color faded after a few washes.",
    productId: 2, // Men's Casual Shirt
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 5,
    comment: "These earbuds are worth every penny! Noise cancellation is amazing.",
    productId: 3, // Wireless Bluetooth Earbuds
    userId: 1, // John Doe (client)
  },
  {
    rating: 4,
    comment: "The lamp looks great in my living room, but the assembly was tricky.",
    productId: 4, // Modern Floor Lamp
    userId: 2, // Jane Smith (seller)
  },
  {
    rating: 5,
    comment: "Vitamin C tablets have boosted my immunity. Highly recommend!",
    productId: 5, // Vitamin C Supplements
    userId: 3, // Admin User
  },
  {
    rating: 4,
    comment: "The yoga mat is non-slip and eco-friendly. Love it!",
    productId: 6, // Yoga Mat
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "My toddler loves this teddy bear. It's soft and safe for kids.",
    productId: 7, // Soft Plush Teddy Bear
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "My dog enjoys this food, and it's made with organic ingredients.",
    productId: 8, // Organic Dog Food
    userId: 1, // John Doe (client)
  },
  {
    rating: 5,
    comment: "This face cream keeps my skin hydrated all day. Love it!",
    productId: 9, // Moisturizing Face Cream
    userId: 2, // Jane Smith (seller)
  },
  {
    rating: 4,
    comment: "The handbag is stylish, but the strap could be more durable.",
    productId: 10, // Leather Handbag
    userId: 3, // Admin User
  },
  {
    rating: 5,
    comment: "These running shoes are lightweight and perfect for long runs.",
    productId: 11, // Running Shoes
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 4,
    comment: "The smartwatch is feature-packed, but the battery drains quickly.",
    productId: 12, // Smartwatch
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 5,
    comment: "This coffee maker brews the perfect cup every time.",
    productId: 13, // Coffee Maker
    userId: 1, // John Doe (client)
  },
  {
    rating: 4,
    comment: "Multivitamins are effective, but the pills are a bit large.",
    productId: 14, // Multivitamin Tablets
    userId: 2, // Jane Smith (seller)
  },
  {
    rating: 5,
    comment: "The camping tent is spacious and easy to set up. Great for outdoors!",
    productId: 15, // Camping Tent
    userId: 3, // Admin User
  },
  {
    rating: 4,
    comment: "The stroller is lightweight, but the wheels could be more durable.",
    productId: 16, // Baby Stroller
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "My cat loves this food, and it's made with high-quality ingredients.",
    productId: 17, // Cat Food
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The hair dryer is powerful, but it's a bit noisy.",
    productId: 18, // Hair Dryer
    userId: 1, // John Doe (client)
  },
  {
    rating: 5,
    comment: "These sunglasses are stylish and provide excellent UV protection.",
    productId: 19, // Sunglasses
    userId: 2, // Jane Smith (seller)
  },
  {
    rating: 4,
    comment: "The denim jacket is trendy, but the sizing runs a bit small.",
    productId: 20, // Denim Jacket
    userId: 3, // Admin User
  },
  {
    rating: 5,
    comment: "This backpack is perfect for my laptop and daily essentials.",
    productId: 21, // Laptop Backpack
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 4,
    comment: "The air purifier works well, but the filters are expensive to replace.",
    productId: 22, // Air Purifier
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 5,
    comment: "These pain relievers work quickly and are easy to swallow.",
    productId: 23, // Pain Reliever Tablets
    userId: 1, // John Doe (client)
  },
  {
    rating: 4,
    comment: "The cycling helmet is comfortable, but the ventilation could be better.",
    productId: 24, // Cycling Helmet
    userId: 2, // Jane Smith (seller)
  },
  {
    rating: 5,
    comment: "My kids love these building blocks. They're durable and fun!",
    productId: 25, // Building Blocks Set
    userId: 3, // Admin User
  },
  {
    rating: 4,
    comment: "The dog leash is sturdy, but the clasp could be more secure.",
    productId: 26, // Dog Leash
    userId: 4, // Alice Johnson (client)
  },
  {
    rating: 5,
    comment: "This electric toothbrush has improved my oral hygiene significantly.",
    productId: 27, // Electric Toothbrush
    userId: 5, // Bob Brown (client)
  },
  {
    rating: 4,
    comment: "The dress is beautiful, but the fabric wrinkles easily.",
    productId: 1, // Women's Summer Dress
    userId: 1, // John Doe (client)
  },
  {
    rating: 5,
    comment: "This shirt is my new favorite. It's comfortable and stylish.",
    productId: 2, // Men's Casual Shirt
    userId: 2, // Jane Smith (seller)
  },
  {
    rating: 4,
    comment: "The earbuds are great, but the case is a bit bulky.",
    productId: 3, // Wireless Bluetooth Earbuds
    userId: 3, // Admin User
  },
];
// Fake data for OrderItems (price as integer)
const orderItems = [
  {
    quantity: 1,
    price: 3999, // $39.99 in cents (Dress)
    CommandeId: 1, // Reference the first commande
    ProductId: 1, // Reference the first product (Women's Summer Dress)
  },
  {
    quantity: 1,
    price: 2999, // $29.99 in cents (Shirt)
    CommandeId: 1, // Reference the first commande
    ProductId: 2, // Reference the second product (Men's Casual Shirt)
  },
];
const seedDatabase = async () => {
  try {
    // Sync the database (drop and recreate tables)
    await db.connection.sync({ force: true });
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