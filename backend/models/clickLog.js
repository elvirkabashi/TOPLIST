
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import Page from './page.js'; 

const ClickLog = sequelize.define('ClickLog', {
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
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true, 
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'date',
  },
});

export default ClickLog;
