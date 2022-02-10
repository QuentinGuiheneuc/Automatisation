module.exports = {
  TypeBD: process.env.TYPEBD || "mariadb",
  BD: {
    FlieSqli: process.env.FILESQLI || "./db/Defaut.db",
    Host: process.env.HOSTBD || "localhost",
    Port: process.env.PORTBD || 3306,
    User: process.env.USERBD || "root",
    Password: process.env.PASSWDBD || "root",
    Database: process.env.DATABASEBD || "bbd_projet",
  },
  Server: {
    Host: process.env.HOST || "192.168.1.39",
    Port: process.env.PORT || 3007,
  },
};
