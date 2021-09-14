const mongoose = require("mongoose");

const activationHashesSchema = mongoose.Schema(
    {
        userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
);

const ActivationHashes = mongoose.model("ActivationHashes", activationHashesSchema);
module.exports = ActivationHashes;