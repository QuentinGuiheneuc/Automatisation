// const WebSocket = require("ws");

//  const websocketServer = new WebSocket.C({
//    noServer: true,
//    path: "/websockets",
//  });

//  expressServer.on("upgrade", (request, socket, head) => {
//    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
//      websocketServer.emit("connection", websocket, request);
//    });
//  });

//  websocketServer.on(
//    "connection",
//    function connection(websocketConnection, connectionRequest) {
//      const [_path, params] = connectionRequest?.url?.split("?");
//      //const connectionParams = queryString.parse(params);

//      // NOTE: connectParams are not used here but good to understand how to get
//      // to them if you need to pass data with the connection to identify it (e.g., a userId).
//      console.log(params);

//      websocketConnection.on("message", (message) => {
//        const parsedMessage = JSON.parse(message);
//        console.log(parsedMessage);
//        websocketConnection.send(JSON.stringify(parsedMessage));
//      });
//      websocketConnection.on("m", (message) => {
//        const parsedMessage = JSON.parse(message);
//        console.log(parsedMessage);
//        websocketConnection.send(JSON.stringify(parsedMessage));
//      });
//    }
//  );
var WebSocketClient = require("websocket").client;

var client = new WebSocketClient();

client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", function (connection) {
  console.log("WebSocket Client Connected");
  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on("close", function () {
    console.log("echo-protocol Connection Closed");
  });
  connection.send(JSON.stringify({ message: "jfjf" }));
  //connection(JSON.stringify({ message: "jfjf" }));
  // if (message.type === "utf8") {
  //   console.log("Received: '" + message.utf8Data + "'");
  // }
  connection.on("message", function (message) {
    console.log(message);
  });
});

client.connect("ws://localhost:5001/websockets?id=1", "");
//console.log(client);

// client.on("data", (chunk) => {
//   console.log(chunk);
//   donner = donner.concat(chunk.toString());
//   console.log(donner);
// });
