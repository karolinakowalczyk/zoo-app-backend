const controller = require("../controllers/petfinder.controller");

module.exports = function (app) {
    app.get("/api/petfinder/getAccessToken", controller.getAccessToken);
};