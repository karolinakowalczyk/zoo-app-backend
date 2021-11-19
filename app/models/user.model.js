const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    email: {
        type: String,
        index: true
    },
    password: String,
    name: {
      type: String,
      default: ""
    },
    surname: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    postalCode: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    phonenumber: {
      type: String,
      default: "",
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;