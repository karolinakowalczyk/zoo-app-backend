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
  const today = new Date();

  const existingReservation = await Reservation.find({ userId: userId });
 
  if (existingReservation.length !== 0) {
    const exp_dates = []
    for (let i = 0; i < existingReservation.length; i++) {
      exp_dates.push(existingReservation[i].expirationDate);
    }
    for (let i = 0; i < exp_dates.length; i++) {
      //today comes before exp_date
      if (today < exp_dates[i]) {
        return res.status(404).send({ message: "You can't' make a reservation!" });
      }
    }
  }

  const reservation = new Reservation({ userId: userId, date: date, expirationDate: expirationDate });
  await reservation.save();
  return res.json({ message: 'Reservation added!' });
  
}