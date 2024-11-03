const mongoose = require("mongoose");

const salesReportSchema = mongoose.Schema({
  reportDateRange: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  totalSales: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
  itemsSold: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
      quantity: { type: Number, required: true },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("SalesReport", salesReportSchema);
