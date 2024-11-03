const asyncHandler=require('express-async-handler')
const Medicine=require('../Models/medicine.Model')
const InventoryReport=require('../Models/inventoryReport.Model')
//create Inventory report
const createInventoryReport=asyncHandler(async(req,res)=>{
    try {
        const { stockLevels, reorderRequired, expiredItems } = req.body;

      
          // Validate each item in stockLevel and ensure medicines exist
          const validatedStockLevels = [];
          for (const item of stockLevels) {
            const medicine = await Medicine.findById(item.medicine);
            if (!medicine) {
              return res.status(404).json({ error: `Medicine with ID ${item.medicine} not found` });
            }
            validatedStockLevels.push({ medicine: item.medicine, quantity: item.quantity });
          }
         // Validate each item in reorderRequired and ensure medicines exist
          const validatedReOrderRequired=[]
          for (const item of reorderRequired) {
            const medicine =await Medicine.findById(item.medicine)
            if (!medicine) {
                return res.status(404).json({ error: `Medicine with ID ${item.medicine} not found` });
            } 
            validatedReOrderRequired.push({medicine:item.medicine,reorderLevel:item.reorderLevel})
          }
        // Validate each item in expiredItems and ensure medicines exist

        const validatedexpiredItems=[]
        for (const item of expiredItems) {
            const medicine=await Medicine.findById(item.medicine)
            if (!medicine) {
                return res.status(404).json({ error: `Medicine with ID ${item.medicine} not found` });
            } 
            validatedexpiredItems.push({medicine:item.medicine,expirationDate:item.expirationDate})
        }

const inventoryReport=await InventoryReport.create({
    stockLevels:validatedStockLevels,
    reorderRequired:validatedReOrderRequired,
    expiredItems:validatedexpiredItems
})
if (!inventoryReport) {
    return res.status(404).json({error:"Inventory report not created"})
}
res.status(200).json(inventoryReport)

    } catch (error) {
        res.status(500).json({ error: "Failed to create Inventory report", details: error.message });
    }
})
//get all Inventory report
const getAllInventoryReport=asyncHandler(async(req,res)=>{
    try {
        const inventoryReport=await InventoryReport.find()
        .populate('expiredItems')
        .populate('stockLevels')
        .populate('reorderRequired')
        if (!inventoryReport) {
            return res.status(404).json({error:"Inventory reports not found"})
        }
        res.status(200).json(inventoryReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all Inventory report", details: error.message });
    }
})
//get Inventory report by id
const getInventoryReportById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const inventoryReport=await InventoryReport.findById(id)
        .populate('expiredItems')
        .populate('stockLevels')
        .populate('reorderRequired')
        if (!inventoryReport) {
            return res.status(404).json({error:"Inventory report not found"})
        }
        res.status(200).json(inventoryReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to get Inventory report by id", details: error.message });
    }
})
//update Inventory report
const updateInventoryReport=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { stockLevels, reorderRequired, expiredItems } = req.body;
        const inventoryReport=await InventoryReport.findByIdAndUpdate(
            id,
            {
               stockLevels,
               reorderRequired,
               expiredItems
            },
            {
                new:true
            }
        )
        .populate('expiredItems')
        .populate('stockLevels')
        .populate('reorderRequired')
        if (!inventoryReport) {
            return res.status(404).json({error:"Inventory report not updated"})
        }
        res.status(200).json(inventoryReport)

    } catch (error) {
        res.status(500).json({ error: "Failed to update Inventory report by id", details: error.message });
    }
})
//delete Inventory report
const deleteInventoryReport=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const inventoryReport=await InventoryReport.findByIdAndDelete(id)
        .populate('expiredItems')
        .populate('stockLevels')
        .populate('reorderRequired')
        if (!inventoryReport) {
            return res.status(404).json({error:"Inventory report not deleted"})
        }
        res.status(200).json(inventoryReport)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Inventory report by id", details: error.message });
    }
})

module.exports={createInventoryReport,getAllInventoryReport,getInventoryReportById,updateInventoryReport,deleteInventoryReport}