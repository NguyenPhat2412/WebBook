const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    price: {
      type: Number,
    },
    maxPeople: {
      type: Number,
    },
    desc: {
      type: String,
    },
    roomNumbers: [
      {
        type: Number,
        required: true,
        unavailableDates: { type: [Date] },
      },
    ],
  },
  { collection: "room", timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
