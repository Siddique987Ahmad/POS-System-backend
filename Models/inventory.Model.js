const mongoose=require('mongoose')

const inventorySchema=mongoose.Schema({

    medicine:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Medicine',
        required:true
    },
    stock:{
        quantity:{
            type:Number,
            required:true
        },
        reorderThreshold:{
            type:Number,
            required:true
        },
        lastUpdated:{
            type:Date,
            default:Date.now()
        }
    },
    nearExpiryAlert:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

module.exports=mongoose.model('Inventory',inventorySchema)