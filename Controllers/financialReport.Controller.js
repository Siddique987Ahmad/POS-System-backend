const asyncHandler=require('express-async-handler')
const FinancialReport=require('../Models/financialReport.Model')

//create financial report
const createFinancialReport=asyncHandler(async(req,res)=>{
    try {
        const { reportDateRange, totalRevenue, totalExpenses, totalTax, totalDiscounts } = req.body;

    if (!reportDateRange || !reportDateRange.startDate || !reportDateRange.endDate) {
        return res.status(400).json({ error: "Start and end dates for the report are required" });
    }
    if (!totalRevenue || !totalExpenses || !totalTax || !totalDiscounts) {
        return res.status(400).json({ error: "total revenue,total expense,total tax and total discounts for the report are required" });
    }
    
    const financialReport=await FinancialReport.create(
        {
            reportDateRange,
            totalDiscounts,
            totalExpenses,
            totalRevenue,
            totalTax,
        }
    )
    if (!financialReport) {
        return res.status(404).json({error:"financial report not created"})
    }
res.status(200).json(financialReport)

    } catch (error) {
        res.status(500).json({ error: "Failed to create financial report", details: error.message });

    }
})
//get all financial report
const getAllFinancialReport=asyncHandler(async(req,res)=>{
    try {
        const {startDate,endDate}=req.query
        let query={}
        if (startDate && endDate) {
            query={
                "reportDateRange.startDate":{$gte: new Date(startDate)},
                "reportDateRange.endDate":{$lte: new Date(endDate)}
            }
        }
        const financialReport=await FinancialReport.find(query)
        if (!financialReport) {
            return res.status(404).json({error:"financial report not get"})
        }
    res.status(200).json(financialReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to get financial report", details: error.message });
    }
})
//get financial report by id
const getFinancialReportById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const financialReport=await FinancialReport.findById(id)
        if (!financialReport) {
            return res.status(404).json({error:"financial report not found"})
        }
    res.status(200).json(financialReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to get financial report", details: error.message });
    }
})
//update financial report
const updateFinancialReport=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { reportDateRange, totalRevenue, totalExpenses, totalTax, totalDiscounts } = req.body;
        const financialReport=await FinancialReport.findByIdAndUpdate(
            id,
            {
                totalDiscounts,
                totalExpenses,
                totalRevenue,
                totalTax,
                reportDateRange
            },
            {
                new:true
            }
        )
        if (!financialReport) {
            return res.status(404).json({error:"financial report not updated"})
        }
    res.status(200).json(financialReport)

    } catch (error) {
        res.status(500).json({ error: "Failed to update financial report", details: error.message });
    }
})
//delete financial report
const deleteFinancialReport=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const financialReport=await FinancialReport.findByIdAndDelete(id)
        if (!financialReport) {
            return res.status(404).json({error:"financial report not delete"})
        }
    res.status(200).json(financialReport)

    } catch (error) {
        res.status(500).json({ error: "Failed to delete financial report", details: error.message });
    }
})


module.exports={createFinancialReport,getAllFinancialReport,getFinancialReportById,updateFinancialReport,deleteFinancialReport}