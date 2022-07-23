const express = require("express");
const config = require("../config.js");
const route = require("./router.js");
const app = express();
const bodyParser = require("body-parser");
const os = require("os");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  //res.setHeader("Access-Control-Allow-Headers", "Authorization");
  next();
});
app.use(express.static(__dirname + "/public"));
app.use(route);

// const client = new sock();
// client.separation = config.socket.serverofpython.separation;
// client.connect(
//   config.socket.serverofpython.host,
//   config.socket.serverofpython.port
// );

// app.get("/is", (req, res, next) => {
//   client
//     .objetIsCo()
//     .then((value) => {
//       res.json(value);
//     })
//     .catch((err) => {
//       res.status(err);
//       res.end();
//     });
// });

// app.post("/objetexe", (req, res, next) => {
//   console.log(req.body.param);
//   client
//     .objetExe(req.body.id, req.body.param)
//     .then((value) => {
//       res.json(value);
//     })
//     .catch((err) => {
//       res.status(500).json(err.message);
//       res.end();
//     });
// });
const nets = os.networkInterfaces();
const results = Object.create(null);
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
    if (net.family === familyV4Value && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}
app.use(function (req, res) {
  res.status(404);
  res.end("Not Found");
});
// app.listen(config.Server.Port, "localhost", () => {
//   console.log(`app listening at http://localhost:${config.Server.Port}`);
//   // User.sync();
//   console.log("server sync");
// });
app.listen(config.Server.Port, config.Server.Host, () => {
  console.log(
    `app listening at http://${config.Server.Host}:${config.Server.Port}`
  );
  // User.sync();
  console.log("server sync", config);
  console.log(results);
});
