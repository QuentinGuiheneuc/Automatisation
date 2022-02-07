const router = require("express").Router();

router.get("/", (req, res, next) => {
  console.log("Correspond à /games");
  res.send("bienvunue");
});

router.use(function (req, res) {
  res.status(404);
  res.end("Not Found");
});
