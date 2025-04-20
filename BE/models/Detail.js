const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const detailSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    nine_night_price: {
      type: Number,
      required: true,
    },
  },
  { collection: "detail", timestamps: true }
);

module.exports = mongoose.model("Detail", detailSchema);
