import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Adjust the path according to your project structure
import Page from './page.js';  // Adjust the path according to your project structure

const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  page_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Page,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  position: {
    type: DataTypes.ENUM('top', 'bottom', 'side'),
    allowNull: false,
  }
});



export default Banner;
