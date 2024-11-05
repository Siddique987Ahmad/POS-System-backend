const mongoose = require("mongoose");

const stockAlertSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["low_stock", "near_expiry"],
    required: true,
  },
  medicine: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Medicine", 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  alertDate: { 
    type: Date, 
    default: Date.now 
  },
  isResolved: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

module.exports = mongoose.model("StockAlert", stockAlertSchema);
