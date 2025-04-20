const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const navBarSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "navBar", timestamps: true }
);

module.exports = mongoose.model("navBar", navBarSchema);
