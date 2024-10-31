const asyncHandler=require('express-async-handler')
const Medicine=require('../Models/medicine.Model')
const Supplier=require('../Models/supplier.Model')

//create medicine
const createMedicine=asyncHandler(async(req,res)=>{
     try {
        const {name,type,storageInstruction,supplier}=req.body
        const supplierid=await Supplier.findById(supplier)
        if (!supplierid) {
           return res.status(404).json("Supplier id not found")
        }
        const medicine=await Medicine.create({
           name,
           type,
           storageInstruction,
           supplier:supplierid
        })
        if (!medicine) {
           return res.status(404).json("Medicine not created")
        }
        res.status(200).json(medicine)
     } catch (error) {
        res.status(500).json(error)
     }
})
//get all medicine
const getAllMedicine=asyncHandler(async(req,res)=>{
    try {
        const medicine=await Medicine.find()
        if (!medicine) {
            return res.status(404).json("Medicines not found")
         }
         res.status(200).json(medicine)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get medicine by id
const getMedicineById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const medicine=await Medicine.findById(id).populate('supplier')
        if (!medicine) {
            return res.status(404).json("Medicine not found")
         }
         res.status(200).json(medicine)
    } catch (error) {
        res.status(500).json(error)
    }
})
//update medicine
const updateMedicine=asyncHandler(async(req,res)=>{
    try {
        const {name,type,storageInstruction,supplier}=req.body
        const {id}=req.params
        const medicine=await Medicine.findByIdAndUpdate(
            id,
            {name,type,storageInstruction,supplier},
            {new:true}
        )
        if (!medicine) {
            return res.status(404).json("Medicine not update")
         }
         res.status(200).json(medicine)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
//delete medicine
const deleteMedicine=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const medicine=await Medicine.findByIdAndDelete(id)
        if (!medicine) {
            return res.status(404).json("Medicine not deleted")
         }
         res.status(200).json(medicine)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports={createMedicine,getAllMedicine,getMedicineById,updateMedicine,deleteMedicine}