const express=require('express')
const router=express.Router()
const authorize=require('../Middleware/auth.Middleware')
const { createInventory, updateInventory, deleteInventory, getAllInventory, getInventoryById } = require('../Controllers/inventory.Controller')

router.post('/createinventory',authorize(['Admin','Inventory Manager']),createInventory)
router.patch('/updateinventory/:id',authorize(['Admin','Inventory Manager']),updateInventory)
router.delete('/deleteinventory/:id',authorize(['Admin']),deleteInventory)
router.get('/getallinventory',authorize(),getAllInventory)
router.get('/getinventorybyid/:id',authorize(['Admin','Inventory Manager']),getInventoryById)
module.exports=router