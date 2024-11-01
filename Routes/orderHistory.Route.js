const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createOrderHistory, getAllOrderHistory, getOrderHistoryById, updateOrderHistory, deleteOrderHistory } = require('../Controllers/orderHistory.Controller')

router.post('/createorderhistory',authorize(['Admin','Inventory Manager']),createOrderHistory)
router.get('/getallorderhistory',authorize(['Admin','Inventory Manager']),getAllOrderHistory)
router.get('/getorderhistorybyid/:orderId',authorize(['Admin','Inventory Manager']),getOrderHistoryById)
router.patch('/updateorderhistory/:orderId',authorize(['Admin','Inventory Manager']),updateOrderHistory)
router.delete('/deleteorderhistory/:orderId',authorize(['Admin']),deleteOrderHistory)




module.exports=router