const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },  // Reference to the Doctor model
  medicines: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true }, // Reference to the existing Medicine model
      dosage: { type: String, required: true },
      frequency: { type: String, required: true },
      duration: { type: String },  // Optional: to specify how long the medicine should be taken
    },
  ],
  prescriptionDate: { type: Date, default: Date.now },
  isValidated: { type: Boolean, default: false },  // To mark if the prescription is validated
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: "SalesTransaction" },  // Optional: link to a sales transaction
}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);
