const asyncHandler=require('express-async-handler')
const Doctor=require('../Models/doctor.Model')

//create doctor
const createDoctor=asyncHandler(async(req,res)=>{
    try {
        const { name, contact, specialty } = req.body;
     if (!name || !contact) {
        return res.status(400).json("name and contact required")
       }

       const doctor=await Doctor.create({
       name,
       contact,
       specialty
    
       })
       if (!doctor) {
        return res.status(404).json("doctor not created")
       }
       res.status(200).json(doctor)
    } catch (error) {
        res.status(500).json({ error: "Failed to create doctor", details: error.message });
    }
})
//get a doctor by id
const getDoctorById=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     const doctor=await Doctor.findById(id)
     if (!doctor) {
        return res.status(404).json("doctor not found")
       }
       res.status(200).json(doctor)
   } catch (error) {
    res.status(500).json({ error: "Failed to get doctor", details: error.message });
   }
})
//update doctor by id
const updateDoctor=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { name, contact, specialty } = req.body;
       const doctor=await Doctor.findByIdAndUpdate(
        id,
        {
           name,
           contact,
           specialty
        },
        {
            new:true
        }
       )
       if (!doctor) {
        return res.status(404).json("doctor not updated")
       }
       res.status(200).json(doctor)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to update doctor", details: error.message });
    }
})
//delete doctor
const deleteDoctor=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const doctor=await Doctor.findByIdAndDelete(id)
        if (!doctor) {
            return res.status(404).json("doctor not deleted")
           }
           res.status(200).json(doctor)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to delete doctor", details: error.message });
    }
})

//get all doctors
const getAllDoctor=asyncHandler(async(req,res)=>{
    try {
        const doctor=await Doctor.find()
        if (!doctor) {
            return res.status(404).json("doctor not found")
           }
           res.status(200).json(doctor)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to get all doctor", details: error.message });

    }
})

module.exports={createDoctor,getDoctorById,updateDoctor,deleteDoctor,getAllDoctor}