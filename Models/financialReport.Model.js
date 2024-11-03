const mongoose = require("mongoose");
const financialReportSchema = mongoose.Schema({
    reportDateRange: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    totalRevenue: { type: Number, required: true },
    totalExpenses: { type: Number, required: true },
    totalTax: { type: Number, required: true },
    totalDiscounts: { type: Number, required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model("FinancialReport", financialReportSchema);
  