const jwt = require("jsonwebtoken");

const config = require("../app/config/auth.config");

const db = require("../models");

const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  }); 
};

isAdmin = (req, res, next) => {
  try{
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
}
catch(err){res.send(err)}
};

isUser = (req, res, next) => {
  try{
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require user Role!"
      });
    });
  });
}catch(err){res.send(err)} 
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,  
  isUser: isUser,
  
};

module.exports = authJwt;