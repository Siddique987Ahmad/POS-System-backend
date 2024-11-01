const asyncHandler=require('express-async-handler')
const PaymentMethod=require('../Models/paymentMethod.Model')
//create payment method
const createPaymentMethod=asyncHandler(async(req,res)=>{
    try {
        const { methodType, details } = req.body;
        
        if (!methodType) {
            return res.status(400).json("not found method type")
        }
        const paymentMethod=await PaymentMethod.create({
            methodType,
            details
        })
        if (!paymentMethod) {
            return res.status(400).json("payment method not created")
        }
        res.status(200).json(paymentMethod)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get all payment methods
const getAllPaymentMethod=asyncHandler(async(req,res)=>{
    try {
        const paymentMethod=await PaymentMethod.find()
        if (!paymentMethod) {
            return res.status(400).json("payment methods not found")
        }
        res.status(200).json(paymentMethod)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get payment method by id
const getPaymentMethodById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const paymentMethod=await PaymentMethod.findById(id)
        if (!paymentMethod) {
            return res.status(400).json("payment method not found")
        }
        res.status(200).json(paymentMethod)
    } catch (error) {
        res.status(500).json(error)
    }
})
//update payment method
const updatePaymentMethod=asyncHandler(async(req,res)=>{
    try {
        const { methodType,details } = req.body;
        const {id}=req.params
        const paymentMethod=await PaymentMethod.findByIdAndUpdate(
            id,
            {
                methodType,
                details
            },
            {
                new:true
            }
        )
        if (!paymentMethod) {
            return res.status(400).json("payment method not updated")
        }
        res.status(200).json(paymentMethod)
    } catch (error) {
        res.status(500).json(error)
    }

})
//delete payment method
const deletePaymentMethod=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     const paymentMethod=await PaymentMethod.findByIdAndDelete(id)
     if (!paymentMethod) {
        return res.status(400).json("payment method not deleted")
    }
    res.status(200).json(paymentMethod)
   } catch (error) {
    res.status(500).json(error)
   }
})


module.exports={createPaymentMethod,getAllPaymentMethod,getPaymentMethodById,updatePaymentMethod,deletePaymentMethod}