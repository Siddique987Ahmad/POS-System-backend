const mongoose = require("mongoose");
const userActivityLogSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    description: { type: String },
    actionDate: { type: Date, default: Date.now },
    associatedEntity: { type: String }, // E.g., 'Sale', 'Inventory Update'
    entityId: { type: mongoose.Schema.Types.ObjectId }, // ID of associated entity (e.g., Sale, Medicine)
  }, { timestamps: true });
  
  module.exports = mongoose.model("UserActivityLog", userActivityLogSchema);
  