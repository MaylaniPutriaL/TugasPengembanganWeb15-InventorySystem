module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Item', {
    item_name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock_qty: DataTypes.INTEGER,
    min_stock: DataTypes.INTEGER,
    storage_location: DataTypes.STRING,
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, { 
    underscored: true,
    timestamps: true 
  });
};