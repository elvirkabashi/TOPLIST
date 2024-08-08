import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  site_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  site_description: {
    type: DataTypes.TEXT,
  },
  admin_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hit_in_time_limit: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  hit_out_time_limit: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  max_votes_per_ip: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  vote_button_hit_in: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  block_whole_geos: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  block_whole_ip_subnets: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  block_referral_domains: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  rate_limit_votes: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  captcha_for_voting: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  captcha_for_registration: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  reset_hits_daily: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  reset_hits_time: {
    type: DataTypes.TIME,
    defaultValue: '00:00:00',
  },
  log_clicks: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  log_referrals: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  use_redis_cache: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  redis_cache_duration: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 60,
  }
});

export default Setting;
