const mongoose=require('mongoose')
const userSchema=mongoose.Schema({

    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    contact:{
        type:String
    },
    address:{
        type:String
    },
    role:{
        type:String,
        enum:["Admin","Cashier","Inventory Manager","Accountant"],
        required:true
    },
    permissions:{
        type:[String],
        default:[]
    },
    sessionTokens:[
        {
            token:{
                type:String
            },
            createdAt:{type:Date,default:Date.now}
        }
    ]
},{
    timestamps:true
})

userSchema.pre('save',function(next){
 
    if (this.role==='Admin') {
        this.permissions=["view_all","edit_all","delete_all"]
    } else if(this.role==='Cashier')
    {
        this.permissions=['view_sales', 'process_sales']
    } else if(this.role==='Inventory Manager')
    {
        this.permissions=['view_inventory', 'edit_inventory', 'order_stock']
    } else if(this.role==='Accountant')
    {
        this.permissions=['view_financial_reports', 'process_refunds']
    }
    next()
})

module.exports=mongoose.model('User',userSchema)