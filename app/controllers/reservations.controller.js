const db = require("../models");
const Reservation = db.reservations;
const FreePlaces = db.freePlaces;
exports.getUserReservations = (req, res) => {
  const userId = req.query.userId;
  Reservation.find({userId: userId})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred trying to get your reservations."
      });
    });

}

exports.createReservation = async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const date = req.body.date;
  const expirationDate = req.body.expirationDate;
  const quantity = req.body.quantity;
  const today = new Date();

  let freePlaces = await FreePlaces.findOne({ reservationDate: date });
  if (!freePlaces) {
    const newFreePlaces = new FreePlaces({ quantity: 2, reservationDate: date });
    await newFreePlaces.save();
    freePlaces = newFreePlaces;
  }
  if (freePlaces && (freePlaces.quantity < quantity)) {
    return res.status(404).send({ message: "Sorry, no more places for this day!" });
  }

  const existingReservation = await Reservation.find({ userId: userId });
 
  if (existingReservation.length !== 0) {
    const exp_dates = []
    for (let i = 0; i < existingReservation.length; i++) {
      exp_dates.push(new Date(existingReservation[i].expirationDate));
    }
    for (let i = 0; i < exp_dates.length; i++) {
      //today comes before exp_date
      if (today < exp_dates[i]) {
        return res.status(404).send({ message: "You can't' make a reservation!" });
      }
    }
  }

  const reservation = new Reservation({ userId: userId, name: name, date: date, expirationDate: expirationDate });
  await reservation.save();
  const newQuantity = freePlaces.quantity - quantity;

  await FreePlaces.updateOne(
    { _id: freePlaces.id },
    { quantity:  newQuantity } 
  );
  /*const freePlaces = new FreePlaces({ quantity: 2, reservationDate: date });
  await freePlaces.save();*/
  return res.json({ message: 'Reservation added!' });
  
}