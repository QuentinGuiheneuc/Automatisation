const { pool } = require("../connexion");
const ORMMeteoSe = require("../Myorm");
const ORMMeteoDo = require("../Myorm");
const axios = require("axios");
const MeteoParam = new ORMMeteoSe(
  pool,
  {
    table: "parametremeteo",
    id: "id_meteo",
  },
  {
    nom: "",
    codeDepartement: "",
    codesPostaux: "",
    insee: "",
  }
);

class meteo extends ORMMeteoSe {
  constructor(connexion, table, shemas) {
    super(connexion, table, shemas);
  }
  Search = async (search) => {
    return new Promise((resolve, reject) => {
      var i = 0;
      var setString = "";
      for (const [key, value] of Object.entries(this.shemas_)) {
        var lth = this.conte() - 1;
        if (lth != i) {
          setString = setString.concat("`", key, "`, ");
        } else if (lth == i) {
          setString = setString.concat("`", key, "`");
        }
        i = i + 1;
      }
      var sql = "SELECT ".concat(
        setString,
        " FROM `",
        this.table_.table,
        "` WHERE `",
        this.table_.search,
        "` LIKE '%",
        search,
        "%'"
      );
      this.queryDB(sql)
        .then((valueSql) => {
          resolve(valueSql);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
class MeteoDon extends ORMMeteoDo {
  constructor(connexion, table, shemas) {
    super(connexion, table, shemas);
  }
  datediff = (datenow, datediff) => {
    const jour = datenow.getDay() - datediff.getDay();
    const moins = datenow.getMonth() - datediff.getMonth();
    const annee = datenow.getFullYear() - datediff.getFullYear();
    const heur = datenow.getHours() - datediff.getHours();
    const min = datenow.getMinutes() - datediff.getMinutes();
    const sec = datenow.getSeconds() - datediff.getSeconds();
    console.log(
      `jour-${jour} moins-${moins} annee-${annee} heur-${heur} min-${min} sac-${sec}`
    );
    if (jour != 0 || moins != 0 || annee != 0 || heur > 0 || min > 10) {
      return true;
    } else {
      return false;
    }
  };
  token = `?token=${process.env.METEOTOKEN}`;
  insee = "";
  UpdateObject = (insee) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.meteo-concept.com/api/forecast/daily${this.token}&insee=${insee}`
        )
        .then((res1) => {
          console.log("res1");
          axios
            .get(
              `https://api.meteo-concept.com/api/ephemeride/0${this.token}&insee=${insee}`
            )
            .then((res) => {
              const event = new Date();
              event.setHours(event.getHours() + 1);
              const dates = event
                .toISOString()
                .replace(/T/, " ") // replace T with a space
                .replace(/\..+/, "");
              console.log(dates);
              this.objet = {
                id_meteo: 1,
                ephemeride: JSON.stringify(res.data.ephemeride),
                city: JSON.stringify(res1.data.city),
                forecast: JSON.stringify(res1.data.forecast),
                date: dates,
              };
              this.update().then(() => {
                this.meteoDo().then((valueme) => {
                  resolve(valueme);
                });
              });
            })
            .catch((error) => {
              reject(error.message);
            });
        });
    });
  };
  meteoDo = () => {
    return new Promise((resolve, reject) => {
      var i = 0;
      var setString = "";
      for (const [key, value] of Object.entries(this.shemas_)) {
        var lth = this.conte() - 1;
        if (lth != i) {
          setString = setString.concat("`", key, "`, ");
        } else if (lth == i) {
          setString = setString.concat("`", key, "`");
        }
        i = i + 1;
      }
      var sql = "SELECT ".concat(setString, " FROM ", this.table_.table);
      this.queryDB(sql)
        .then((valueSql) => {
          let entries = new Map([]);
          for (const [key, value] of Object.entries(valueSql[0])) {
            //entries.append(key, value);
            let valueJson;
            try {
              valueJson = JSON.parse(value);
            } catch (error) {}
            if (valueJson) {
              entries.set(key, valueJson);
            } else {
              entries.set(key, value);
            }
          }
          const formatobjet = Object.fromEntries(entries);
          //console.log(datedb.getHours());
          resolve(formatobjet);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };
  findAll = async () => {
    return new Promise((resolve, reject) => {
      MeteoParam.findOne({ id_meteo: 1 })
        .then((valueme) => {
          // console.log(valueme, "me");
          var sql1 = "SELECT date FROM ".concat(this.table_.table);
          this.queryDB(sql1)
            .then((value) => {
              let datedb = new Date(value[0].date);
              let dalenow = new Date();
              console.log(this.datediff(dalenow, datedb));
              if (this.datediff(dalenow, datedb)) {
                this.UpdateObject(valueme[0].insee)
                  .then((value) => {
                    resolve(value);
                  })
                  .catch((error) => {
                    reject(error.message);
                  });
              } else {
                this.meteoDo().then((valueme) => {
                  resolve(valueme);
                });
              }
            })
            .catch((err) => {
              reject(err.message);
            });
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };
}

const MeteoDonner = new MeteoDon(
  pool,
  {
    table: "objetmeteo",
    id: "id_meteo",
  },
  {
    city: "",
    ephemeride: "",
    forecast: "",
    date: "",
  }
);

const MeteoInsee = new meteo(
  pool,
  {
    table: "donner_insee",
    id: "id_insee",
    search: "nom",
  },
  {
    id_insee: 0,
    nom: "",
    codeDepartement: "",
    codesPostaux: "",
    insee: "",
  }
);

module.exports = { MeteoInsee, MeteoDonner, MeteoParam };
