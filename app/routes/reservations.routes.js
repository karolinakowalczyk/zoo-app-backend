const controller = require("../controllers/reservations.controller");

module.exports = function(app) {
  app.get("/api/reservations/getUserReservations", controller.getUserReservations);
  app.post("/api/reservations/createReservation", controller.createReservation);
};