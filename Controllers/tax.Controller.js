const asyncHandler=require('express-async-handler')
const Tax=require('../Models/tax.Model')

//create Tax

const createTax=asyncHandler(async(req,res)=>{
   
    try {
        const { itemCategory, location, taxRate, effectiveFrom } = req.body;
            if (!itemCategory || !effectiveFrom || !location) {
            return res.status(400).json("fields are required")
        }
    
        const tax=await Tax.create({
            itemCategory,
            location,
            taxRate,
            effectiveFrom
        })
        if (!tax) {
            return res.status(404).json("tax not created")
        }
        res.status(200).json(tax)
    } catch (error) {
        res.status(500).json({ error: "Failed to create tax", details: error.message });
    }
})
//get all tax
const getAllTax=asyncHandler(async(req,res)=>{
   try {
     const tax=await Tax.find()
     if (!tax) {
         return res.status(404).json("taxes not found")
     }
     res.status(200).json(tax)
   } catch (error) {
    res.status(500).json({ error: "Failed to get all taxes", details: error.message });
   }
})
//get tax by id 
const getTaxById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const tax=await Tax.findById(id)
        if (!tax) {
            return res.status(404).json("tax not found")
        }
        res.status(200).json(tax)
    } catch (error) {
        res.status(500).json({ error: "Failed to get tax", details: error.message });
    }
})
//update tax
const updateTax=asyncHandler(async(req,res)=>{
    try {
        const { itemCategory, location, taxRate, effectiveFrom } = req.body;
        const {id}=req.params
        const tax=await Tax.findByIdAndUpdate(
            id,
            {
               itemCategory,
               location,
               taxRate,
               effectiveFrom 
            },{
                new:true
            }
        )
        if (!tax) {
            return res.status(404).json("tax not updated")
        }
        res.status(200).json(tax)
    } catch (error) {
        res.status(500).json({ error: "Failed to update tax", details: error.message });
    }
})
//delete tax
const deleteTax=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const tax=await Tax.findByIdAndDelete(id)
        if (!tax) {
            return res.status(404).json("tax not deleted")
        }
        res.status(200).json(tax)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete tax", details: error.message });
    }
})

module.exports={createTax,getAllTax,getTaxById,updateTax,deleteTax}