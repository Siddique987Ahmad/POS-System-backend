const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model')
const TransactionLog=require('../Models/transactionLog.Model')
//create transaction log
const createTransactionLog=asyncHandler(async(req,res)=>{
    try {
        const { transactionId, cashier, transactionType, transactionDetails, amount } = req.body;
        const user=await User.findById(cashier)
        // Validate required fields
        if (!transactionId  || !user || !transactionType || !transactionDetails || !amount) {
            return res.status(400).json({ error: "All fields are required." });
        }
const transactionLog=await TransactionLog.create({
 transactionId,
 cashier:user,
 transactionType,
 transactionDetails,
 amount
})
if (!transactionLog) {
    return res.status(404).json({error:"transaction log not created"})
}
res.status(200).json(transactionLog)

    } catch (error) {
        res.status(500).json({ error: "Failed to create transaction log", details: error.message });
    }
})
//get all transaction log or Get Transaction Logs by Type or Cashier (optional filters)
const getAllTransactionLog=asyncHandler(async(req,res)=>{
    try {
      const {transactionType,cashier}=req.query
      const query={}
      if(transactionType) query.transactionType=transactionType
      if(cashier) query.cashier=cashier
        const transactionLog=await TransactionLog.find(query)
        .populate('cashier')        
        if (!transactionLog) {
            return res.status(404).json({error:"transaction log not found"})
        }
        res.status(200).json(transactionLog)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all transaction log", details: error.message });
    }
})
//get transaction log by id
const getTransactionLogById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const transactionLog=await TransactionLog.findById(id)        
        if (!transactionLog) {
            return res.status(404).json({error:"transaction log not found"})
        }
        res.status(200).json(transactionLog)
    } catch (error) {
        res.status(500).json({ error: "Failed to get transaction log by id", details: error.message });
    }
})
//update transaction log
const updateTransactionLog=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { transactionDetails,amount } = req.body;
        const transactionLog=await TransactionLog.findByIdAndUpdate(
            id,
            {
             transactionDetails,
             amount
            },
            {
                new:true
            }
        )
        
        if (!transactionLog) {
            return res.status(404).json({error:"transaction log not updated"})
        }
        res.status(200).json(transactionLog)

    } catch (error) {
        res.status(500).json({ error: "Failed to update transaction log by id", details: error.message });
    }
})
//delete transaction log
const deleteTransactionLog=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const transactionLog=await TransactionLog.findByIdAndDelete(id)
        if (!transactionLog) {
            return res.status(404).json({error:"transaction log not deleted"})
        }
        res.status(200).json(transactionLog)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete transaction log by id", details: error.message });
    }
})

module.exports={createTransactionLog,getAllTransactionLog,getTransactionLogById,updateTransactionLog,deleteTransactionLog}