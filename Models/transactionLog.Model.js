const mongoose = require("mongoose");

const transactionLogSchema = mongoose.Schema({
  transactionId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  cashier: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming a User model for cashiers
  transactionType: { 
    type: String, 
    enum: ["sale", "refund", "exchange"], 
    required: true 
  },
  transactionDetails: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  amount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("TransactionLog", transactionLogSchema);
