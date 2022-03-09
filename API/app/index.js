const express = require("express");
const config = require("../config.js");
const route = require("./router.js");
const app = express();
const sock = require("./socket/sock.js");
const bodyParser = require("body-parser");
// const User = require("../db/model/users");
const bcrypt = require("bcryptjs");

const User = require("../db/model/users");

//myro.objet = object1;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
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
        res.json(value);
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
      res.json(value);
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

app.get("/autom/:id", (req, res, next) => {
  console.log(req.params.id);
  client
    .listsAutom(req.params.id)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.post("/autom", (req, res, next) => {
  console.log(req.body.param);
  client
    .addAutom(req.body.param)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.patch("/autom", (req, res, next) => {
  console.log(req.body.param);
  client
    .updeteAutom(req.body.param)
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
  console.log(req.params.id);
  client
    .delParam(req.params.id)
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
  console.log(req.params.id);
  client
    .delExe(req.params.id)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.post("/objetexe", (req, res, next) => {
  console.log(req.body.param);
  client
    .objetExe(req.body.id, req.body.param)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

app.get("/users", (req, res, next) => {
  try {
    User.findAll()
      .then((value) => {
        res.send(value);
      })
      .catch((err) => {
        res.status(501).json({ error: err.message });
        res.end();
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/users/:id", (req, res, next) => {
  try {
    // const allUsers = User.findAll();
    // res.send(allUsers);
    User.findOne({ id_user: req.params.id })
      .then((value) => {
        res.send(value);
      })
      .catch((err) => {
        res.status(501).json({ error: err });
        res.end();
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
//const passwordHash = bcrypt.hashSync("AtAAF6ArHhoG", 10);
//console.log(passwordHash);
app.post("/", (req, res, next) => {
  //bcrypt.hashSync(params.password, 10);
  User.verifyPassword({ user: req.body.user, password: req.body.password })
    .then((value) => {
      res.send(value);
      console.log(value);
    })
    .catch((err) => {
      res.status(501).json({ error: err });
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
  // User.sync();
  console.log("server sync");
});
