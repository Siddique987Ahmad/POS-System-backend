const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createSalesReport, getAllSalesReport, getSalesReportById, updateSalesReport, deleteSalesReport } = require('../Controllers/salesReport.Controller')
router.post('/createsalesreport',authorize(['Admin','Accountant']),createSalesReport)
router.get('/getallsalesreport',authorize(['Admin','Accountant']),getAllSalesReport)
router.get('/getsalesreportbyid/:id',authorize(['Admin','Accountant']),getSalesReportById)
router.patch('/updatesalesreport/:id',authorize(['Admin','Accountant']),updateSalesReport)
router.delete('/deletesalesreport/:id',authorize(['Admin']),deleteSalesReport)





module.exports=router