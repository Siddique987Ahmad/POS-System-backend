const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createSalesTransaction, getAllSalesTransaction, getSalesTransactionById, updateSalesTransaction, deleteSalesTransaction } = require('../Controllers/salesTransaction.Controller')
router.post('/createsalestransaction',authorize(['Admin','Cashier']),createSalesTransaction)
router.get('/getallsalestransaction',authorize(['Admin','Cashier']),getAllSalesTransaction)
router.get('/getsalestransactionbyid/:id',authorize(['Admin','Cashier']),getSalesTransactionById)
router.patch('/updatesalestransaction/:id',authorize(['Admin','Cashier']),updateSalesTransaction)
router.delete('/deletesalestransaction/:id',authorize(['Admin']),deleteSalesTransaction)





module.exports=router