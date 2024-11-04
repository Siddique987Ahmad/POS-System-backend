const asyncHandler=require('express-async-handler')
const PurchaseOrder=require('../Models/purchaseOrder.Model')
const OrderTracking=require('../Models/orderTracking.Model')
//create order tracking
const createOrderTracking=asyncHandler(async(req,res)=>{
    try {
        const { order, status } = req.body;
        const purchaseOrder=await PurchaseOrder.findById(order)
        if (!purchaseOrder) {
            return res.status(404).json({ error: "Purchase order not found" });
          }
const orderTracking=await OrderTracking.create({
   order:purchaseOrder,
   status,
   statusUpdated:[{status}]
})
if (!orderTracking) {
    return res.status(404).json({error:"order tracking not created"})
}
res.status(200).json(orderTracking)

    } catch (error) {
        res.status(500).json({ error: "Failed to create order tracking", details: error.message });
    }
})
//get all order tracking
const getAllOrderTracking=asyncHandler(async(req,res)=>{
    try {
        const orderTracking=await OrderTracking.find()
        .populate('order')
        .sort({ createdAt: -1 });
        if (!orderTracking) {
            return res.status(404).json({error:"order tracking not found"})
        }
        res.status(200).json(orderTracking)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all order tracking", details: error.message });
    }
})
//get order tracking by id
const getOrderTrackingById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const orderTracking=await OrderTracking.findById(id)
        .populate('order')
        if (!orderTracking) {
            return res.status(404).json({error:"order tracking not found"})
        }
        res.status(200).json(orderTracking)
    } catch (error) {
        res.status(500).json({ error: "Failed to get order tracking by id", details: error.message });
    }
})
//update purchase order
const updateOrderTracking=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { status } = req.body;
        if (!["Pending","Received","Processed"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }
        const orderTracking=await OrderTracking.findByIdAndUpdate(
            id,
            {
                $set: { status },
                $push: { statusUpdates: { status } },
            },
            {
                new:true
            }
        )
        if (!orderTracking) {
            return res.status(404).json({error:"order tracking not updated"})
        }
        res.status(200).json(orderTracking)

    } catch (error) {
        res.status(500).json({ error: "Failed to update order tracking by id", details: error.message });
    }
})
//delete order tracking
const deleteOrderTracking=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const orderTracking=await OrderTracking.findByIdAndDelete(id)
        if (!orderTracking) {
            return res.status(404).json({error:"order tracking not deleted"})
        }
        res.status(200).json(orderTracking)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order tracking by id", details: error.message });
    }
})

module.exports={createOrderTracking,getAllOrderTracking,getOrderTrackingById,updateOrderTracking,deleteOrderTracking}