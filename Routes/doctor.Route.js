const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createDoctor, getDoctorById, updateDoctor, deleteDoctor, getAllDoctor } = require('../Controllers/doctor.Controller')

router.post('/createdoctor',authorize(['Admin']),createDoctor)
router.get('/getdoctorbyid/:id',authorize(['Admin']),getDoctorById)
router.patch('/updatedoctor/:id',authorize(['Admin']),updateDoctor)
router.delete('/deletedoctor/:id',authorize(['Admin']),deleteDoctor)
router.get('/getalldoctor',authorize(['Admin']),getAllDoctor)
module.exports=router