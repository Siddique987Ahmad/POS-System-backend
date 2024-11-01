const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createReceipt, getAllReceipt, getReceiptById, updateReceipt, deleteReceipt } = require('../Controllers/receipt.Controller')
router.post('/createreceipt',authorize(['Admin','Cashier']),createReceipt)
router.get('/getallreceipt',authorize(['Admin','Cashier']),getAllReceipt)
router.get('/getreceiptbyid/:id',authorize(['Admin','Cashier']),getReceiptById)
router.patch('/updatereceipt/:id',authorize(['Admin','Cashier']),updateReceipt)
router.delete('/deletereceipt/:id',authorize(['Admin']),deleteReceipt)




module.exports=router