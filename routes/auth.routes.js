const controller = require("../controllers/coupon.controller");

const controllers = require("../controllers/user.controller")

const controllerss = require("../controllers/auth.controller")

const { authJwt } = require("../middleware");

const verifySignUp = require("../middleware/verifySignUp");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers", 
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail],controllerss.signup);

  app.post("/api/auth/signin", controllerss.signin);

  app.post("/test/coupon/:id",[authJwt.verifyToken,authJwt.isAdmin],controller.addcoupon);

  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controllers.adminBoard);

   
};