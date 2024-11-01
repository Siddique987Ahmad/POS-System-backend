const mongoose=require('mongoose')
const paymentMethodSchema = mongoose.Schema({
    methodType: { type: String, enum: ["Cash", "Card", "Mobile"], required: true },
    details: { type: String },  // Optional for card or mobile payment gateway details
  }, { timestamps: true });
  
  module.exports = mongoose.model("PaymentMethod", paymentMethodSchema);
  