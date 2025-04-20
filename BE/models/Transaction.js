const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    room: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    pice: {
      type: Number,
      require: true,
    },
    payment: {
      type: String,
      enum: ["Create Card", "Cash"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Checkin", "Checkout"],
      default: "Booked",
    },
  },
  { timestamps: true }
);
const Transaction = mongoose.model("Transaction", transactionSchema);
