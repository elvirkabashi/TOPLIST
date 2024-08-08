
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const GeoBan = sequelize.define('GeoBan', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  country_code: {
    type: DataTypes.STRING(2),
    allowNull: false,
  }
});

export default GeoBan;
