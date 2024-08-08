import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Category from './category.js';
import User from './user.js';

const Page = sequelize.define('Page', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slogan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  banner_url: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  approval_status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hits_in: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hits_out: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  total_hits_in: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  total_hits_out: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

export default Page;
