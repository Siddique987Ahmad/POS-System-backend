const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createPaymentMethod, getAllPaymentMethod, getPaymentMethodById, updatePaymentMethod, deletePaymentMethod } = require('../Controllers/paymentMethod.Controller')
router.post('/createpaymentmethod',authorize(['Admin','Cashier']),createPaymentMethod)
router.get('/getallpaymentmethod',authorize(['Admin','Cashier']),getAllPaymentMethod)
router.get('/getpaymentmethodbyid/:id',authorize(['Admin','Cashier']),getPaymentMethodById)
router.patch('/updatepaymentmethod/:id',authorize(['Admin','Cashier']),updatePaymentMethod)
router.delete('/deletepaymentmethod/:id',authorize(['Admin']),deletePaymentMethod)




module.exports=router