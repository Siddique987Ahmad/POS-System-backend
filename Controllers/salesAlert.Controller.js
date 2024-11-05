const asyncHandler=require('express-async-handler')
const SalesTransaction=require('../Models/salesTransaction.Model')
const SalesAlert=require('../Models/salesAlert.Model')
//create sales alert
const createSalesAlert=asyncHandler(async(req,res)=>{
    try {
        const { type, transactionId, amount, message,alertDate,isResolved } = req.body;
        const transaction=await SalesTransaction.findById(transactionId)
         // Validate required fields
        if (!type || !transaction || !message || !amount) {
            return res.status(400).json({ error: "All fields are required." });
        }
const salesAlert=await SalesAlert.create({
  type,
  transactionId:transaction,
  message,
  amount,
  alertDate,
  isResolved
})
if (!salesAlert) {
    return res.status(404).json({error:"sales alert not created"})
}
res.status(200).json(salesAlert)

    } catch (error) {
        res.status(500).json({ error: "Failed to create sales alert", details: error.message });
    }
})
//get all sales alert
const getAllSalesAlert=asyncHandler(async(req,res)=>{
    try {
        const {type,isResolved}=req.query
        const query={}
        if(type) query.type=type
        if(isResolved) query.isResolved=isResolved==='true'
        const salesAlert=await SalesAlert.find(query)
        .populate('transactionId')
        
        if (!salesAlert) {
            return res.status(404).json({error:"sales alerts not found"})
        }
        res.status(200).json(salesAlert)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all sales alert", details: error.message });
    }
})
//get sales alert by id
const getSalesAlertById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const salesAlert=await SalesAlert.findById(id)
        .populate('transactionId')
        
        if (!salesAlert) {
            return res.status(404).json({error:"sales alert not found"})
        }
        res.status(200).json(salesAlert)
    } catch (error) {
        res.status(500).json({ error: "Failed to get sales alert by id", details: error.message });
    }
})
//update sales alert
const updateSalesAlert=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { isResolved } = req.body;
        const salesAlert=await SalesAlert.findByIdAndUpdate(
            id,
            {
             isResolved
            },
            {
                new:true
            }
        )
        .populate('transactionId')
        
        if (!salesAlert) {
            return res.status(404).json({error:"sales alert not updated"})
        }
        res.status(200).json(salesAlert)

    } catch (error) {
        res.status(500).json({ error: "Failed to update sales alert by id", details: error.message });
    }
})
//delete sales alert
const deleteSalesAlert=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const salesAlert=await SalesAlert.findByIdAndDelete(id)
        .populate('transactionId')
        if (!salesAlert) {
            return res.status(404).json({error:"sales alert not deleted"})
        }
        res.status(200).json(salesAlert)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete sales alert by id", details: error.message });
    }
})

module.exports={createSalesAlert,getAllSalesAlert,getSalesAlertById,updateSalesAlert,deleteSalesAlert}