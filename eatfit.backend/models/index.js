import sequelize from '../config/database.js';
import User from './User.js';
import { DataTypes } from 'sequelize';

const db = {};


db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;
db.User = User;

export default db;
