const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedManager = await bcrypt.hash('manager123', 10);
    const hashedAdmin = await bcrypt.hash('admin123', 10);

    return queryInterface.bulkInsert('Users', [
      { username: 'manager_gudang', password: hashedManager, role: 'manager', createdAt: new Date(), updatedAt: new Date() },
      { username: 'staff_admin', password: hashedAdmin, role: 'admin', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};