import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id',
    },
    onDelete: 'SET NULL',
  }
});

export default Category;
