const WebSocket = require("ws");
const uuidv4 = require("uuid");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
let theclient = [];
const wss = (expressServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });
  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on(
    "connection",
    function connection(websocketConnection, connectionRequest) {
      const [_path, params] = connectionRequest?.url?.split("?");
      //const connectionParams = queryString.parse(params);
      // NOTE: connectParams are not used here but good to understand how to get
      // to them if you need to pass data with the connection to identify it (e.g., a userId).
      console.log(params);
      websocketConnection.uid = uuidv4.v4();
      theclient.push(websocketConnection);
      websocketConnection.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        websocketConnection.send(
          JSON.stringify({ message: websocketConnection.uid })
        );
      });

      websocketConnection.on("data", (client) => {
        console.log(client, "ici");
        client.sand(JSON.stringify({ message: "jfjf" }));
        //sleep(1000);
      });

      for (let index = 0; index < 10; index++) {
        websocketConnection.send(JSON.stringify({ message: index }));
      }
      console.log(theclient);
    }
  );
};

const express = require("express");

const app = express();
const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
  if (process.send) {
    process.send(`Server running at http://localhost:${port}\n\n`);
  }
});
wss(server);

process.on("data", (message) => {
  console.log(message, "mess");
});
