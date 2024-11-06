const asyncHandler=require('express-async-handler')
const DataRetentionPolicy=require('../Models/dataRetentionPolicy.Model')
//create compliance report
const createDataRetentionPolicy=asyncHandler(async(req,res)=>{
    try {
        const { policyName, description, recordType, retentionPeriod, archiveAfter, deleteAfterArchive } = req.body;
         // Validate required fields
        if (!policyName  || !recordType || !retentionPeriod) {
            return res.status(400).json({ error: "All fields are required." });
        }
const dataRetentionPolicy=await DataRetentionPolicy.create({
 policyName,
 description,
 recordType,
 retentionPeriod,
 archiveAfter,
 deleteAfterArchive
})
if (!dataRetentionPolicy) {
    return res.status(404).json({error:"data retention policy not created"})
}
res.status(200).json(dataRetentionPolicy)

    } catch (error) {
        res.status(500).json({ error: "Failed to create data retention policy", details: error.message });
    }
})
//get all data retention policy
const getAllDataRetentionPolicy=asyncHandler(async(req,res)=>{
    try {
        const dataRetentionPolicy=await DataRetentionPolicy.find()
        if (!dataRetentionPolicy) {
            return res.status(404).json({error:"data retention policy not found"})
        }
        res.status(200).json(dataRetentionPolicy)
    } catch (error) {
        res.status(500).json({ error: "Failed to get all data retention policy", details: error.message });
    }
})
//get data retention policy by id
const getDataRetentionPolicyById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const dataRetentionPolicy=await DataRetentionPolicy.findById(id)        
        if (!dataRetentionPolicy) {
            return res.status(404).json({error:"data retention policy not found"})
        }
        res.status(200).json(dataRetentionPolicy)
    } catch (error) {
        res.status(500).json({ error: "Failed to get data retention policy by id", details: error.message });
    }
})
//update data retention policy
const updateDataRetentionPolicy=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { policyName, description, recordType, retentionPeriod, archiveAfter, deleteAfterArchive } = req.body;
        const dataRetentionPolicy=await DataRetentionPolicy.findByIdAndUpdate(
            id,
            {
            policyName,
            archiveAfter,
            deleteAfterArchive,
            description,
            recordType,
            retentionPeriod
            },
            {
                new:true, runValidators:true
            }
        )
        
        if (!dataRetentionPolicy) {
            return res.status(404).json({error:"data retention policy not updated"})
        }
        res.status(200).json(dataRetentionPolicy)

    } catch (error) {
        res.status(500).json({ error: "Failed to update data retention policy by id", details: error.message });
    }
})
//delete data retention policy
const deleteDataRetentionPolicy=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const dataRetentionPolicy=await DataRetentionPolicy.findByIdAndDelete(id)
        if (!dataRetentionPolicy) {
            return res.status(404).json({error:"data retention policy not deleted"})
        }
        res.status(200).json(dataRetentionPolicy)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete data retention policy by id", details: error.message });
    }
})

module.exports={createDataRetentionPolicy,getAllDataRetentionPolicy,getDataRetentionPolicyById,updateDataRetentionPolicy,deleteDataRetentionPolicy}