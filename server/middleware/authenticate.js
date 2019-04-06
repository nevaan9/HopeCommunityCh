const User = require("../models/User");

const authenticate = (req, res, next) => {
  const token = req.header("x-auth");

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send();
    });
};

const isAdmin = (req, res, next) => {
  const token = req.header("x-auth");

  User.findByToken(token)
    .then(user => {
      if (!user) {
        throw new Error("Not a valid user");
      }
      if (user.isAdmin) {
        req.user = user;
        req.token = token;
        next();
      } else {
        throw new Error("Not a valid user");
      }
    })
    .catch(e => {
      res.status(401).send();
    });
};

module.exports = { authenticate, isAdmin };
