const router = require("express").Router();
const User = require("../../db/model/users");
router.get("/users", (req, res, next) => {
  try {
    User.findAll()
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
router.get("/users/:id", (req, res, next) => {
  try {
    // const allUsers = User.findAll();
    // res.send(allUsers);
    User.findOne({ id_user: req.params.id })
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
router.post("/users", (req, res, next) => {
  //bcrypt.hashSync(params.password, 10);
  if (!req.body.user || !req.body.password) {
    res.status(201).json({ error: "Not user or not password" });
  } else {
    User.verifyPassword({ user: req.body.user, password: req.body.password })
      .then((value) => {
        res.send(value);
        console.log(value);
      })
      .catch((err) => {
        res.status(501).json({ error: err });
        res.end();
      });
  }
});
module.exports = router;
