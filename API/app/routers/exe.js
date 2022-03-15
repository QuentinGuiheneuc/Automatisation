const router = require("express").Router();
const client = require("../connexionSocket");

router.get("/exe", (req, res, next) => {
  client
    .listeExe()
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
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
      res.status(500).json(err.message);
      res.end();
    });
});
module.exports = router;
