const mongoose = require("mongoose");

const salesAlertSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["high_value", "unusual_pattern"],
    required: true,
  },
  transactionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "SalesTransaction", 
    required: true 
  },
  amount: { 
    type: Number, 
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

module.exports = mongoose.model("SalesAlert", salesAlertSchema);
