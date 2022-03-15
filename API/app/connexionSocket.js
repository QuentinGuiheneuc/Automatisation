const mqttSocker = require("../app/socket/sock");
const config = require("../config.js");
const client = new mqttSocker();
client.separation = config.socket.serverofpython.separation;
client.connect(
  config.socket.serverofpython.host,
  config.socket.serverofpython.port
);
module.exports = client;
