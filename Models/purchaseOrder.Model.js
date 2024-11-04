const mongoose = require("mongoose");

const purchaseOrderSchema = mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  orderDate: { type: Date, default: Date.now },
  items: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
