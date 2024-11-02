const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createMedicalHistory, getMedicalHistoryById, updateMedicalHistory, deleteMedicalHistory, getAllMedicalHistory } = require('../Controllers/medicalHistory.Controller')

router.post('/createmedicalhistory',authorize(['Admin']),createMedicalHistory)
router.get('/getmedicalhistorybyid/:id',authorize(['Admin']),getMedicalHistoryById)
router.patch('/updatemedicalhistory/:id',authorize(['Admin']),updateMedicalHistory)
router.delete('/deletemedicalhistory/:id',authorize(['Admin']),deleteMedicalHistory)
router.get('/getallmedicalhistory',authorize(['Admin']),getAllMedicalHistory)
module.exports=router