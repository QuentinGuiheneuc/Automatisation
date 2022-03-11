const { pool } = require("../connexion");
const ORMNotification = require("../Myorm");
const Notification = new ORMNotification(
  pool,
  {
    table: "notification",
    id: "id_notif",
  },
  {
    id_notif: 0,
    text: "",
    type: "",
    icon: "",
    date: "",
    color: "",
  }
);
module.exports = Notification;
