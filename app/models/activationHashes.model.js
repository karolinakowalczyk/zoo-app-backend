const mongoose = require("mongoose");
const config = require("../config/auth.config");

const activationHashesSchema = mongoose.Schema(
    {
        userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        expiryDate: Date,
    },
);

const ActivationHashes = mongoose.model("ActivationHashes", activationHashesSchema);
module.exports = ActivationHashes;