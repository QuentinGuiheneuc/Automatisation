const client = require("../connexionSocket");
const mqtt = (id, value) => {
  return new Promise((resolve, reject) => {
    let desvalue = {};
    desvalue["value"] = value.value;
    client
      .objetExe(id, JSON.stringify(desvalue))
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

module.exports = mqtt;
