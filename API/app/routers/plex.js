const router = require("express").Router();
var multer = require("multer");
var upload = multer({ dest: "/tmp/" });
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const execut = require("../../db/model/executionEv");
const mqttAction = require("../function/mqtt");

router.post("/plex", upload.single("thumb"), (req, res) => {
  var payload = JSON.parse(req.body.payload);
  console.log(payload);
  execut
    .finOne({ type: "'plex'" })
    .then((value) => {
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        //console.log(element, "element");
        try {
          console.log(payload.event);
          if (element.event.event == payload.event) {
            console.log(element.event.event, "event");
            if (element.event.user != undefined) {
              if (element.action.mqtt != undefined) {
                mqttAction(element.action.mqtt.id, element.action.mqtt);
              }
              if (element.action.crul != undefined) {
              }
            }
            console.log(element.action.mqtt.id, element.action.mqtt);
          }

          //element.;
        } catch (error) {}
      }
    })
    .catch((err) => {
      console.log(err);
    });
  res.end();
  //   console.log(multer.diskStorage());

  //   console.log(req);
});
module.exports = router;
