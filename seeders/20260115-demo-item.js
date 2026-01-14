module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [
      {
        item_name: 'Laptop ASUS ROG',
        category: 'Elektronik',
        price: 15000000,
        stock_qty: 5,
        min_stock: 10,
        storage_location: 'Rak A-01',
        is_active: true,
        created_by: 'system',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Items', null, {})
};