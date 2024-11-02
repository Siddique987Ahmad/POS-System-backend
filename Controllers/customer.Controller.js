const asyncHandler=require('express-async-handler')
const OrderHistory=require('../Models/orderHistory.Model')
const Customer=require('../Models/customer.Model')

//create customer
const createCustomer=asyncHandler(async(req,res)=>{
    try {
        const { name, contact, address, loyaltyPoints } = req.body;
       if (!name || !contact) {
        return res.status(400).json("name and contact required")
       }

       const customer=await Customer.create({
        name,
        contact,
        address,
        loyaltyPoints,
    
       })
       if (!customer) {
        return res.status(404).json("customer not created")
       }
       res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({ error: "Failed to create customer", details: error.message });
    }
})
//get a customer by id
const getCustomerById=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     const customer=await Customer.findById(id).populate('orderHistory')
     if (!customer) {
        return res.status(404).json("customer not found")
       }
       res.status(200).json(customer)
   } catch (error) {
    res.status(500).json({ error: "Failed to get customer", details: error.message });
   }
})
//update customer by id
const updateCustomer=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const { name, contact, address, loyaltyPoints } = req.body;
       const customer=await Customer.findByIdAndUpdate(
        id,
        {
            name,
            address,
            contact,
            loyaltyPoints
        },
        {
            new:true
        }
       )
       if (!customer) {
        return res.status(404).json("customer not updated")
       }
       res.status(200).json(customer)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to update customer", details: error.message });
    }
})
//delete customer
const deleteCustomer=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const customer=await Customer.findByIdAndDelete(id)
        if (!customer) {
            return res.status(404).json("customer not deleted")
           }
           res.status(200).json(customer)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to delete customer", details: error.message });
    }
})
//add an order to customer history
const addOrderToCustomerHistory=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const {orderId}=req.body
        const order=await OrderHistory.findById(orderId)
        if (!order) {
            return res.status(400).json("order id required")
        }
        const customer=await Customer.findByIdAndUpdate(
            id,
            { $push:{orderHistory:orderId}
        },
        {
            new:true
        }
        ).populate("orderHistory");
        if (!customer) {
            return res.status(404).json("customer not found")
           }
           res.status(200).json(customer)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to add an order customer", details: error.message });
    }
})
//get all customers
const getAllCustomer=asyncHandler(async(req,res)=>{
    try {
        const customer=await Customer.find().populate('orderHistory')
        if (!customer) {
            return res.status(404).json("customers not found")
           }
           res.status(200).json(customer)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to get all customers", details: error.message });

    }
})

module.exports={createCustomer,getCustomerById,updateCustomer,deleteCustomer,addOrderToCustomerHistory,getAllCustomer}