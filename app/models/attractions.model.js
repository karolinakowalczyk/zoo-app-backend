const mongoose = require("mongoose");

const attractionsSchema = mongoose.Schema(
    {
        name: String,

        duration: Number,

        hour: Number,
    
        //hours: { type: Array, "default": [] }
    },
);

const Attractions = mongoose.model("Attractions", attractionsSchema);
module.exports = Attractions;