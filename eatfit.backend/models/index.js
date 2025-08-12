import sequelize from '../config/database.js';
import User from './User.js';

const db = {};


db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;
db.User = User;

export default db;
