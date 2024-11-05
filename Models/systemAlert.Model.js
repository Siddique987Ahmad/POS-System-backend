const mongoose = require("mongoose");

const systemAlertSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["error", "maintenance", "downtime"],
    required: true,
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
  },
  severity: { 
    type: String, 
    enum: ["low", "medium", "high"], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("SystemAlert", systemAlertSchema);
