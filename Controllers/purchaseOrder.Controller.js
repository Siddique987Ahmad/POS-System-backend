const asyncHandler=require('express-async-handler')
const Medicine=require('../Models/medicine.Model')
const Supplier=require('../Models/supplier.Model')
const PurchaseOrder=require('../Models/purchaseOrder.Model')
//create purchase order
const createPurchaseOrder=asyncHandler(async(req,res)=>{
    try {
        const { orderNumber, supplier, items, totalAmount } = req.body;
        const supplierId=await Supplier.findById(supplier)
         // Validate required fields
  if (!orderNumber || !supplierId || !items || items.length === 0 || !totalAmount) {
    return res.status(400).json({ error: "All fields are required." });
  }
          // Validate each item in items and ensure medicines exist
          const validatedItems = [];
          for (const item of items) {
            const medicine = await Medicine.findById(item.medicine);
            if (!medicine) {
              return res.status(404).json({ error: `Medicine with ID ${item.medicine} not found` });
            }
            validatedItems.push({ medicine: item.medicine, quantity: item.quantity,unitPrice:item.unitPrice });
          }
         

const purchaseOrder=await PurchaseOrder.create({
   orderNumber,
   supplier:supplierId,
   items:validatedItems,
   totalAmount
})
if (!purchaseOrder) {
    return res.status(404).json({error:"purchase order not created"})
}
res.status(200).json(purchaseOrder)

    } catch (error) {
        res.status(500).json({ error: "Failed to create purchase order", details: error.message });
    }
})
//get all purchase order
const getAllPurchaseOrder=asyncHandler(async(req,res)=>{
    try {
        const purchaseOrder=await PurchaseOrder.find()
        .populate('items.medicine')
        .populate('supplier')
        if (!purchaseOrder) {
            return res.status(404).json({error:"purchase orders not found"})
        }
        res.status(200).json(purchaseOrder)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all purchase order", details: error.message });
    }
})
//get purchase order report by id
const getPurchaseOrderById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const purchaseOrder=await PurchaseOrder.findById(id)
        .populate('items.medicine')
        .populate('supplier')
        if (!purchaseOrder) {
            return res.status(404).json({error:"purchase order not found"})
        }
        res.status(200).json(purchaseOrder)
    } catch (error) {
        res.status(500).json({ error: "Failed to get purchase order by id", details: error.message });
    }
})
//update purchase order
const updatePurchaseOrder=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { orderNumber, supplier, items, totalAmount } = req.body;
        const purchaseOrder=await PurchaseOrder.findByIdAndUpdate(
            id,
            {
              orderNumber,
              supplier,
              items,
              totalAmount
            },
            {
                new:true
            }
        )
        .populate('items.medicine')
        .populate('supplier')
        if (!purchaseOrder) {
            return res.status(404).json({error:"purchase order not updated"})
        }
        res.status(200).json(purchaseOrder)

    } catch (error) {
        res.status(500).json({ error: "Failed to update purchase order by id", details: error.message });
    }
})
//delete purchase order
const deletePurchaseOrder=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const purchaseOrder=await PurchaseOrder.findByIdAndDelete(id)
        .populate('items.medicine')
        .populate('supplier')
        if (!purchaseOrder) {
            return res.status(404).json({error:"purchase order not deleted"})
        }
        res.status(200).json(purchaseOrder)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete purchase order by id", details: error.message });
    }
})

module.exports={createPurchaseOrder,getAllPurchaseOrder,getPurchaseOrderById,updatePurchaseOrder,deletePurchaseOrder}