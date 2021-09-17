const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.attractions = require("./attractions.model");
db.activationHashes = require("./activationHashes.model");
db.reservations = require("./reservations.model");

db.ROLES = ["user", "admin"];

module.exports = db;