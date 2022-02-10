const config = require("../config.js");
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
const query = (sql) => {
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query(sql)
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ...
          conn.end();
          return rows;
        })
        .catch((err) => {
          //handle error
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { db: query };
