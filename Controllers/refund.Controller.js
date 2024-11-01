const asyncHandler=require('express-async-handler')
const SalesTransaction=require('../Models/salesTransaction.Model')
const Medicine=require('../Models/medicine.Model')
const Refund=require('../Models/refund.Model')
//create refund

const createRefund=asyncHandler(async(req,res)=>{
   
    try {
        const { originalTransaction, itemsReturned, refundAmount, status } = req.body;            const salesTransaction=await SalesTransaction.findById(transaction)
        if (!originalTransaction || !itemsReturned || !refundAmount) {
            return res.status(400).json("fields are required")
        }
        const saleTransaction=await SalesTransaction.findById(originalTransaction)
        if (!saleTransaction) {
            return res.status(404).json("sales transaction id not found")
        }
    
     const formattedItems=await Promise.all(
        itemsReturned.map(async (item)=>{
            const medicine=await Medicine.findById(item.item)
            if (!medicine) {
                throw new Error(`Medicine with ID ${item.item} not found`);
              }
              return{
                item:item.item,
                quantity:item.quantity
              }
        })
     )


        const refund=await Refund.create({
            originalTransaction,
            itemsReturned:formattedItems,
            status,
            refundAmount

        })
        if (!refund) {
            return res.status(404).json("refund not created")
        }
        res.status(200).json(refund)
    } catch (error) {
        res.status(500).json({ error: "Failed to create refund", details: error.message });
    }
})
//get all refund
const getAllRefund=asyncHandler(async(req,res)=>{
   try {
     const refund=await Refund.find().populate("originalTransaction").populate("itemsReturned.item")
     if (!refund) {
         return res.status(404).json("refunds not found")
     }
     res.status(200).json(refund)
   } catch (error) {
    res.status(500).json({ error: "Failed to get all refund", details: error.message });
   }
})
//get refund by orderId
const getRefundById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const refund=await Refund.findById(id).populate("originalTransaction").populate("itemsReturned.item")
        if (!refund) {
            return res.status(404).json("refund not found")
        }
        res.status(200).json(refund)
    } catch (error) {
        res.status(500).json({ error: "Failed to get refund", details: error.message });
    }
})
//update refund
const updateRefund=asyncHandler(async(req,res)=>{
    try {
        const { originalTransaction, itemsReturned, refundAmount, status } = req.body;            const salesTransaction=await SalesTransaction.findById(transaction)
        const {id}=req.params
        const refund=await Refund.findByIdAndUpdate(
            id,
            {
               originalTransaction,
               itemsReturned,
               refundAmount,
               status
            },{
                new:true
            }
        )
        if (!refund) {
            return res.status(404).json("refund not updated")
        }
        res.status(200).json(refund)
    } catch (error) {
        res.status(500).json({ error: "Failed to update refund", details: error.message });
    }
})
//delete refund
const deleteRefund=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const refund=await Refund.findByIdAndDelete(id)
        if (!refund) {
            return res.status(404).json("refund not deleted")
        }
        res.status(200).json(refund)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete refund", details: error.message });
    }
})

module.exports={createRefund,getAllRefund,getRefundById,updateRefund,deleteRefund}