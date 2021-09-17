const db = require("../models");
const Reservation = db.reservations;
exports.getUserReservations = (req, res) => {
  const userId = req.body.userId;
  try {
    Reservation.find({userId: userId}, function (err, reservations) {
      res.json(reservations);
    });
  } catch (err) {
    res.status(500).json({ err: "An error occured trying to fetch user reservations" });
  }
}

exports.createReservation = async (req, res) => {
  const userId = req.body.userId;
  const date = req.body.date;
  const expirationDate = req.body.expirationDate;
  const reservation = new Reservation({ userId: userId, date: date, expirationDate: expirationDate });
  await reservation.save();
  return res.json({ message: 'Reservation added!' });
  
}