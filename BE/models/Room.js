const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    title: {
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
    roomNumber: [
      {
        type: Number,
        unavailableDates: { type: [Date] },
      },
    ],
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
