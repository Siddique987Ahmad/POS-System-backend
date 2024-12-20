const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createUserActivityLog, getAllUserActivityLog, getUserActivityLogById, updateUserActivityLog, deleteUserActivityLog } = require('../Controllers/userActivityLog.Controller')
router.post('/createuseractivitylog',authorize(['Admin']),createUserActivityLog)
router.get('/getalluseractivitylog',authorize(['Admin']),getAllUserActivityLog)
router.get('/getuseractivitylogbyid/:id',authorize(['Admin']),getUserActivityLogById)
router.patch('/updateuseractivitylog/:id',authorize(['Admin']),updateUserActivityLog)
router.delete('/deleteuseractivitylog/:id',authorize(['Admin']),deleteUserActivityLog)
module.exports=router