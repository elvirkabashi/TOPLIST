
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SubnetBan = sequelize.define('SubnetBan', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  subnet: {
    type: DataTypes.STRING(45),
    allowNull: false,
  }
});

export default SubnetBan;
