class myorm {
  table_;
  connexion_;
  shemas_;
  objet;
  /**
   * @param instanceof DB
   * @param {Objet} table
   * {"table":"user", "id":"user_id"}
   * @param {Object} shemas
   * { id_user: 0, nom: "",...}
   *
   */
  constructor(connexion, table, shemas) {
    this.connexion_ = connexion;
    this.table_ = table;
    this.shemas_ = shemas;
  }
  async queryDB(sql) {
    return new Promise((resolve, reject) => {
      this.connexion_
        .getConnection()
        .then((conn) => {
          conn
            .query(sql)
            .then((rows) => {
              resolve(rows);
              conn.end();
            })
            .catch((err) => {
              reject(err.message);
              conn.end();
            });
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  conte = () => {
    var tableauKeys = Object.keys(this.shemas_);
    return tableauKeys.length;
  };
  /**
   * @param {Objet} objat
   * @param {String} key
   * @returns value
   */
  isKey = (objet, key) => {
    for (const [Key, value] of Object.entries(objet)) {
      if (Key === key) {
        return value;
      }
    }
  };
  /**
   * @requir {Object} Class.object
   * @returns
   */
  create = async () => {
    return new Promise((resolve, reject) => {
      var i = 0;
      var ValueString = "";
      var KeyString = "";
      for (const [key, value] of Object.entries(this.objet)) {
        var lth = this.conte() - 1;
        if (key == this.table_.id) {
          continue;
        }
        if (lth != i + 1) {
          ValueString = ValueString.concat("'", value, "',");
          KeyString = KeyString.concat("`", key, "`,");
        } else if (lth == i + 1) {
          ValueString = ValueString.concat("'", value, "'");
          KeyString = KeyString.concat("`", key, "`");
        }
        i = i + 1;
      }
      // ("UPDATE `mqttautom` SET { sqlValue } WHERE`id` = { json_['id']}`");
      var sql = "INSERT INTO".concat(
        " ",
        this.table_.table,
        " (",
        KeyString,
        " ) VALUES ( ",
        ValueString,
        ")"
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
  /**
   * @requir {Object} Class.object
   * @returns
   */
  update = async () => {
    return new Promise((resolve, reject) => {
      var i = 0;
      var setString = "";
      for (const [key, value] of Object.entries(this.objet)) {
        var lth = this.conte() - 1;
        if (key == this.table_.id) {
          continue;
        }
        if (lth != i + 1) {
          setString = setString + `'${key}' = '${value}', `;
        } else if (lth == i + 1) {
          setString = setString + `'${key}' = '${value}'`;
        }
        i = i + 1;
      }
      // ("UPDATE `mqttautom` SET { sqlValue } WHERE`id` = { json_['id']}`");
      var sql = "UPDATE".concat(
        " `",
        this.table_.table,
        "` ",
        " SET ",
        setString,
        " WHERE `",
        this.table_.id,
        "` = ",
        this.isKey(this.objet, this.table_.id)
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
  findOne = async (is = {}) => {
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
        " FROM ",
        this.table_.table,
        " WHERE `",
        this.table_.id,
        "` = ",
        this.isKey(is, this.table_.id)
      );
      this.queryDB(sql)
        .then((valueSql) => {
          resolve(valueSql);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };

  findAll = async () => {
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
          resolve(valueSql);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  /**
   *
   * @param {} is
   * @returns
   */
  delete = async (is = {}) => {
    return new Promise((resolve, reject) => {
      var sql = "DELETE FROM".concat(
        " `",
        this.table_.table,
        "` WHERE `",
        this.table_.id,
        "` = ",
        this.isKey(is, this.table_.id)
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
module.exports = myorm;
