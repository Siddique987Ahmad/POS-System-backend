const asyncHandler=require('express-async-handler')
const Medicine=require('../Models/medicine.Model')
const Supplier=require('../Models/supplier.Model')
const OrderHistory=require('../Models/orderHistory.Model')

//create order history

const createOrderHistory=asyncHandler(async(req,res)=>{
   
    const {medicine,supplier,orderId,quantity,status}=req.body
    const medicineId=await Medicine.findById(medicine)
    const supplierId=await Supplier.findById(supplier)
    if (!medicineId || !supplierId) {
        return res.status(400).json("medicine and supplier id required")
    }
    if (!orderId || !quantity) {
        return res.status(400).json("fields are required")
    }

    const orderHistory=await OrderHistory.create({
        medicine:medicineId,
        supplier:supplierId,
        orderId,
        quantity,
        status
    })
    if (!orderHistory) {
        return res.status(404).json("order history not created")
    }
    res.status(200).json(orderHistory)
})
//get all order history
const getAllOrderHistory=asyncHandler(async(req,res)=>{
    const orderHistory=await OrderHistory.find().populate('medicine').populate('supplier')
    if (!orderHistory) {
        return res.status(404).json("order histories not found")
    }
    res.status(200).json(orderHistory)
})
//get order history by orderId
const getOrderHistoryById=asyncHandler(async(req,res)=>{
    const {orderId}=req.params
    const orderHistory=await OrderHistory.findOne({orderId})
    if (!orderHistory) {
        return res.status(404).json("order history not found")
    }
    res.status(200).json(orderHistory)
})
//update order history
const updateOrderHistory=asyncHandler(async(req,res)=>{
    const {medicine,supplier,quantity,status}=req.body
    const {orderId}=req.params
    const orderHistory=await OrderHistory.findOneAndUpdate(
        {orderId},
        {
            medicine,
            supplier,
            quantity,
            status
        },{
            new:true
        }
    )
    if (!orderHistory) {
        return res.status(404).json("order history not updated")
    }
    res.status(200).json(orderHistory)
})
//delete order history
const deleteOrderHistory=asyncHandler(async(req,res)=>{
    const {orderId}=req.params
    const orderHistory=await OrderHistory.findOneAndDelete({orderId})
    if (!orderHistory) {
        return res.status(404).json("order history not deleted")
    }
    res.status(200).json(orderHistory)
})

module.exports={createOrderHistory,getAllOrderHistory,getOrderHistoryById,updateOrderHistory,deleteOrderHistory}