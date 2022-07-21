const jwt = require("jsonwebtoken");
const SECRET_KEY =
  process.env.SECRET_KEY ||
  "YHrh5rm4a9KWPmLQ03reYgE-24Hl98HNbZQdMu-pm8gQBiJl9xvWRBWxJaZjjPYT";
const route = require("express").Router();
const User = require("../../db/model/users");

route.post("/connexion", (req, res) => {
  if (!req.body.user || !req.body.password) {
    res.status(201).json({ error: "Not user or not password" });
  } else {
    User.verifyPassword({ user: req.body.user, password: req.body.password })
      .then((value) => {
        if (value) {
          const expireIn = 24 * 60 * 60;
          const token = jwt.sign(
            {
              user: value,
            },
            SECRET_KEY,
            {
              expiresIn: expireIn,
            }
          );
          res.header("Authorization", "Bearer " + token);
          return res.status(200).json({ Bearer: token });
        } else {
          return res.status(400).json({ err: "auth" });
        }
      })
      .catch((err) => {
        res.status(501).json({ error: err });
        res.end();
      });
  }
});

module.exports = route;
