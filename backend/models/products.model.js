module.exports = (connection, DataTypes) => {
const Products = connection.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  isFavorite:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  },
  averageRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
})
return Products;
  }
