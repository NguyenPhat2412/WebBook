const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const footerSchema = new Schema(
  {
    col_number: {
      type: Number,
      required: true,
    },
    col_values: {
      type: [Array],
      required: true,
    },
  },
  { collection: "footer", timestamps: true }
);

module.exports = mongoose.model("Footer", footerSchema);
