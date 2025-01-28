module.exports = (connection, DataTypes) => {
    const Category = connection.define(
      "Category",
      {
        CategoryName:{
          type:DataTypes.STRING,
          allowNull:false
        }
      }
    );
    return Category;
  };