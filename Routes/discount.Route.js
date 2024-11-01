const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createDiscount, getAllDiscount, getDiscountById, updateDiscount, deleteDiscount } = require('../Controllers/discount.Controller')
router.post('/creatediscount',authorize(['Admin','Cashier']),createDiscount)
router.get('/getalldiscount',getAllDiscount)
router.get('/getdiscountbyid/:id',getDiscountById)
router.patch('/updatediscount/:id',authorize(['Admin','Cashier']),updateDiscount)
router.delete('/deletediscount/:id',authorize(['Admin']),deleteDiscount)




module.exports=router