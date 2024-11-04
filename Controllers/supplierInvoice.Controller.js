const asyncHandler=require('express-async-handler')
const Supplier=require('../Models/supplier.Model')
const PurchaseOrder=require('../Models/purchaseOrder.Model')
const SupplierInvoice=require('../Models/supplierInvoice.Model')
//create supplier invoice
const createSupplierInvoice=asyncHandler(async(req,res)=>{
    try {
        const { invoiceNumber, supplier, purchaseOrder, invoiceDate, totalAmount, linkedToInventoryUpdate } = req.body;
        const supplierId=await Supplier.findById(supplier)
        const purchaseOrderId=await PurchaseOrder.findById(purchaseOrder)
         // Validate required fields
        if (!supplierId || !purchaseOrderId || !invoiceNumber || !invoiceDate || !totalAmount) {
            return res.status(400).json({ error: "All fields are required." });
        }
const supplierInvoice=await SupplierInvoice.create({
   invoiceNumber,
   supplier:supplierId,
   purchaseOrder:purchaseOrderId,
   invoiceDate,
   totalAmount,
   linkedToInventoryUpdate
})
if (!supplierInvoice) {
    return res.status(404).json({error:"supplier invoice not created"})
}
res.status(200).json(supplierInvoice)

    } catch (error) {
        res.status(500).json({ error: "Failed to create supplier invoice", details: error.message });
    }
})
//get all supplier invoice
const getAllSupplierInvoice=asyncHandler(async(req,res)=>{
    try {
        const supplierInvoice=await SupplierInvoice.find()
        .populate('purchaseOrder')
        .populate('supplier')
        if (!supplierInvoice) {
            return res.status(404).json({error:"supplier invoices not found"})
        }
        res.status(200).json(supplierInvoice)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all supplier invoice", details: error.message });
    }
})
//get supplier invoice by id
const getSupplierInvoiceById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const supplierInvoice=await SupplierInvoice.findById(id)
        .populate('purchaseOrder')
        .populate('supplier')
        if (!supplierInvoice) {
            return res.status(404).json({error:"supplier invoice not found"})
        }
        res.status(200).json(supplierInvoice)
    } catch (error) {
        res.status(500).json({ error: "Failed to get supplier invoice by id", details: error.message });
    }
})
//update supplier invoice
const updateSupplierInvoice=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { invoiceNumber, supplier, purchaseOrder, invoiceDate, totalAmount, linkedToInventoryUpdate } = req.body;
        const supplierInvoice=await SupplierInvoice.findByIdAndUpdate(
            id,
            {
             invoiceNumber,
             supplier,
             purchaseOrder,
             invoiceDate,
             totalAmount,
             linkedToInventoryUpdate
            },
            {
                new:true
            }
        )
        .populate('purchaseOrder')
        .populate('supplier')
        if (!supplierInvoice) {
            return res.status(404).json({error:"supplier invoice not updated"})
        }
        res.status(200).json(supplierInvoice)

    } catch (error) {
        res.status(500).json({ error: "Failed to update supplier invoice by id", details: error.message });
    }
})
//delete supplier invoice
const deleteSupplierInvoice=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const supplierInvoice=await SupplierInvoice.findByIdAndDelete(id)
        .populate('purchaseOrder')
        .populate('supplier')
        if (!supplierInvoice) {
            return res.status(404).json({error:"supplier invoice not deleted"})
        }
        res.status(200).json(supplierInvoice)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete supplier invoice by id", details: error.message });
    }
})

module.exports={createSupplierInvoice,getAllSupplierInvoice,getSupplierInvoiceById,updateSupplierInvoice,deleteSupplierInvoice}