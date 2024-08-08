import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import User from './user.js';

const Notification = sequelize.define('Notification', {
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
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  read_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});



export default Notification;
