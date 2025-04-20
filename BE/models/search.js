const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const searchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    free_cancel: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    rate_text: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    minder: {
      type: String,
      required: true,
    },
  },
  { collection: "search", timestamps: true }
);
module.exports = mongoose.model("Search", searchSchema);
