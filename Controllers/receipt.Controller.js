const asyncHandler=require('express-async-handler')
const SalesTransaction=require('../Models/salesTransaction.Model')
const Receipt=require('../Models/receipt.Model')

//create receipt

const createReceipt=asyncHandler(async(req,res)=>{
   
    try {
        const { transaction, receiptDetails, taxes, paymentMode } = req.body;
            const salesTransaction=await SalesTransaction.findById(transaction)
        if (!salesTransaction || !taxes || !paymentMode) {
            return res.status(400).json("fields are required")
        }
    
        const receipt=await Receipt.create({
            transaction:salesTransaction,
            receiptDetails,
            taxes,
            paymentMode
        })
        if (!receipt) {
            return res.status(404).json("receipt not created")
        }
        res.status(200).json(receipt)
    } catch (error) {
        res.status(500).json({ error: "Failed to create receipt", details: error.message });
    }
})
//get all receipt
const getAllReceipt=asyncHandler(async(req,res)=>{
   try {
     const receipt=await Receipt.find()
     if (!receipt) {
         return res.status(404).json("receipts not found")
     }
     res.status(200).json(receipt)
   } catch (error) {
    res.status(500).json({ error: "Failed to get all receipt", details: error.message });
   }
})
//get receipt by orderId
const getReceiptById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const receipt=await Receipt.findById(id)
        if (!receipt) {
            return res.status(404).json("receipt not found")
        }
        res.status(200).json(receipt)
    } catch (error) {
        res.status(500).json({ error: "Failed to get receipt", details: error.message });
    }
})
//update receipt
const updateReceipt=asyncHandler(async(req,res)=>{
    try {
        const {transaction, receiptDetails, taxes, paymentMode}=req.body
        const {id}=req.params
        const receipt=await Receipt.findByIdAndUpdate(
            id,
            {
                transaction,
                receiptDetails,
                taxes,
                paymentMode
            },{
                new:true
            }
        )
        if (!receipt) {
            return res.status(404).json("receipt not updated")
        }
        res.status(200).json(receipt)
    } catch (error) {
        res.status(500).json({ error: "Failed to update receipt", details: error.message });
    }
})
//delete receipt
const deleteReceipt=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const receipt=await Receipt.findByIdAndDelete(id)
        if (!receipt) {
            return res.status(404).json("receipt not deleted")
        }
        res.status(200).json(receipt)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete receipt", details: error.message });
    }
})

module.exports={createReceipt,getAllReceipt,getReceiptById,updateReceipt,deleteReceipt}