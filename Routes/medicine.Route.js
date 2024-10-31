const express=require('express')
const authorize=require('../Middleware/auth.Middleware')
const { createMedicine, getAllMedicine, getMedicineById, updateMedicine, deleteMedicine } = require('../Controllers/medicine.Controller')
const router=express.Router()
router.post('/createmedicine',authorize(['Admin','Inventory Manager']),createMedicine)
router.get('/getallmedicine',authorize(['Admin','Inventory Manager','Cashier']),getAllMedicine)
router.get('/getmedicinebyid/:id',authorize(['Admin','Inventory Manager','Cashier']),getMedicineById)
router.patch('/updatemedicine/:id',authorize(["Admin", "Inventory Manager"]),updateMedicine)
router.delete('/deletemedicine/:id',authorize(["Admin"]),deleteMedicine)


module.exports=router