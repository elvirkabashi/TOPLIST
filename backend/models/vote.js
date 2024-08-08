import { DataTypes ,Sequelize} from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Page from './page.js';

const Vote = sequelize.define('Vote', {
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
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  ip_address: {
    type: DataTypes.STRING(45),
  },
  vote_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

export default Vote;
