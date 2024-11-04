const mongoose = require("mongoose");

const supplierInvoiceSchema = mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder", required: true },
  invoiceDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  linkedToInventoryUpdate: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("SupplierInvoice", supplierInvoiceSchema);
