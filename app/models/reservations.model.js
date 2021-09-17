const mongoose = require("mongoose");

const reservationsSchema = mongoose.Schema(
  {
    userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    date: String,
    expirationDate: String,
  },
  { timestamps: true }
);

const Reservations = mongoose.model("Reservation", reservationsSchema);
module.exports = Reservations;