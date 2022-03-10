const router = require("express").Router();
const sock = require("../socket/sock.js");
const config = require("../../config.js");
const client = new sock();
client.separation = config.socket.serverofpython.separation;
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);

router.get("/exe", (req, res, next) => {
  client
    .listeExe()
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
router.get("/exe/:id", (req, res, next) => {
  console.log(req.params.id);
  client
    .listeExe(req.params.id)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
router.post("/exe", (req, res, next) => {
  console.log(req.body.param);
  client
    .addExe(req.body.param)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

router.patch("/exe", (req, res, next) => {
  console.log(req.body.param);
  client
    .updeteExe(req.body.param)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});

router.delete("/exe/:id", (req, res, next) => {
  console.log(req.params.id);
  client
    .delExe(req.params.id)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
module.exports = router;
