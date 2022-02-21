const Net = require("net");
class sok {
  host = null;
  port = 0;
  constructor(host = "localhost", port = 65000) {
    this.host = host;
    this.port = port;
  }

  connect = (host, port) => {
    this.host = host;
    this.port = port;
  };
  sok = () => {
    this.socke = new Net.Socket();
    let isco = false;
    this.socke.connect(
      {
        host: this.host,
        port: this.port,
        onread: {
          // Reuses a 4KiB Buffer for every read from the socket.
          buffer: Buffer.alloc(4 * 1024),
          callback: function (nread, buf) {
            // Received data is available in `buf` from 0 to `nread`.
            console.log(buf.toString("utf8", 0, nread));
          },
        },
      },
      () => {
        isco = true;
      }
    );
    this.socke.on("end", function () {
      console.log("Requested an end to the TCP connection");
    });

    return this.socke;
  };
}

class mqttSocker {
  separation = ";";
  err = "err value of null or undefined";
  host = null;
  port = 0;
  connect = (host, port) => {
    this.host = host;
    this.port = port;
  };
  ertement = (chunk) => {
    const data = chunk.toString();
    console.log(data);
    const datasqlit = data.split(this.separation);
    const action1 = datasqlit[0];
    const action2 = datasqlit[1];
    const value = datasqlit[2];
    switch (action1) {
      case "server":
        switch (action2) {
          case "status":
            return value;
            break;
          case "start":
            return value;
            break;
          case "stop":
            return value;
            break;
          default:
            return null;
        }
      case "list":
        return action2;
      default:
        return null;
    }
  };

  /**
   * Status of server MQTT
   * @return {boolean}
   */
  status = () => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      //console.log(this.socke, "conn", this.host, this.port);
      sock.write(`server;status`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(so.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * Start of server MQTT
   * @return {boolean}
   */
  start = () => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`server;start`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(so.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * Stop of server MQTT
   * @return {boolean}
   */
  stop = () => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`server;stop`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(so.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * return objet of MQTT Topic
   * @return array[{objet}]
   */
  listsTopic = () => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`list;topic`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(so.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * return objet of MQTT Client
   * @return  array[{objet}]
   */
  listsClient = () => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`list;client`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(so.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * return objet of MQTT Cache
   * @return array[{objet}]
   */
  listsCache = () => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`list;cache`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(so.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  // _event.evenserver = evenserver;
  //addListener(event: 'data', listener: (data: Buffer) => void): this;
}
module.exports = mqttSocker;
