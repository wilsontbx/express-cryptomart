const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    history: [
      {
        type: { type: String, required: true, enum: ["buy", "sell"] },
        coin: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        unit: { type: Number, required: true },
        created_at: { type: Date, required: true, default: Date.now },
        updated_at: { type: Date, required: true, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const History = mongoose.model("History", HistorySchema);

module.exports = History;
