
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedManager = await bcrypt.hash('manager123', 10);
      const hashedAdmin = await bcrypt.hash('admin123', 10);

      return await queryInterface.bulkInsert('Users', [
        { username: 'manager', password: hashedManager, role: 'manager', createdAt: new Date(), updatedAt: new Date() },
        { username: 'staff_admin', password: hashedAdmin, role: 'admin', createdAt: new Date(), updatedAt: new Date() }
      ]);
    } catch (err) {
      console.error('User seeder error:', err);
      throw err;
    }
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};