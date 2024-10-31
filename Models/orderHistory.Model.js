const mongoose = require("mongoose");

const orderHistorySchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true,
  },
  orderId: { type: String, required: true },
  quantity: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Ordered", "Delivered", "Cancelled"],
    default: "Ordered",
  },
},{
    timestamps:true
});

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
