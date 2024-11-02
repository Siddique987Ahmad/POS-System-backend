const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createPrescription, getPrescriptionById, updatePrescription, deletePrescription, getAllPrescription } = require('../Controllers/prescription.Controller')

router.post('/createprescription',authorize(['Admin']),createPrescription)
router.get('/getprescriptionbyid/:id',authorize(['Admin']),getPrescriptionById)
router.patch('/updateprescription/:id',authorize(['Admin']),updatePrescription)
router.delete('/deleteprescription/:id',authorize(['Admin']),deletePrescription)
router.get('/getallprescription',authorize(['Admin']),getAllPrescription)
module.exports=router