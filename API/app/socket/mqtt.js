const mqttSocker = require("./sock.js");
const config = require("../../config.js");

client = new mqttSocker();
client.separation = config.socket.serverofpython.separation;
//this.status;
// client.connect(
//   {
//     port: config.socket.serverofpython.port,
//     host: config.socket.serverofpython.host,
//   },
//   () => {
//     console.log("TCP connection established with the server.");
//   }
// );
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);
// client.on("server", function (value) {
//   console.log(value);
// });
// client.on("ready", function () {
//   console.log("Requested an end to the TCP ready");
// });

// client.on("end", function () {
//   console.log("Requested an end to the TCP connection");
// });
// client.on("error", function (err) {
//   console.log(`Requested an error ${err}`);
// });
client.listsTopic().then((value) => {
  console.log("azertyu");
  console.log(value);
});

client.status().then((value) => {
  console.log(value);
});
