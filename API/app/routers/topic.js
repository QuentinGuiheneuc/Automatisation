const router = require("express").Router();
const sock = require("../socket/sock.js");
const config = require("../../config.js");
const client = new sock();
client.separation = config.socket.serverofpython.separation;
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);
router.get("/topic", (req, res, next) => {
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
        res.json(value);
      })
      .catch((err) => {
        res.status(500);
        res.end();
      });
  }
});
module.exports = router;
