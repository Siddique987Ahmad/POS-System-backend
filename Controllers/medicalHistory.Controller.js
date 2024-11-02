const asyncHandler=require('express-async-handler')
const Customer=require('../Models/customer.Model')
const MedicalHistory=require('../Models/medicalHistory.Model');

//create medical history
const createMedicalHistory=asyncHandler(async(req,res)=>{
    try {
        const { customer, condition, medications, allergies, notes } = req.body;
        const customerId=await Customer.findById(customer)
               if (!condition || !customerId) {
        return res.status(400).json("condition and customer required")
       }

       const medicalHistory=await MedicalHistory.create({
       customer:customerId,
       condition,
       medications,
       allergies,
       notes
    
       })
       if (!medicalHistory) {
        return res.status(404).json("medical history not created")
       }
       res.status(200).json(medicalHistory)
    } catch (error) {
        res.status(500).json({ error: "Failed to create medical history", details: error.message });
    }
})
//get a medical history by id
const getMedicalHistoryById=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     const medicalHistory=await MedicalHistory.findById(id).populate('customer')
     if (!medicalHistory) {
        return res.status(404).json("medical history not found")
       }
       res.status(200).json(medicalHistory)
   } catch (error) {
    res.status(500).json({ error: "Failed to get medical history", details: error.message });
   }
})
//update medical history by id
const updateMedicalHistory=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { customer, condition, medications, allergies, notes } = req.body;
       const medicalHistory=await MedicalHistory.findByIdAndUpdate(
        id,
        {
           customer,
           condition,
           medications,
           allergies,
           notes
        },
        {
            new:true
        }
       )
       if (!medicalHistory) {
        return res.status(404).json("medical history not updated")
       }
       res.status(200).json(medicalHistory)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to update medical history", details: error.message });
    }
})
//delete medical history
const deleteMedicalHistory=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const medicalHistory=await MedicalHistory.findByIdAndDelete(id)
        if (!medicalHistory) {
            return res.status(404).json("medical history not deleted")
           }
           res.status(200).json(medicalHistory)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to delete medical history", details: error.message });
    }
})

//get all medical histories
const getAllMedicalHistory=asyncHandler(async(req,res)=>{
    try {
        const medicalHistory=await MedicalHistory.find().populate('customer')
        if (!medicalHistory) {
            return res.status(404).json("medical histories not found")
           }
           res.status(200).json(medicalHistory)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to get all medical histories", details: error.message });

    }
})

module.exports={createMedicalHistory,getMedicalHistoryById,updateMedicalHistory,deleteMedicalHistory,getAllMedicalHistory}