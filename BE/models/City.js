const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subText: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { collection: "city", timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
