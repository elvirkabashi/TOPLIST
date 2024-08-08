import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

const UserProfile = sequelize.define('UserProfile', {
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
  first_name: {
    type: DataTypes.STRING(255),
  },
  last_name: {
    type: DataTypes.STRING(255),
  },
  bio: {
    type: DataTypes.TEXT,
  },
  website_url: {
    type: DataTypes.STRING(255),
  }
}, {
  tableName: 'user_profiles'
});

export default UserProfile;
