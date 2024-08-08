
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import Page from './page.js';

const ReferralLog = sequelize.define('ReferralLog', {
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
  referrer: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'date',
  },
}, {
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

export default ReferralLog;
