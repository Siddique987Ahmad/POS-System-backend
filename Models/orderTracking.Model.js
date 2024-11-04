const mongoose = require("mongoose");

const orderTrackingSchema = mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder", required: true },
  status: {
    type: String,
    enum: ["pending", "received", "processed"],
    default: "pending",
  },
  statusUpdates: [
    {
      status: { type: String, required: true },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("OrderTracking", orderTrackingSchema);
