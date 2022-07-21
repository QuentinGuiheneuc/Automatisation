const router = require("express").Router();
const { MeteoInsee, MeteoDonner, MeteoParam } = require("../../db/model/meteo");
const auth = require("../function/auth.js");

router.get("/meteo", (req, res, next) => {
  try {
    MeteoInsee.findAll()
      .then((value) => {
        res.json(value);
      })
      .catch((err) => {
        res.status(501).json({ error: err.message });
        res.end();
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
router.get("/meteo/search", (req, res, next) => {
  try {
    // const allUsers = User.findAll();
    // res.send(allUsers);
    MeteoInsee.Search(req.query.search)
      .then((value) => {
        res.json(value);
      })
      .catch((err) => {
        res.status(501).json({ error: err });
        res.end();
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/meteo/donner", auth, (req, res, next) => {
  try {
    // const allUsers = User.findAll();
    // res.send(allUsers);
    MeteoDonner.findAll()
      .then((value) => {
        res.json(value);
      })
      .catch((err) => {
        res.status(501).json({ error: err });
        res.end();
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/meteo/param", (req, res, next) => {
  try {
    // const allUsers = User.findAll();
    // res.send(allUsers);
    MeteoParam.findOne({ id_meteo: 1 })
      .then((value) => {
        res.json(value);
      })
      .catch((err) => {
        res.status(501).json({ error: err });
        res.end();
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
router.patch("/meteo/param", (req, res, next) => {
  try {
    // const allUsers = User.findAll();
    // res.send(allUsers);
    MeteoParam.objet = {
      id_meteo: 1,
      nom: req.body.nom,
      codeDepartement: req.body.codeDepartement,
      codesPostaux: req.body.codesPostaux,
      insee: req.body.insee,
    };
    console.log(MeteoParam.objet);
    MeteoDonner.UpdateObject(req.body.insee);
    MeteoParam.findAll()
      .then((value) => {
        res.json(value);
      })
      .catch((err) => {
        res.status(501).json({ error: err });
        res.end();
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
