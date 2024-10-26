const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
//register user
const registerUser=asyncHandler(async(req,res)=>{
const {userName,email,password,contact,address,role}=req.body
const hashedPassword=await bcrypt.hash(password,10)
const user=await User.create({
    userName,
    email,
    password:hashedPassword,
    contact,
    address,
    role
})
if (!user) {
    res.status(404).json("user not created")
}
res.status(200).json(user)
})
//login user
const login=asyncHandler(async(req,res)=>{
 const {email,password}=req.body
 const user=await User.findOne({email})
 if (!user) {
   return res.status(401).json("Invalid email and password")
 }
 const isMatch=await bcrypt.compare(password,user.password)
 if (!isMatch) {
   return res.status(401).json("Invalid email and password")
 }
 const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
 user.sessionTokens.push({token})
 await user.save()
 res.status(200).json(token)
})
//logout user
const logoutUser=asyncHandler(async(req,res)=>{
    try {
        const user=req.user
        user.sessionTokens=user.sessionTokens.filter(session=>session.token!==req.token)
        await user.save()
        res.status(200).json("logout successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})
//get all users
const getAll=asyncHandler(async(req,res)=>{
    try {
        const user=await User.find({})
        if (!user) {
            res.status(404).json("users not found")
        }
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json(error)

    }
})
//get user by id
const getUserById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findById(id)
        if (!user) {
            res.status(404).json("user not found")
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)   
    }

})
//update user
const updateUser=asyncHandler(async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['email','contact','address']
    const isValidOperation=updates.every(updates=>allowedUpdates.includes(updates))
    if (!isValidOperation) {
        res.status(404).json("updates not valid")
    }
    try {
        updates.forEach((update)=>(req.user[update]=req.body[update]))
        await req.user.save()
        return res.status(200).json(req.user); // Add "return" here
    } catch (error) {
        res.status(500).json(error)   

    }
})
//delete user
const deleteUser=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findByIdAndDelete(id)
        if (!user) {
            res.status(404).json("user not found")
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)   

    }
})

module.exports={registerUser,login,logoutUser,getAll,getUserById,updateUser,deleteUser}