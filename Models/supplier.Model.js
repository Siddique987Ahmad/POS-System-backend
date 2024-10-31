const mongoose=require('mongoose')

const supplierSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contactInfo:{
        phone:{
            type:String,
            required:true
        },
        email:{
            type:String
        },
        address:{
            type:String
        }
    },
    contractDetail:{
        type:String
    },
    
},{timestamps:true})

module.exports=mongoose.model("Supplier",supplierSchema)