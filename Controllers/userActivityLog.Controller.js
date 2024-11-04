const asyncHandler=require('express-async-handler')
const UserActivityLog=require('../Models/userActivityLog.Model')
const User=require('../Models/user.Model')
//create user activity log
const createUserActivityLog=asyncHandler(async(req,res)=>{
    try {
        const { user, action, description, associatedEntity, entityId } = req.body;
        const userid=await User.findById(user)
    if (!userid || !action) {
        return res.status(400).json({ error: "user id and action are required" });
    }
    
    
    const userActivityLog=await UserActivityLog.create(
        {
            user:userid,
            action,
            description,
            associatedEntity,
            entityId
        }
    )
    if (!userActivityLog) {
        return res.status(404).json({error:"user activity log not created"})
    }
res.status(200).json(userActivityLog)

    } catch (error) {
        res.status(500).json({ error: "Failed to create user activity log", details: error.message });

    }
})
//get all user activity log
const getAllUserActivityLog=asyncHandler(async(req,res)=>{
    try {
        const {user,action,associatedEntity}=req.query
        const query={}
        if(user) query.user=user
        if(action) query.action=action
        if(associatedEntity) query.associatedEntity=associatedEntity
        const userActivityLog=await UserActivityLog.find(query)
        .populate("user") // Assuming the User model has a 'name' field
        .sort({ createdAt: -1 }); // Sort by most recent activities
        if (!userActivityLog) {
            return res.status(404).json({error:"user activity log not found"})
        }
    res.status(200).json(userActivityLog)
    } catch (error) {
        res.status(500).json({ error: "Failed to get user activity log", details: error.message });
    }
})
//get user activity log by id
const getUserActivityLogById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const userActivityLog=await UserActivityLog.findById(id)
        .populate("user")
        
        if (!userActivityLog) {
            return res.status(404).json({error:"user activity log not found"})
        }
    res.status(200).json(userActivityLog)
    } catch (error) {
        res.status(500).json({ error: "Failed to get user activity log", details: error.message });
    }
})
//update user activity log
const updateUserActivityLog=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { user, action, description, associatedEntity, entityId } = req.body;
        const userActivityLog=await UserActivityLog.findByIdAndUpdate(
            id,
            {
               user,
               action,
               associatedEntity,
               description,
               entityId
            },
            {
                new:true
            }
        )
        if (!userActivityLog) {
            return res.status(404).json({error:"user activity log not updated"})
        }
    res.status(200).json(userActivityLog)

    } catch (error) {
        res.status(500).json({ error: "Failed to update user activity log", details: error.message });
    }
})
//delete user activity log
const deleteUserActivityLog=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const userActivityLog=await UserActivityLog.findByIdAndDelete(id)
        if (!userActivityLog) {
            return res.status(404).json({error:"user activity log not delete"})
        }
    res.status(200).json(userActivityLog)

    } catch (error) {
        res.status(500).json({ error: "Failed to delete user activity log", details: error.message });
    }
})


module.exports={createUserActivityLog,getAllUserActivityLog,getUserActivityLogById,updateUserActivityLog,deleteUserActivityLog}