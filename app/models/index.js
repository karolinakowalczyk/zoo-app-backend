const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.attractions = require("./attractions.model");
db.activationHashes = require("./activationHashes.model");
db.reservations = require("./reservations.model");
db.freePlaces = require("./freePlaces.model");
db.plans = require("./plans.model");
db.refreshToken = require("./refreshToken.model");

db.ROLES = ["user", "admin"];

module.exports = db;