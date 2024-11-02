const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createCustomer, getCustomerById, updateCustomer,deleteCustomer, addOrderToCustomerHistory, getAllCustomer } = require('../Controllers/customer.Controller')

router.post('/createcustomer',authorize(['Admin']),createCustomer)
router.get('/getcustomerbyid/:id',authorize(['Admin']),getCustomerById)
router.patch('/updatecustomer/:id',authorize(['Admin']),updateCustomer)
router.delete('/deletecustomer/:id',authorize(['Admin']),deleteCustomer)
router.post('/addordertocustomerhistory/:id',authorize(['Admin']),addOrderToCustomerHistory)
router.get('/getallcustomer',authorize(['Admin']),getAllCustomer)
module.exports=router