const express=require('express')
const dotenv=require('dotenv').config()
const app=express()
const dbConnection=require('./DB/dbConnection')
const userRoute=require('./Routes/user.Route')
const supplierRoute=require('./Routes/supplier.Route')
const medicineRouter=require('./Routes/medicine.Route')
const inventoryRoute=require('./Routes/inventory.Route')
const batchRoute=require('./Routes/batch.Route')
dbConnection()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/user',userRoute)
app.use('/api/supplier',supplierRoute)
app.use('/api/medicine',medicineRouter)
app.use('/api/inventory',inventoryRoute)
app.use('/api/batch',batchRoute)
const port=process.env.PORT || 6000


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})