const app = require("express").Router();
const routerUser = require("./routers/user.js");
const routerAutom = require("./routers/autom.js");
const routerparam = require("./routers/param.js");
const routerexe = require("./routers/exe.js");
const routerobjet = require("./routers/objet.js");
const routertopic = require("./routers/topic.js");
const routercache = require("./routers/cache.js");
const routerclient = require("./routers/client.js");
const routernotification = require("./routers/notification.js");
const routermeteo = require("./routers/meteo.js");
const routerplex = require("./routers/plex.js");

app.use(routerUser);
app.use(routerAutom);
app.use(routerparam);
app.use(routerobjet);
app.use(routerexe);
app.use(routertopic);
app.use(routercache);
app.use(routerclient);
app.use(routernotification);
app.use(routermeteo);
app.use(routerplex);

app.use(function (req, res) {
  res.status(404);
  res.end("Not Found 1");
});
module.exports = app;
