const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createBatch, getAllBatch, getBatchById } = require('../Controllers/batch.Controller')
router.post('/createbatch',authorize(['Admin','Inventory Manager']),createBatch)
router.get('/getallbatch',authorize(),getAllBatch)
router.get('/getbatchbyid/:id',authorize(['Admin','Inventory Manager']),getBatchById)

module.exports=router