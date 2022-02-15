const config = require("../../config.js");
const Net = require("net");

// class mqttSocker extends Net {
//   constructor() {
//     this.client = new Net.Socket();
//   }
// }

var client = new Net.Socket();
let statusValue = false;
let isSarted = false;
//this.status;
client.connect(
  {
    port: config.socket.serverofpython.port,
    host: config.socket.serverofpython.host,
  },
  () => {
    console.log("TCP connection established with the server.");
  }
);
//console.log(client);
//client.write(`list;topic`);
// The client can also receive data from the server by reading from its socket.
console.log();
client.on("data", function (chunk) {
  //console.log(chunk);
  const data = chunk.toString();
  const datasqlit = data.split(config.socket.serverofpython.separation);
  const action1 = datasqlit[0];
  const action2 = datasqlit[1];
  const value = datasqlit[2];
  switch (action1) {
    case "server":
      switch (action2) {
        case "status":
          statusValue = value;
          break;
        case "start":
          statusValue = value;
          isSarted = value;
          break;
        case "stop":
          statusValue = value;
          isSarted = value;
      }
      break;
  }

  console.log(`Data received from the server: ${data}.`);
  console.log();
});
// client.on("server", function (value) {
//   console.log(value);
// });
client.on("ready", function () {
  console.log("Requested an end to the TCP ready");
});

// client.on("end", function () {
//   console.log("Requested an end to the TCP connection");
// });
client.on("error", function (err) {
  console.log(`Requested an error ${err}`);
});

const status = () => {
  return new Promise((resolve, reject) => {
    client.write(`server;status`);
    if (statusValue == undefined || statusValue == null) {
      resolve(statusValue);
    }
  });
  //return client;
};
// mqttSocker = () => {};
// mqttSocker();
//mqtt.status();
//module.exports = { mqttSocker };

async function start() {
  return;
}
status().then((value) => {
  console.log(value);
});

console.log(start());
