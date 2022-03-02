const express = require("express");
const config = require("../config.js");
const route = require("./router.js");
const query = require("../db/connexion.js");
const app = express();
const sock = require("./socket/sock.js");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new sock();
client.separation = config.socket.serverofpython.separation;
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);

app.get("/topic", (req, res, next) => {
  const results = Object.keys(req.query);
  if (results.find((element) => element == "cache")) {
    client
      .objetTopic(`${req.query.cache}/#`)
      .then((value) => {
        res.send(value);
      })
      .catch((err) => {
        res.status(500);
        res.end();
      });
  }
  console.log(typeof results);
  if (results.length >= 0) {
    client
      .listsTopic()
      .then((value) => {
        res.send(value);
      })
      .catch((err) => {
        res.status(500);
        res.end();
      });
  }
});
app.get("/client", (req, res, next) => {
  client.objetIsCo();
  client
    .listsClient()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
app.get("/cache", (req, res, next) => {
  client
    .listsCache()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
app.get("/is", (req, res, next) => {
  client
    .objetIsCo()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
app.get("/autom", (req, res, next) => {
  client
    .listsAutom()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.get("/autom", (req, res, next) => {
  client
    .listsAutom()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.get("/param", (req, res, next) => {
  client
    .listeParam()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
app.get("/param/:id", (req, res, next) => {
  console.log(req.params.id);
  client
    .listeParam(req.params.id)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
app.post("/param", (req, res, next) => {
  console.log(req.body.param);
  client
    .addParam(req.body.param)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.patch("/param", (req, res, next) => {
  console.log(req.body.param);
  client
    .updeteParam(req.body.param)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.delete("/param/:id", (req, res, next) => {
  console.log(req.param.id);
  client
    .delParam(req.param.id)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.get("/exe", (req, res, next) => {
  client
    .listeExe()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
app.get("/exe/:id", (req, res, next) => {
  console.log(req.params.id);
  client
    .listeExe(req.params.id)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
app.post("/exe", (req, res, next) => {
  console.log(req.body.param);
  client
    .addExe(req.body.param)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.patch("/exe", (req, res, next) => {
  console.log(req.body.param);
  client
    .updeteExe(req.body.param)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.delete("/exe/:id", (req, res, next) => {
  console.log(req.param.id);
  client
    .delExe(req.param.id)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
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
