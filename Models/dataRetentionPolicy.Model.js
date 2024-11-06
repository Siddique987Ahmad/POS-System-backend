const mongoose = require("mongoose");

const dataRetentionPolicySchema = mongoose.Schema({
  policyName: { type: String, required: true },
  description: { type: String },
  recordType: {
    type: String,
    enum: ["transactionLog", "userActivity", "inventoryUpdate", "salesReport", "complianceReport"],
    required: true
  },
  retentionPeriod: { type: Number, required: true }, // Retention period in days
  archiveAfter: { type: Boolean, default: true }, // Whether records should be archived after the retention period
  deleteAfterArchive: { type: Boolean, default: false } // Whether records should be deleted after archiving
}, { timestamps: true });

module.exports = mongoose.model("DataRetentionPolicy", dataRetentionPolicySchema);
