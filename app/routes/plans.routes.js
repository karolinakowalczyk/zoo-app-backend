const controller = require("../controllers/plans.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {

    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/plans/getUserPlans", [authJwt.verifyToken], controller.getUserPlans);
  app.post("/api/plans/createPlan", [authJwt.verifyToken], controller.createPlan);
};