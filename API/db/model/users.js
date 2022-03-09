const { pool } = require("../connexion");
const myorm = require("../Myorm");
const bcrypt = require("bcryptjs");
require("dotenv").config();
class User extends myorm {
  constructor(connexion, table, shemas) {
    super(connexion, table, shemas);
    // var mdp = {};
    // Object.assign(shemas, mdp);
  }
  verifyPassword = async (userObjet = {}) => {
    return new Promise((resolve, reject) => {
      var sql = "SELECT ".concat(
        this.table_.password,
        ", ",
        this.table_.id,
        " FROM ",
        this.table_.table,
        " WHERE `",
        this.table_.int,
        "` LIKE '%",
        userObjet.user,
        "%'"
      );
      this.queryDB(sql)
        .then((valueSql) => {
          var id_ = this.isKey(valueSql[0], this.table_.id);
          const entries = new Map([[this.table_.id, id_]]);
          this.findOne(Object.fromEntries(entries)).then((value) => {
            var pass = this.isKey(valueSql[0], this.table_.password);
            if (!bcrypt.compareSync(userObjet.password, pass)) {
              // authentication failed
              console.log(true);
              reject("qu'est-ce que tu fais");
            } else {
              // authentication successful
              resolve(value);
              console.log(true);
            }
          });
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };
}
const NewUser = new User(
  pool,
  {
    table: "users",
    id: "id_user",
    password: "mdp",
    int: "mail",
  },
  {
    id_user: 0,
    nom: "",
    prenom: "",
    mail: "",
    path_img: "",
    type: "",
  }
);

module.exports = NewUser;
