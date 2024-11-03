const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createInventoryReport, getAllInventoryReport, getInventoryReportById, updateInventoryReport, deleteInventoryReport } = require('../Controllers/inventoryReport.Controller')
router.post('/createinventoryreport',authorize(['Admin','Inventory Manager']),createInventoryReport)
router.get('/getallinventoryreport',authorize(['Admin','Inventory Manager']),getAllInventoryReport)
router.get('/getinventoryreportbyid/:id',authorize(['Admin','Inventory Manager']),getInventoryReportById)
router.patch('/updateinventoryreport/:id',authorize(['Admin','Inventory Manager']),updateInventoryReport)
router.delete('/deleteinventoryreport/:id',authorize(['Admin']),deleteInventoryReport)





module.exports=router