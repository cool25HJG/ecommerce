module.exports = (connection, DataTypes) => {
const OrderItem = connection.define("OrderItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  })
  return OrderItem
}