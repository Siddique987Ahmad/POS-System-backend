const mongoose=require('mongoose')
const receiptSchema = mongoose.Schema({
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: "SalesTransaction", required: true },
    receiptDetails: String,  // Stringified or HTML details of the receipt
    taxes: { type: Number, required: true },
    paymentMode: { type: String, enum: ["Cash", "Card", "Mobile"], required: true },
    createdAt: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Receipt", receiptSchema);
  