const { pool } = require("../connexion");
const ORMExecut = require("../Myorm");

class E extends ORMExecut {
  constructor(connexion, table, shemas) {
    super(connexion, table, shemas);
  }
  finall = () => {
    return new Promise((resolve, reject) => {
      this.findAll().then((val) => {
        let result = [];
        for (const [key, value] of Object.entries(val)) {
          try {
            value.event = JSON.parse(value.event);
            value.action = JSON.parse(value.action);
          } catch (error) {}
          result.push(value);
        }
        resolve(result);
        console.log(result);
      });
    });
  };
  finOne = (is = {}) => {
    return new Promise((resolve, reject) => {
      this.findOne(is)
        .then((val) => {
          let result = [];
          for (const [key, value] of Object.entries(val)) {
            try {
              value.event = JSON.parse(value.event);
              value.action = JSON.parse(value.action);
            } catch (error) {}
            result.push(value);
          }
          resolve(result);
          console.log(result);
        })
        .catch(reject);
    });
  };
}
const Executtor = new E(
  pool,
  {
    table: "execut",
    id: "type",
  },
  {
    user: "",
    action: "",
    event: "",
    type: "",
    name_exe: "",
  }
);
module.exports = Executtor;
