const jwt = require("jsonwebtoken");
const SECRET_KEY =
  process.env.SECRET_KEY ||
  "YHrh5rm4a9KWPmLQ03reYgE-24Hl98HNbZQdMu-pm8gQBiJl9xvWRBWxJaZjjPYT";
/* Récupération du header bearer */
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }
  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
  // Récupération du token
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  // Présence d'un token
  if (!token) {
    return res.status(401).json({ message: "Error. Need a token" });
  }

  // Véracité du token
  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Error. Bad token" });
    } else {
      req.authorization = decodedToken;
      return next();
    }
  });
};
module.exports = checkTokenMiddleware;
