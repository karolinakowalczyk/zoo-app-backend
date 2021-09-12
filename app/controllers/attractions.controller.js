const db = require("../models");
const Attractions = db.attractions;
exports.getAllAttractions = (req, res) => {
  try {
    Attractions.find({}, function (err, attractions) {
      res.json(attractions);
    });
  } catch (err) {
    res.status(500).json({ err: "An error occured trying to fetch the attractions" });
  }
}