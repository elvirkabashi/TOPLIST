import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    subject: {
      type: DataTypes.STRING(255),
    },
    body: {
      type: DataTypes.TEXT,
    },
    read_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  
  
export default Message;