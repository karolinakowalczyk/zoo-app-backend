const mongoose = require("mongoose");

const plansSchema = mongoose.Schema(
    {
        owner: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reservation: { type: Object, "default": [] },
        transport: { type: Object, "default": [] },
        attractions: { type: Object, "default": [] },
    },
);

const Plans = mongoose.model("Plans", plansSchema);
module.exports = Plans;