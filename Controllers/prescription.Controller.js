const asyncHandler=require('express-async-handler')
const Doctor=require('../Models/doctor.Model')
const Prescription=require('../Models/prescription.Model')
const Customer=require('../Models/customer.Model')
const Medicine=require('../Models/medicine.Model')
const SalesTransaction=require('../Models/salesTransaction.Model')
const mongoose=require('mongoose')

//create Prescription
const createPrescription=asyncHandler(async(req,res)=>{
    try {
        const { customer, doctor, medicines, prescriptionDate, isValidated, transaction } = req.body;
           const doctorId=await Doctor.findById(doctor)
           const customerId=await Customer.findById(customer)
           const transactionId=await SalesTransaction.findById(transaction)
           if (!customerId || !doctorId || !medicines || medicines.length === 0) {
            return res.status(400).json({ error: "Customer, doctor, and medicines are required" });
          }
          // Convert medicine IDs to ObjectId in medicines array
    const processedMedicines = medicines.map(item => {
        if (!mongoose.Types.ObjectId.isValid(item.medicine)) {
            throw new Error(`Invalid medicine ID: ${item.medicine}`);
          }
        
      return  {

        ...item,
        medicine: new mongoose.Types.ObjectId(item.medicine),
      }});
       const prescription=await Prescription.create({
      customer:customerId,
      doctor:doctorId,
      prescriptionDate,
      isValidated,
      transaction:transactionId,
      medicines:processedMedicines
    
       })
       if (!prescription) {
        return res.status(404).json("Prescription not created")
       }
       res.status(200).json(prescription)
    } catch (error) {
        res.status(500).json({ error: "Failed to create Prescription", details: error.message });
    }
})
//get a Prescription by id
const getPrescriptionById=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     const prescription=await Prescription.findById(id)
     .populate("customer")
     .populate("doctor")
     .populate("medicines.medicine")
     .populate("transaction");
     if (!prescription) {
        return res.status(404).json("Prescription not found")
       }
       res.status(200).json(prescription)
   } catch (error) {
    res.status(500).json({ error: "Failed to get Prescription", details: error.message });
   }
})
//update Prescription by id
const updatePrescription=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { customer, doctor, medicines, prescriptionDate, isValidated, transaction } = req.body;
       const prescription=await Prescription.findByIdAndUpdate(
        id,
        {
          customer,
          doctor,
          medicines,
          isValidated,
          transaction,
          prescriptionDate
        },
        {
            new:true
        }
       )
       .populate("customer")
       .populate("doctor")
       .populate("medicines.medicine")
       .populate("transaction")
       if (!prescription) {
        return res.status(404).json("Prescription not updated")
       }
       res.status(200).json(prescription)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to update Prescription", details: error.message });
    }
})
//delete Prescription
const deletePrescription=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const prescription=await Prescription.findByIdAndDelete(id)
        if (!prescription) {
            return res.status(404).json("Prescription not deleted")
           }
           res.status(200).json(prescription)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Prescription", details: error.message });
    }
})

//get all Prescriptions
const getAllPrescription=asyncHandler(async(req,res)=>{
    try {
        const prescription=await Prescription.find()
        .populate("customer")
       .populate("doctor")
       .populate("medicines.medicine")
       .populate("transaction")
        if (!prescription) {
            return res.status(404).json("Prescription not found")
           }
           res.status(200).json(prescription)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to get all Prescriptions", details: error.message });

    }
})

module.exports={createPrescription,getPrescriptionById,updatePrescription,deletePrescription,getAllPrescription}