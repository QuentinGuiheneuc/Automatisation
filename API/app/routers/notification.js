const router = require("express").Router();
const notification = require("../../db/model/notification");

router.get("/notification", (req, res, next) => {
  try {
    notification
      .findAll()
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
router.get("/notification/:id", (req, res, next) => {
  try {
    // const allUsers = User.findAll();
    // res.send(allUsers);
    notification
      .findOne({ id_notif: req.params.id })
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
router.post("/notification", (req, res, next) => {
  //bcrypt.hashSync(params.password, 10);

  if (!req.body.titre || !req.body.text) {
    res.status(201).json({ error: "Not user or not password" });
  } else {
    const event = new Date();
    event.setHours(event.getHours() + 1);
    const dates = event
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, "");
    notification.objet = {
      titre: req.body.titre,
      text: req.body.text,
      type: req.body.type,
      icon: req.body.icon,
      color: req.body.color,
      date: dates,
    };
    notification
      .create()
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
router.delete("/notification/:id", (req, res, next) => {
  try {
    notification
      .delete({ id_notif: req.params.id })
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
router.delete("/notification/all", (req, res, next) => {
  try {
    notification
      .deleteall()
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
