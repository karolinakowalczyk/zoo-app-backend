const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  
  /*app.post("/api/auth/requestResetPassword", controller.resetPasswordRequestController);
  app.post("/api/auth/resetPassword", controller.resetPasswordController);
  app.put("/api/auth/editProfile", controller.editProfile);
  app.post("/api/auth/refreshtoken", controller.refreshToken);*/
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/requestResetPassword", controller.resetPasswordRequestController);
  app.post("/api/auth/resetPassword", controller.resetPasswordController);
  app.put("/api/auth/editProfile", controller.editProfile);
  app.post("/api/auth/refreshtoken", controller.refreshToken);
};