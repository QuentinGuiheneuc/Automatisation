const config = require("../config.js");
let db;
const mysql = require("mysql");
const connection = mysql.createPool({
  host: config.BD.Host,
  user: config.BD.User,
  password: config.BD.Password,
  database: config.BD.Database,
  port: config.BD.Port,
  connectionLimit: 10,
});

module.exports = { db: connection };
