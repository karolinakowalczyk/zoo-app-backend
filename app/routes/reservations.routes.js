const controller = require("../controllers/reservations.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {

    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/reservations/getUserReservations", [authJwt.verifyToken], controller.getUserReservations);
  app.post("/api/reservations/createReservation", [authJwt.verifyToken], controller.createReservation);
};