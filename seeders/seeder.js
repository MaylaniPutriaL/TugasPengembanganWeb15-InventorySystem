
module.exports = {
	description: 'SQL + CLI commands to create database and tables for seeders',
	commands: `-- Run the following from a shell (replace DB credentials as needed)\nmysql -u root -p -h 127.0.0.1 -e "CREATE DATABASE IF NOT EXISTS inventory_db;"\n\nmysql -u root -p -h 127.0.0.1 inventory_db <<'SQL'\nCREATE TABLE IF NOT EXISTS Users (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  username VARCHAR(255) NOT NULL UNIQUE,\n  password VARCHAR(255) NOT NULL,\n  role VARCHAR(50),\n  createdAt DATETIME,\n  updatedAt DATETIME\n);\n\nCREATE TABLE IF NOT EXISTS Employees (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  full_name VARCHAR(255),\n  category VARCHAR(100),\n  price BIGINT,\n  stock_qty INT,\n  min_stock INT,\n  storage_location VARCHAR(100),\n  is_active TINYINT(1),\n  created_by VARCHAR(100),\n  created_at DATETIME,\n  updated_at DATETIME\n);\nSQL`,

	// Provide no-op `up`/`down` so sequelize-cli can require this file as a seeder
	up: async (queryInterface, Sequelize) => {
		// no-op helper seeder file
		return Promise.resolve();
	},

	down: async (queryInterface, Sequelize) => {
		return Promise.resolve();
	}
};
if (require.main === module) {
	(async () => {
		try {
			require('dotenv').config();
			const { Sequelize, DataTypes } = require('sequelize');

			const DB_USER = process.env.DB_USER || 'root';
			const DB_PASS = process.env.DB_PASS || '';
			const DB_HOST = process.env.DB_HOST || '127.0.0.1';
			const DB_NAME = process.env.DB_NAME || 'employees_db';

			// Connect to server without database to create DB if needed
			const rootSequelize = new Sequelize('', DB_USER, DB_PASS, {
				host: DB_HOST,
				dialect: 'mysql',
				logging: false
			});

			console.log(`Creating database if not exists: ${DB_NAME}`);
			await rootSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
			await rootSequelize.close();

			// Connect to the newly created database
			const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
				host: DB_HOST,
				dialect: 'mysql',
				logging: false
			});
			const User = sequelize.define('User', {
				username: { type: DataTypes.STRING, allowNull: false, unique: true },
				password: { type: DataTypes.STRING, allowNull: false },
				role: { type: DataTypes.STRING }
			}, { timestamps: true });
			const Employees = sequelize.define('Employees', {
				full_name: { type: DataTypes.STRING },
				division: { type: DataTypes.STRING },
				salary: { type: DataTypes.INTEGER },
				leave_balance: { type: DataTypes.INTEGER },
				min_leave: { type: DataTypes.INTEGER },
				notes: { type: DataTypes.STRING },
				is_active: { type: DataTypes.BOOLEAN },
				created_by: { type: DataTypes.STRING },
				updated_by: { type: DataTypes.STRING }
			}, {
				timestamps: true,
				createdAt: 'created_at',
				updatedAt: 'updated_at'
			});

			console.log('Syncing models (this will create tables if missing)...');
			await sequelize.sync({ alter: true });
			console.log('Done — database and tables are ready.');
			await sequelize.close();
		} catch (err) {
			console.error('Error creating database/tables:', err);
			process.exit(1);
		}
	})();
}

