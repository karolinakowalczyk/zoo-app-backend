const controller = require("../controllers/plans.controller");

module.exports = function (app) {
  app.get("/api/plans/getUserPlans", controller.getUserPlans);
  app.post("/api/plans/createPlan", controller.createPlan);
};