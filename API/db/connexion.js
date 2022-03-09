const config = require("../config.js");
require("dotenv").config();
// const { Sequelize } = require("sequelize");
// const connexion = new Sequelize(
//   config.BD.Database,
//   config.BD.User,
//   config.BD.Password,
//   {
//     host: config.BD.Host,
//     port: config.BD.Port,
//     dialect: "mariadb",
//   }
// );
// module.export = connexion;
let db;
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: config.BD.Host,
  user: config.BD.User,
  password: config.BD.Password,
  database: config.BD.Database,
  port: config.BD.Port,
  queueLimit: 0,
  connectionLimit: 5,
});
module.exports = { pool };
