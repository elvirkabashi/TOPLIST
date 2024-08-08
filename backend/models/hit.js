import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Page from './page.js';

const Hit = sequelize.define('Hit', {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  daily_hits_in: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  daily_hits_out: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
});

export default Hit;
