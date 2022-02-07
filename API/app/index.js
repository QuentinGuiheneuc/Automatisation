const express = require("express");
const config = require("../config.js");
const route = require("./router.js");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: config.BD.Host,
  user: config.BD.User,
  password: config.BD.Password,
  database: config.BD.Database,
  port: config.BD.Port,
});
//connection.connect();
app.get("/", (req, res, next) => {
  console.log("Correspond à /games");
  res.send("bienvunue");
});

app.get("/users", (req, res, next) => {
  const sql = "SELECT * FROM 'mqttclient'";

  connection.query(sql, function (error, results, fields) {
    res.send(results);
    console.log(error);
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
