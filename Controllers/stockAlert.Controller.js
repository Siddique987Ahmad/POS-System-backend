const asyncHandler=require('express-async-handler')
const Medicine=require('../Models/medicine.Model')
const StockAlert=require('../Models/stockAlert.Model')
//create stock alert
const createStockAlert=asyncHandler(async(req,res)=>{
    try {
        const { type,medicine,message,alertDate,isResolved } = req.body;
        const medicineId=await Medicine.findById(medicine)
         // Validate required fields
        if (!type || !medicineId || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }
const stockAlert=await StockAlert.create({
  type,
  medicine:medicineId,
  message,
  alertDate,
  isResolved
})
if (!stockAlert) {
    return res.status(404).json({error:"stock alert not created"})
}
res.status(200).json(stockAlert)

    } catch (error) {
        res.status(500).json({ error: "Failed to create stock alert", details: error.message });
    }
})
//get all stock alert
const getAllStockAlert=asyncHandler(async(req,res)=>{
    try {
        const {type,isResolved}=req.query
        const query={}
        if(type) query.type=type
        if(isResolved) query.isResolved=isResolved==='true'
        const stockAlert=await StockAlert.find(query)
        .populate('medicine')
        
        if (!stockAlert) {
            return res.status(404).json({error:"stock alerts not found"})
        }
        res.status(200).json(stockAlert)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all stock alert", details: error.message });
    }
})
//get stock alert by id
const getStockAlertById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const stockAlert=await StockAlert.findById(id)
        .populate('medicine')
        
        if (!stockAlert) {
            return res.status(404).json({error:"stock alert not found"})
        }
        res.status(200).json(stockAlert)
    } catch (error) {
        res.status(500).json({ error: "Failed to get stock alert by id", details: error.message });
    }
})
//update stock alert
const updateStockAlert=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { isResolved } = req.body;
        const stockAlert=await StockAlert.findByIdAndUpdate(
            id,
            {
             isResolved
            },
            {
                new:true
            }
        )
        .populate('medicine')
        
        if (!stockAlert) {
            return res.status(404).json({error:"stock alert not updated"})
        }
        res.status(200).json(stockAlert)

    } catch (error) {
        res.status(500).json({ error: "Failed to update stock alert by id", details: error.message });
    }
})
//delete stock alert
const deleteStockAlert=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const stockAlert=await StockAlert.findByIdAndDelete(id)
        .populate('medicine')
        if (!stockAlert) {
            return res.status(404).json({error:"stock alert not deleted"})
        }
        res.status(200).json(stockAlert)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete stock alert by id", details: error.message });
    }
})

module.exports={createStockAlert,getAllStockAlert,getStockAlertById,updateStockAlert,deleteStockAlert}