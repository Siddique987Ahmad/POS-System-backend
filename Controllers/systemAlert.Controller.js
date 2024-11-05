const asyncHandler=require('express-async-handler')
const SystemAlert=require('../Models/systemAlert.Model')
//create system alert
const createSystemAlert=asyncHandler(async(req,res)=>{
    try {
        const { type, message,alertDate,isResolved,severity } = req.body;
         // Validate required fields
        if (!type  || !message || !severity) {
            return res.status(400).json({ error: "All fields are required." });
        }
const systemAlert=await SystemAlert.create({
  type,
  message,
  alertDate,
  isResolved,
  severity
})
if (!systemAlert) {
    return res.status(404).json({error:"system alert not created"})
}
res.status(200).json(systemAlert)

    } catch (error) {
        res.status(500).json({ error: "Failed to create system alert", details: error.message });
    }
})
//get all system alert
const getAllSystemAlert=asyncHandler(async(req,res)=>{
    try {
        const {type,isResolved,severity}=req.query
        const query={}
        if(type) query.type=type
        if(severity) query.severity=severity
        if(isResolved) query.isResolved=isResolved==='true'
        const systemAlert=await SystemAlert.find(query)        
        if (!systemAlert) {
            return res.status(404).json({error:"system alerts not found"})
        }
        res.status(200).json(systemAlert)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all system alert", details: error.message });
    }
})
//get system alert by id
const getSystemAlertById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const systemAlert=await SystemAlert.findById(id)        
        if (!systemAlert) {
            return res.status(404).json({error:"system alert not found"})
        }
        res.status(200).json(systemAlert)
    } catch (error) {
        res.status(500).json({ error: "Failed to get system alert by id", details: error.message });
    }
})
//update system alert
const updateSystemAlert=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { isResolved } = req.body;
        const systemAlert=await SystemAlert.findByIdAndUpdate(
            id,
            {
             isResolved
            },
            {
                new:true
            }
        )
        
        if (!systemAlert) {
            return res.status(404).json({error:"system alert not updated"})
        }
        res.status(200).json(systemAlert)

    } catch (error) {
        res.status(500).json({ error: "Failed to update system alert by id", details: error.message });
    }
})
//delete system alert
const deleteSystemAlert=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const systemAlert=await SystemAlert.findByIdAndDelete(id)
        if (!systemAlert) {
            return res.status(404).json({error:"system alert not deleted"})
        }
        res.status(200).json(systemAlert)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete system alert by id", details: error.message });
    }
})

module.exports={createSystemAlert,getAllSystemAlert,getSystemAlertById,updateSystemAlert,deleteSystemAlert}