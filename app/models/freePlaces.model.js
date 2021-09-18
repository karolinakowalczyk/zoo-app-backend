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
        /*reservationDate: {
            type : Date
        },*/
    }  
);

const FreePlaces = mongoose.model("FreePlaces", freePlacesSchema);
module.exports = FreePlaces;