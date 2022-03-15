const router = require("express").Router();
const client = require("../connexionSocket");

router.get("/topic", (req, res, next) => {
  const results = Object.keys(req.query);
  if (results.find((element) => element == "cache")) {
    client
      .objetTopic(`${req.query.cache}/#`)
      .then((value) => {
        res.json(value);
      })
      .catch((err) => {
        res.status(500).json(err.message);
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
        res.status(500).json(err.message);
        res.end();
      });
  }
});
module.exports = router;
