const mongoose = require("mongoose");

const freePlacesSchema = mongoose.Schema({
    name: {
        type: String,
            default: "freePlaces"
        },
        quantity: {
            type: Number,
            default: 0
        },
        reservationDate: String,
    }  
);

const FreePlaces = mongoose.model("FreePlaces", freePlacesSchema);
module.exports = FreePlaces;