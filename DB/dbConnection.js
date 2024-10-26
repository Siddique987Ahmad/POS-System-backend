const mongoose=require('mongoose')

const dbConnection=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected",connect.connection.host,connect.connection.name )
    } catch (error) {
        console.log("MongoDB not connected",error)
        process.exit(1)
    }
}
module.exports=dbConnection