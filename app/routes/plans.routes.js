const controller = require("../controllers/plans.controller");

module.exports = function(app) {
  app.post("/api/plans/createPlan", controller.createPlan);
};