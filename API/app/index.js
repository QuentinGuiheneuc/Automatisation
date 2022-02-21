const express = require("express");
const config = require("../config.js");
const route = require("./router.js");
const query = require("../db/connexion.js");
const app = express();
const sock = require("./socket/sock.js");
const client = new sock();
client.separation = config.socket.serverofpython.separation;
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);

app.get("/topic", (req, res, next) => {
  client.listsTopic().then((value) => {
    console.log("azertyu");
    res.send(value);
  });
  //res.send("bienvunue");
});
app.get("/client", (req, res, next) => {
  client
    .listsClient()
    .then((value) => {
      console.log("azertyu");
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
  //res.send("bienvunue");
});
app.get("/cache", (req, res, next) => {
  client
    .listsCache()
    .then((value) => {
      console.log("azertyu");
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
  //res.send("bienvunue");
});
async function db(sql) {
  return new Promise((resolve, reject) => {
    query.db
      .getConnection()
      .then((conn) => {
        conn
          .query(sql)
          .then((rows) => {
            resolve(rows);
            conn.end();
          })
          .catch((err) => {
            reject(400);
            conn.end();
          });
      })
      .catch((err) => {
        reject(401);
      });
  });
}

app.get("/users", (req, res, next) => {
  const sql = "SELECT id_user,nom,prenom,mail,path_img,type FROM users";
  db(sql)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
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
