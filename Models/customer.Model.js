const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String },
  loyaltyPoints: { type: Number, default: 0 },
  orderHistory: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "OrderHistory" 
    }
  ]  // Array of OrderHistory references
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
