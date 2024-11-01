const mongoose=require('mongoose')
const taxSchema = mongoose.Schema({
    itemCategory: { type: String, required: true },
    location: { type: String, required: true },
    taxRate: { type: Number, required: true },  // Tax rate as a percentage
    effectiveFrom: { type: Date, required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Tax", taxSchema);
  