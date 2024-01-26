// sequelizeConfig.js
const { Sequelize } = require('sequelize');

const dbUrl = process.env.DATABASE_URL || 'your_postgres_connection_string_here';

const sequelize = new Sequelize(dbUrl, {
  define: {
    timestamps: true,
    underscored: true,
  },
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  }
})();

module.exports = sequelize; // Make sure to export the sequelize instance
