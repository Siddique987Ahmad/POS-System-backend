const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  specialty: { type: String },  // Optional: to specify the doctor's specialty
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
