const jwt=require('jsonwebtoken')
const User=require('../Models/user.Model')

const authorize=(requiredPermission)=>{
    return async(req,res,next)=>{
        try {
            const authHeader = req.header('Authorization');
            if (!authHeader) {
                return res.status(401).json({ error: "Authorization header missing" });
            }
            const token=authHeader.replace('Bearer','').trim()
            if (!token) {
                return res.status(401).json({ error: "Token missing in Authorization header" });
            }
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            const user=await User.findOne({_id:decoded._id,'sessionTokens.token':token})
            if (!user) {
                throw new Error("user not authorize");
            }
            const hashedPermissions=requiredPermission.every(permission=>user.permissions.includes(permission))
             if (!hashedPermissions) {
                res.status(403).json("Insufficient permission")
             }
             req.user=user
             req.token=token
             next()

        } catch (error) {
            console.log("please authenticate",error)
        }
        
    }
}

module.exports=authorize