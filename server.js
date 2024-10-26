const express=require('express')
const dotenv=require('dotenv').config()
const app=express()
const dbConnection=require('./DB/dbConnection')
const userRoute=require('./Routes/user.Route')
dbConnection()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/user',userRoute)



const port=process.env.PORT || 6000


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})