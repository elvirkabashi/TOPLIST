import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const IpBan = sequelize.define('IpBan', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
  },
  banned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  unbanned_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'ip_bans',
  timestamps: false,  // Custom timestamps are used
  underscored: true,
});

export default IpBan;
