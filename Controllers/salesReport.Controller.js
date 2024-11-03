const asyncHandler=require('express-async-handler')
const Medicine=require('../Models/medicine.Model')
const SalesReport=require('../Models/salesReport.Model')
//create sales report
const createSalesReport=asyncHandler(async(req,res)=>{
    try {
        const {reportDateRange,totalSales,totalRevenue,itemsSold}=req.body
         if (!reportDateRange || !reportDateRange.startDate || !reportDateRange.endDate) {
            return res.status(400).json({ error: "Start and end dates for the report are required" });
         }
         if (!totalSales || !totalRevenue) {
            return res.status(400).json({ error: "total sales and total revenue for the report are required" });
         }
         if (!itemsSold || !Array.isArray(itemsSold) || itemsSold.length === 0) {
            return res.status(400).json({ error: "Items sold are required" });
          }
      
          // Validate each item in itemsSold and ensure medicines exist
          const validatedItemsSold = [];
          for (const item of itemsSold) {
            const medicine = await Medicine.findById(item.medicine);
            if (!medicine) {
              return res.status(404).json({ error: `Medicine with ID ${item.medicine} not found` });
            }
            validatedItemsSold.push({ medicine: item.medicine, quantity: item.quantity });
          }
      

const salesReport=await SalesReport.create({
    reportDateRange,
    totalSales,
    totalRevenue,
    itemsSold:validatedItemsSold
})
if (!salesReport) {
    return res.status(404).json({error:"sales report not created"})
}
res.status(200).json(salesReport)

    } catch (error) {
        res.status(500).json({ error: "Failed to create sales report", details: error.message });
    }
})
//get all sales report
const getAllSalesReport=asyncHandler(async(req,res)=>{
    try {
        const salesReport=await SalesReport.find()
        .populate('itemsSold')
        if (!salesReport) {
            return res.status(404).json({error:"sales reports not found"})
        }
        res.status(200).json(salesReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all sales report", details: error.message });
    }
})
//get sales report by id
const getSalesReportById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const salesReport=await SalesReport.findById(id)
        .populate('itemsSold')
        if (!salesReport) {
            return res.status(404).json({error:"sales report not found"})
        }
        res.status(200).json(salesReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to get sales report by id", details: error.message });
    }
})
//update sales report
const updateSalesReport=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const {reportDateRange,totalSales,totalRevenue,itemsSold}=req.body
        const salesReport=await SalesReport.findByIdAndUpdate(
            id,
            {
                reportDateRange,
                totalRevenue,
                totalSales,
                itemsSold
            },
            {
                new:true
            }
        )
        .populate('itemsSold')
        if (!salesReport) {
            return res.status(404).json({error:"sales report not updated"})
        }
        res.status(200).json(salesReport)

    } catch (error) {
        res.status(500).json({ error: "Failed to update sales report by id", details: error.message });
    }
})
//delete sales report
const deleteSalesReport=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const salesReport=await SalesReport.findByIdAndDelete(id)
        .populate('itemsSold')
        if (!salesReport) {
            return res.status(404).json({error:"sales report not deleted"})
        }
        res.status(200).json(salesReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete sales report by id", details: error.message });
    }
})

module.exports={createSalesReport,getAllSalesReport,getSalesReportById,updateSalesReport,deleteSalesReport}