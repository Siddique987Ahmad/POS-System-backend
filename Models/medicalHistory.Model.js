const mongoose = require("mongoose");

const medicalHistorySchema = mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  condition: { type: String, required: true },
  medications: [{ type: String }],  // Array to list medications
  allergies: [{ type: String }],
  notes: String,  // Optional notes about the patient's history
  recordDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("MedicalHistory", medicalHistorySchema);
