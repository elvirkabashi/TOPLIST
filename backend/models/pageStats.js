import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  
import Page from './page.js';

const PageStats = sequelize.define('PageStats', {
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
  month: {
    type: DataTypes.INTEGER,
    allowNull: true,  
  },
  monthly_hits_in: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  monthly_hits_out: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  monthly_votes: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  }
}, {
  tableName: 'page_stats',
  timestamps: false,
});



export default PageStats;
