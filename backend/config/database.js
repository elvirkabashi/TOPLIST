import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
  }
);

async function authenticateDatabase() {
    try {
      await sequelize.authenticate();
      console.log('Connection with database.');
    } catch (err) {
      console.error('Unable to connect to the mysql database:', err);
    }
  }
  
authenticateDatabase();

export default sequelize;
