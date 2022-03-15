const router = require("express").Router();
const client = require("../connexionSocket");

router.get("/cache", (req, res, next) => {
  client
    .listsCache()
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(500).json(err.message);
      res.end();
    });
});
module.exports = router;
