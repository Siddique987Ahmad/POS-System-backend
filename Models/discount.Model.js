const mongoose=require('mongoose')
const discountSchema = mongoose.Schema({
    code: { type: String, unique: true, required: true },
    description: { type: String },
    discountType: { type: String, enum: ["Item", "Transaction"], required: true },
    discountValue: { type: Number, required: true },  // Can be a percentage or flat amount
    validTill: { type: Date, required: true },
    applicableItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicine" }],
  }, { timestamps: true });
  
  module.exports = mongoose.model("Discount", discountSchema);
  