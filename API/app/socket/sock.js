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
          buffer: Buffer.alloc(5 * 1024 * 1024),
          // callback: function (nread, buf) {
          //   // Received data is available in `buf` from 0 to `nread`.
          //   console.log(buf.toString("utf8", 0, nread));
          // },
        },
      },
      () => {
        isco = true;
        console.log(isco, this.host, this.port);
      }
    );
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
  ertement = (data) => {
    return new Promise((resolve, reject) => {
      const datasqlit = data.split(this.separation);
      const action1 = datasqlit[0];
      const action2 = datasqlit[1];
      const value = datasqlit[2];
      switch (action1) {
        case "server":
          switch (action2) {
            case "status":
              resolve(value);
              break;
            case "start":
              resolve(value);
              break;
            case "stop":
              resolve(value);
              break;
            default:
              return null;
          }
        case "objet":
          switch (action2) {
            case "exe":
              resolve(value);
              break;
            case "start":
              resolve(value);
              break;
            case "stop":
              resolve(value);
              break;
            default:
              return null;
          }
        case "list":
          resolve(action2);
        case "topic":
          resolve(action2);
        case "is_co_res":
          resolve(action2);
        case "added":
          resolve(action2);
        case "updated":
          resolve(action2);
        case "delete":
          resolve(action2);
        default:
          return null;
      }
    });
  };

  /**
   * Status of server MQTT
   * @return {boolean}
   */
  status = () => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`server${this.separation}status`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * Start of server MQTT
   * @return {boolean}
   */
  start = () => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`server${this.separation}start`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * Stop of server MQTT
   * @return {boolean}
   */
  stop = () => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`server${this.separation}stop`);

          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * return objet of MQTT Topic
   * @return array[{objet}]
   */
  listsTopic = () => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`list${this.separation}topic`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * return objet of MQTT Client
   * @return  array[{objet}]
   */
  listsClient = () => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`list${this.separation}client`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * return objet of MQTT Cache
   * @return array[{objet}]
   */
  listsCache = () => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`list${this.separation}cache`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
      // if (sock.endEmitted)
      //
    });
  };
  /**
   * return objet of MQTT Autom
   * @param String id = ""
   * @return array[{objet}]
   */
  listsAutom = (id = "") => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`list${this.separation}autom${this.separation}${id}`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * return objet of MQTT Autom
   * @return array[{objet}]
   */
  addAutom = (bodyParam) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(
            `add${this.separation}autom${this.separation}${bodyParam}`
          );

          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * @params Objet {id: 1, name_param: "", param: {}}
   * @return String
   */
  updeteAutom = (params) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(
            `update${this.separation}autom${this.separation}${JSON.stringify(
              params
            )}`
          );
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * @param id Int
   * @return String
   */
  delAutom = (id) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`del${this.separation}autom${this.separation}${id}`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * return objet of MQTT Topic
   * @return array[{objet}]
   */
  objetTopic = (topic) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`objet${this.separation}topic${this.separation}${topic}`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * return
   * @return boolean
   */
  objetIsCo = () => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`objet${this.separation}is_co`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };

  /**
   * @params Objet {name_param:"",param:{}}
   * @return String
   */
  addParam = (bodyParam) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          const params = JSON.parse(bodyParam);
          const stringEvoie = `add${this.separation}param${this.separation}${
            params.name_param
          }${this.separation}${JSON.stringify(params.param)}`;
          console.log(stringEvoie);
          sock.write(stringEvoie);

          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };

  /**
   * @param id  id = ""
   * @return array[{objet}]
   */
  listeParam = (id = "") => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`list${this.separation}param${this.separation}${id}`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };

  /**
   * @params Objet {id: 1, name_param: "", param: {}}
   * @return String
   */
  updeteParam = (params) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(
            `update${this.separation}param${this.separation}${params}`
          );
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * @param id Int
   * @return String
   */
  delParam = (id) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`del${this.separation}param${this.separation}${id}`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };

  /**
   * @params Objet {"id_client": 2 , "exe": {}}
   * @return String
   */
  addExe = (bodyParam) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          const params = JSON.parse(bodyParam);
          const stringEvoie = `add${this.separation}exe${
            this.separation
          }${JSON.stringify(params)}`;
          console.log(stringEvoie);
          sock.write(stringEvoie);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };

  /**
   * @param id  id = ""
   * @return array[{objet}]
   */
  listeExe = (id = "") => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`list${this.separation}exe${this.separation}${id}`);

          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };

  /**
   * @params Objet {id: 1, "client_id" : 2, "exe" : {}}
   * @return String
   */
  updeteExe = (params) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`update${this.separation}exe${this.separation}${params}`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  /**
   * @param id Int
   * @return String
   */
  delExe = (id) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(`del${this.separation}exe${this.separation}${id}`);
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
  //test OK
  /**
   * @param id Int
   * @param objet
   * @return String
   */
  objetExe = (id, _json) => {
    return new Promise((resolve, reject) => {
      const fon = () => {
        return new Promise((resolve, reject) => {
          const s = new sok(this.host, this.port);
          const sock = s.sok();
          sock.write(
            `objet${this.separation}exe${this.separation}${id}${this.separation}${_json}`
          );
          let donner = "";
          sock.on("data", (chunk) => {
            console.log(chunk);
            donner = donner.concat(chunk.toString());
            sock.serverString = donner;
          });
          sock.on("end", () => {
            sock.serverString = donner;
            resolve(donner);
          });
          sock.on("error", function (err) {
            reject(err);
          });
        });
      };
      fon().then((value) => {
        this.ertement(value)
          .then((ertValue) => {
            resolve(JSON.parse(ertValue));
          })
          .catch((err) => reject(err));
      });
    });
  };
}

module.exports = mqttSocker;
