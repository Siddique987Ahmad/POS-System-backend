const mongoose = require("mongoose");

const complianceReportSchema = mongoose.Schema({
  reportNumber: { type: String, required: true, unique: true },
  reportPeriod: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  generatedDate: { type: Date, default: Date.now },
  auditor: { type: String, required: true }, // Name or ID of the responsible auditor
  findings: { type: String }, // Summary or details of the compliance audit findings
  status: {
    type: String,
    enum: ["compliant", "non-compliant", "pending review"],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("ComplianceReport", complianceReportSchema);
