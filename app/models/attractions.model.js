const mongoose = require("mongoose");

const attractionsSchema = mongoose.Schema(
    {
        name: String,

        duration: Number,

        hour: Number,
    },
);

const Attractions = mongoose.model("Attractions", attractionsSchema);
module.exports = Attractions;