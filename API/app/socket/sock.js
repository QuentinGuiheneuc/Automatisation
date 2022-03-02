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
      case "topic":
        return action2;
      case "is_co_res":
        return action2;
      case "added":
        return action2;
      case "updated":
        return action2;
      case "delete":
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
      sock.write(`server${this.separation}status`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
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
      sock.write(`server${this.separation}start`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
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
      sock.write(`server${this.separation}stop`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(so.err);
        }
      });
      sock.on("error", function (err) {
        reject(this.err);
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
      sock.write(`list${this.separation}topic`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
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
      sock.write(`list${this.separation}client`);
      sock.on("data", (chunk) => {
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
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
      sock.write(`list${this.separation}cache`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * return objet of MQTT Autom
   * @param String id = ""
   * @return array[{objet}]
   */
  listsAutom = (id = "") => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`list${this.separation}autom${this.separation}${id}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * return objet of MQTT Autom
   * @return array[{objet}]
   */
  addAutom = (bodyParam) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`add${this.separation}autom${this.separation}${bodyParam}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * @params Objet {id: 1, name_param: "", param: {}}
   * @return String
   */
  updeteAutom = (params) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();

      sock.write(`update${this.separation}autom${this.separation}${params}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * @param id Int
   * @return String
   */
  delAutom = (id) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();

      sock.write(`del${this.separation}autom${this.separation}${id}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
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
  objetTopic = (topic) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`objet${this.separation}topic${this.separation}${topic}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * return
   * @return boolean
   */
  objetIsCo = () => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`objet${this.separation}is_co`);
      // console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk.toString());
        resolve(true);
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };

  /**
   * @params Objet {name_param:"",param:{}}
   * @return String
   */
  addParam = (bodyParam) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      const params = JSON.parse(bodyParam);
      const stringEvoie = `add${this.separation}param${this.separation}${
        params.name_param
      }${this.separation}${JSON.stringify(params.param)}`;
      console.log(stringEvoie);
      sock.write(stringEvoie);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };

  /**
   * @param id  id = ""
   * @return array[{objet}]
   */
  listeParam = (id = "") => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();

      sock.write(`list${this.separation}param${this.separation}${id}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };

  /**
   * @params Objet {id: 1, name_param: "", param: {}}
   * @return String
   */
  updeteParam = (params) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();

      sock.write(`update${this.separation}param${this.separation}${params}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * @param id Int
   * @return String
   */
  delParam = (id) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();

      sock.write(`del${this.separation}param${this.separation}${id}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };

  /**
   * @params Objet {"id_client": 2 , "exe": {}}
   * @return String
   */
  addExe = (bodyParam) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      const params = JSON.parse(bodyParam);
      const stringEvoie = `add${this.separation}exe${
        this.separation
      }${JSON.stringify(params)}`;
      console.log(stringEvoie);
      sock.write(stringEvoie);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };

  /**
   * @param id  id = ""
   * @return array[{objet}]
   */
  listeExe = (id = "") => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();

      sock.write(`list${this.separation}exe${this.separation}${id}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };

  /**
   * @params Objet {id: 1, "client_id" : 2, "exe" : {}}
   * @return String
   */
  updeteExe = (params) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();
      sock.write(`update${this.separation}exe${this.separation}${params}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
  /**
   * @param id Int
   * @return String
   */
  delExe = (id) => {
    return new Promise((resolve, reject) => {
      const s = new sok(this.host, this.port);
      const sock = s.sok();

      sock.write(`del${this.separation}exe${this.separation}${id}`);
      //console.log(sock);
      sock.on("data", (chunk) => {
        console.log(chunk);
        let value = this.ertement(chunk);
        if (value) {
          resolve(value);
        } else {
          reject(this.err);
        }
      });
      sock.on("error", function (err) {
        reject(err);
      });
    });
  };
}
module.exports = mqttSocker;
