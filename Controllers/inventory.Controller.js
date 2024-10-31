const asyncHandler=require('express-async-handler')
const Medicine=require('../Models/medicine.Model')
const Inventory=require('../Models/inventory.Model')

//create inventory
const createInventory=asyncHandler(async(req,res)=>{
  try {
    const {medicine,stock}=req.body
    const medicineId=await Medicine.findById(medicine)
    if (!medicineId) {
      return res.status(400).json("medicine id not found")
    }
    if (!stock || !stock.quantity || !stock.reorderThreshold) {
      return res.status(400).json({ message: ' quantity, and reorder threshold are required.' });
  }
    const inventory=await Inventory.create({
      medicine:medicineId,
      stock,
      nearExpiryAlert:stock.quantity<=stock.reorderThreshold
    })
    if (!inventory) {
      return res.status(400).json("inventory not found")
    }
    res.status(200).json(inventory)
  } catch (error) {
    res.status(500).json(error)
  }
})
//update inventory
const updateInventory=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const {stock}=req.body
        const inventory=await Inventory.findByIdAndUpdate(
            id,
            {
                stock:{
                    quantity:stock.quantity,
                    reorderThreshold:stock.reorderThreshold,
                    lastUpdated:Date.now()
                },
                nearExpiryAlert:stock.quantity<=stock.reorderThreshold
            },
            {new:true}
        )
        if (!inventory) {
            return res.status(400).json("inventory not updated")
          }
          res.status(200).json(inventory)
    } catch (error) {
        res.status(500).json(error)
    }

})
//get all inventory
const getAllInventory=asyncHandler(async(req,res)=>{
   try {
     const inventory=await Inventory.find().populate('medicine')
     if (!inventory) {
         return res.status(400).json("inventories not found")
       }
       res.status(200).json(inventory)
   } catch (error) {
    res.status(500).json(error)
   }
})
//get inventory by id
const getInventoryById=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     const inventory=await Inventory.findById(id)
     if (!inventory) {
         return res.status(400).json("inventory not found")
       }
       res.status(200).json(inventory)
   } catch (error) {
    res.status(500).json(error)
   }
})
//delete inventory
const deleteInventory=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const inventory=await Inventory.findByIdAndDelete(id)
        if (!inventory) {
            return res.status(400).json("inventory not deleted")
          }
          res.status(200).json(inventory)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports={createInventory,updateInventory,getAllInventory,getInventoryById,deleteInventory}