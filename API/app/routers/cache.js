const router = require("express").Router();
const sock = require("../socket/sock.js");
const config = require("../../config.js");
const client = new sock();
client.separation = config.socket.serverofpython.separation;
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);
router.get("/cache", (req, res, next) => {
  client
    .listsCache()
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(err);
      res.end();
    });
});
module.exports = router;
