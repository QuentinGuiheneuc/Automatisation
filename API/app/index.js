const express = require("express");
const config = require("../config.js");
const route = require("./router.js");
const app = express();
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
//connection.connect();
app.get("/", (req, res, next) => {
  console.log("Correspond à /games");
  res.send("bienvunue");
});

app.get("/users", (req, res, next) => {
  const sql = "SELECT * FROM mqttclient";
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query(sql)
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          res.send(rows);
          conn.end();
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
});

app.use(function (req, res) {
  res.status(404);
  res.end("Not Found");
});

app.listen(config.Server.Port, config.Server.Host, () => {
  console.log(
    `app listening at http://${config.Server.Host}:${config.Server.Port}`
  );
});
