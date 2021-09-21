const db = require("../models");
const Plan = db.plans;

exports.createPlan = async (req, res) => {
  const owner = req.body.owner;
  const reservation = req.body.reservation;
  const transport = req.body.transport;
  const attractions = req.body.attractions;

    console.log(owner);
    console.log(reservation);
    console.log(transport);
    console.log(attractions);
  const plan = new Plan({ owner: owner, reservation: reservation, transport: transport, attractions: attractions});
  await plan.save();
  
  return res.json({ message: 'Plan added!' });
  
}