const db = require("../models");
const Plan = db.plans;

exports.createPlan = async (req, res) => {
  const owner = req.body.owner;
  const reservation = req.body.reservation;
  const transport = req.body.transport;
  const attractions = req.body.attractions;

  if (reservation.length === 0) {
    return res.status(404).send({ message: "You cannot create a plan without reservation!" });
  }
  const plan = new Plan({ owner: owner, reservation: reservation, transport: transport, attractions: attractions});
  await plan.save();
  
  return res.json({ message: 'Plan added!' });
  
}