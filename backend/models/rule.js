import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const Rule = sequelize.define('Rule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rule_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

export default Rule;
