const router = require("express").Router();
const client = require("../connexionSocket");

router.get("/autom", (req, res, next) => {
  client
    .listsAutom()
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
      res.end();
    });
});
module.exports = router;
