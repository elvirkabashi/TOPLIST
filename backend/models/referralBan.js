
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ReferralBan = sequelize.define('ReferralBan', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  domain: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
});

export default ReferralBan;
