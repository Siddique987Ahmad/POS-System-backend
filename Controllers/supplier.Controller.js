const asyncHandler=require('express-async-handler')
const Supplier=require('../Models/supplier.Model')

//create supplier
const createSupplier=asyncHandler(async(req,res)=>{
   try {
    const {name,contactInfo,contractDetail}=req.body
    if (!name || !contractDetail) {
        return res.status(400).json("fields required")
    }
    if (!contactInfo.phone || !contactInfo.email || !contactInfo.address) {
        return res.status(400).json("contact info fields required")
    }
const supplier=await Supplier.create({
    name,
    contactInfo,
    contractDetail
})
if (!supplier) {
    return res.status(404).json("Supplier not created")
}
res.status(200).json(supplier)
   } catch (error) {
    return res.status(500).json(error)
   }
   
})
//get all supplier
const getAllSupplier=asyncHandler(async(req,res)=>{
    try {
        const supplier=await Supplier.find()
        if (!supplier) {
            return res.status(404).json("Suppliers not found")
        }
        res.status(200).json(supplier)
    } catch (error) {
        return res.status(500).json(error)
    }
})
//get supplier by id
const getSupplierById=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     const supplier=await Supplier.findById(id)
     if (!supplier) {
         return res.status(404).json("Supplier not found")
     }
     res.status(200).json(supplier)
   } catch (error) {
    return res.status(500).json(error)
   }
})
//update supplier by id
const updateSupplier=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     const {name,contactInfo,contractDetail}=req.body
     const supplier=await Supplier.findByIdAndUpdate(
         id,
         {name,contactInfo,contractDetail},
         { new:true}
     )
     if (!supplier) {
         return res.status(404).json("Supplier not updated")
     }
     res.status(200).json(supplier)
   } catch (error) {
    return res.status(500).json(error)
   }
})
//delete supplier
const deleteSupplier=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const supplier=await Supplier.findByIdAndDelete(id)
        if (!supplier) {
            return res.status(404).json("Supplier not deleted")
        }
        res.status(200).json(supplier)
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports={createSupplier,getAllSupplier,getSupplierById,updateSupplier,deleteSupplier}