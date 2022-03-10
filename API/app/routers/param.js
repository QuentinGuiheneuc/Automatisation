const router = require("express").Router();
const sock = require("../socket/sock.js");
const config = require("../../config.js");
const client = new sock();
client.separation = config.socket.serverofpython.separation;
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);

router.get("/param", (req, res, next) => {
  client
    .listeParam()
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
router.get("/param/:id", (req, res, next) => {
  console.log(req.params.id);
  client
    .listeParam(req.params.id)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
router.post("/param", (req, res, next) => {
  console.log(req.body.param);
  client
    .addParam(req.body.param)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

router.patch("/param", (req, res, next) => {
  console.log(req.body.param);
  client
    .updeteParam(req.body.param)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

router.delete("/param/:id", (req, res, next) => {
  console.log(req.params.id);
  client
    .delParam(req.params.id)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
module.exports = router;
