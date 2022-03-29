const router = require("express").Router();
var multer = require("multer");
// var upload = multer({ dest: "/tmp/" });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/plex", upload.single("thumb"), (req, res) => {
  var payload = JSON.parse(req.body.payload);
  console.log(payload);
  //   console.log(multer.diskStorage());

  //   console.log(req);
});
module.exports = router;
