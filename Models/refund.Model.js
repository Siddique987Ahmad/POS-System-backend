const mongoose=require('mongoose')
const refundSchema = mongoose.Schema({
    originalTransaction: { type: mongoose.Schema.Types.ObjectId, ref: "SalesTransaction", required: true },
    itemsReturned: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
        quantity: { type: Number, required: true },
      },
    ],
    refundAmount: { type: Number, required: true },
    refundDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Pending", "Processed", "Denied"], default: "Pending" },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Refund", refundSchema);
  