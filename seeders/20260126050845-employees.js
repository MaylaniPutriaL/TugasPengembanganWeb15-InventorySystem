
const { create } = require("../controllers/employeeController");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employees', [
      {
        full_name: 'Jasswant Anbumani',
        division: 'PDSI',
        salary: 1600000,
        leave_balance: 7,
        min_leave: 3,
        notes: 'Pegawai Paling Aktif',
        is_active: true,
        created_by: 'Human Resource Management',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Employees', null, {})
};