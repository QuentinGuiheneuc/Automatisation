const router = require("express").Router();
const client = require("../connexionSocket");

router.get("/param", (req, res, next) => {
  client
    .listeParam()
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
      res.end();
    });
});
module.exports = router;
