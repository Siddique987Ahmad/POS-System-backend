const mongoose = require("mongoose");
const inventoryReportSchema = mongoose.Schema({
    reportDate: { type: Date, default: Date.now },
    stockLevels: [
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    reorderRequired: [
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
        reorderLevel: { type: Number, required: true },
      },
    ],
    expiredItems: [
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
        expirationDate: { type: Date, required: true },
      },
    ],
  }, { timestamps: true });
  
  module.exports = mongoose.model("InventoryReport", inventoryReportSchema);
  