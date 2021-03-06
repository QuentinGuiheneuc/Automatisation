const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
module.exports = {
  TypeBD: process.env.TYPEBD || "mariadb",
  BD: {
    FlieSqli: process.env.FILESQLI || "./db/Defaut.db",
    Host: process.env.HOSTBD || "192.168.1.39",
    Port: process.env.PORTBD || 3306,
    User: process.env.USERBD || "root",
    Password: process.env.PASSWDBD || "",
    Database: process.env.DATABASEBD || "bbd_projet",
  },
  Server: {
    Host: process.env.HOST || "localhost",
    Port: process.env.PORT || 3007,
  },
  socket: {
    serverofpython: {
      host: process.env.HOSTSERVERPYTHON || "quentinguiheneuc.fr",
      port: process.env.PORTSERVERPYTHON || 65000,
      separation: process.env.SEPARATORSERVERPYTHON || ";",
    },
  },
};
