const router = require("express").Router();
const sock = require("../socket/sock.js");
const config = require("../../config.js");
const client = new sock();
client.separation = config.socket.serverofpython.separation;
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);

router.get("/autom", (req, res, next) => {
  client
    .listsAutom()
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

router.get("/autom/:id", (req, res, next) => {
  console.log(req.params.id);
  client
    .listsAutom(req.params.id)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

router.post("/autom", (req, res, next) => {
  console.log(req.body.param);
  client
    .addAutom(req.body.param)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

router.patch("/autom", (req, res, next) => {
  console.log(req.body.param);
  client
    .updeteAutom(req.body.param)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
module.exports = router;
