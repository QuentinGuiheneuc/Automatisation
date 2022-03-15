const router = require("express").Router();
const client = require("../connexionSocket");

router.post("/objetexe", (req, res, next) => {
  console.log(req.body.param);
  client
    .objetExe(req.body.id, req.body.param)
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(500).json(err.message);
      res.end();
    });
});
module.exports = router;
