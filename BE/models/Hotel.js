const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    city: {
      type: String,
    },
    cheapestPrice: {
      type: Number,
    },
    address: {
      type: String,
    },
    distance: {
      type: String,
    },
    photos: {
      type: [String],
      default: [],
    },
    desc: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    featured: { type: Boolean, default: false },
    rooms: {
      type: [{ type: Schema.Types.ObjectId, ref: "Room" }],
      required: true,
    },
    // 1: free cancel, 0: no free cancel
    days: {
      type: [Array],
    },
  },
  { collection: "hotel_list", timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
