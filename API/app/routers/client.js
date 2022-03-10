const router = require("express").Router();
const sock = require("../socket/sock.js");
const config = require("../../config.js");
const client = new sock();
client.separation = config.socket.serverofpython.separation;
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);
router.get("/client", (req, res, next) => {
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
module.exports = router;
