
module.exports = (connection, DataTypes) => {
  const Product = connection.define('Product', {
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,  
    }
  }, {
    
    timestamps: true,  
  });



  return Product;
};
