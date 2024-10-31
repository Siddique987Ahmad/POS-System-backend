const asyncHandler=require('express-async-handler')
const Medicine=require('../Models/medicine.Model')
const Batch=require('../Models/batch.Model')
//create batch
const createBatch=asyncHandler(async(req,res)=>{
    try {
        const { medicine, batchNumber, expiryDate, quantity } = req.body;
        const medicineId=await Medicine.findById(medicine)
        if (!medicineId) {
            return res.status(400).json("medicine id not found")
        }
        if (!batchNumber || !expiryDate || !quantity) {
            return res.status(400).json("All fields are required")
        }
        const batch=await Batch.create({
            medicine:medicineId,
            batchNumber,
            expiryDate,
            quantity
        })
        if (!batch) {
            return res.status(400).json("batch not created")
        }
        res.status(200).json(batch)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get all batch
const getAllBatch=asyncHandler(async(req,res)=>{
    try {
        const batch=await Batch.find().populate("medicine")
        if (!batch) {
            return res.status(400).json("batches not found")
        }
        res.status(200).json(batch)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get batch by id
const getBatchById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const batch=await Batch.findById(id)
        if (!batch) {
            return res.status(400).json("batch not found")
        }
        res.status(200).json(batch)
    } catch (error) {
        res.status(500).json(error)
    }
})
//update batch
const updateBatch=asyncHandler(async(req,res)=>{
    try {
        const { batchNumber, expiryDate, quantity } = req.body;
        const {id}=req.params
        const batch=await Batch.findByIdAndUpdate(
            id,
            {
                batchNumber,
                expiryDate,
                quantity
            },
            {
                new:true
            }
        )
        if (!batch) {
            return res.status(400).json("batch not updated")
        }
        res.status(200).json(batch)
    } catch (error) {
        res.status(500).json(error)
    }

})
//delete batch
const deleteBatch=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     const batch=await Batch.findByIdAndDelete(id)
     if (!batch) {
        return res.status(400).json("batch not deleted")
    }
    res.status(200).json(batch)
   } catch (error) {
    res.status(500).json(error)
   }
})


module.exports={createBatch,getAllBatch,getBatchById,updateBatch,deleteBatch}