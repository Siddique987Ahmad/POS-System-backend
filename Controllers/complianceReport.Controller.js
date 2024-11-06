const asyncHandler=require('express-async-handler')
const ComplianceReport=require('../Models/complianceReport.Model')
//create compliance report
const createComplianceReport=asyncHandler(async(req,res)=>{
    try {
        const { reportNumber, reportPeriod, auditor, findings, status } = req.body;
        // Validate required fields
        if (!reportNumber  || !reportPeriod || !auditor || !status) {
            return res.status(400).json({ error: "All fields are required." });
        }
const complianceReport=await ComplianceReport.create({
 reportNumber,
 reportPeriod,
 auditor,
 findings,
 status
})
if (!complianceReport) {
    return res.status(404).json({error:"compliance report not created"})
}
res.status(200).json(complianceReport)

    } catch (error) {
        res.status(500).json({ error: "Failed to create compliance report", details: error.message });
    }
})
//get all compliance report or get through using status
const getAllComplianceReport=asyncHandler(async(req,res)=>{
    try {
      const {status}=req.query
      const query=status ? {status} : {}
        const complianceReport=await ComplianceReport.find(query)
        if (!complianceReport) {
            return res.status(404).json({error:"compliance report not found"})
        }
        res.status(200).json(complianceReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all compliance report", details: error.message });
    }
})
//get compliance report by id
const getComplianceReportById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const complianceReport=await ComplianceReport.findById(id)        
        if (!complianceReport) {
            return res.status(404).json({error:"compliance report not found"})
        }
        res.status(200).json(complianceReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to get compliance report by id", details: error.message });
    }
})
//update compliance report
const updateComplianceReport=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { reportNumber, reportPeriod, auditor, findings, status } = req.body;
        const complianceReport=await ComplianceReport.findByIdAndUpdate(
            id,
            {
             reportNumber,
             reportPeriod,
             status,
             findings,
             auditor
            },
            {
                new:true, runValidators:true
            }
        )
        
        if (!complianceReport) {
            return res.status(404).json({error:"compliance report not updated"})
        }
        res.status(200).json(complianceReport)

    } catch (error) {
        res.status(500).json({ error: "Failed to update compliance report by id", details: error.message });
    }
})
//delete compliance report
const deleteComplianceReport=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const complianceReport=await ComplianceReport.findByIdAndDelete(id)
        if (!complianceReport) {
            return res.status(404).json({error:"compliance report not deleted"})
        }
        res.status(200).json(complianceReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete compliance report by id", details: error.message });
    }
})

module.exports={createComplianceReport,getAllComplianceReport,getComplianceReportById,updateComplianceReport,deleteComplianceReport}