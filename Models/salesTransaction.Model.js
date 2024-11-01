const mongoose = require("mongoose");

const salesTransactionSchema = mongoose.Schema({
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      totalPrice: { type: Number, required: true },
    },
  ],
  transactionTotal: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Cash", "Card", "Mobile"], required: true },
  discountCode: { type: String },
  transactionDate: { type: Date, default: Date.now },
  customer: { type: String },  // Optional for customer details
  taxAmount: { type: Number, required: true },
  finalAmount: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model("SalesTransaction", salesTransactionSchema);
