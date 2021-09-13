const controller = require("../controllers/attractions.controller");

module.exports = function(app) {
  app.get("/api/attractions/getAttractions", controller.getAllAttractions);
};