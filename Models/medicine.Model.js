const mongoose=require('mongoose')

const medicineSchema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    storageInstruction:{
        type:String
    },
    supplier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Supplier',
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Medicine',medicineSchema)