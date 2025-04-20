const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const phanloaiSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { collection: "phanloai", timestamps: true }
);

module.exports = mongoose.model("Phanloai", phanloaiSchema);
