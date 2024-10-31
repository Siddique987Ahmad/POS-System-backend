const mongoose=require('mongoose')
const batchSchema=mongoose.Schema({

    medicine:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Medicine',
        required:true
    },
    batchNumber:{
        type:String,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },
    dateReceieved:{
        type:Date,
        default:Date.now()
    },
    quantity:{
        type:Number,
        required:true
    }

},{
    timestamps:true
})

module.exports=mongoose.model('Batch',batchSchema)