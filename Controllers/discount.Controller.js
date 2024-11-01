const asyncHandler=require('express-async-handler')
const Medicine=require('../Models/medicine.Model')
const Discount=require('../Models/discount.Model')

//create discount

const createDiscount=asyncHandler(async(req,res)=>{
   
    try {
        const { code, description, discountType, discountValue, validTill, applicableItems } = req.body;
    //    const medicine=await Medicine.findById(applicableItems)
    //    if (!medicine) {
    //     return res.status(404).json("medicine id not found")
    //    }
        if (!code || !discountType || !discountValue || !validTill) {
            return res.status(400).json("fields are required")
        }
        // Validate each medicine in applicableItems
    const validMedicines = [];
    if (applicableItems && applicableItems.length > 0) {
      for (const itemId of applicableItems) {
        const medicine = await Medicine.findById(itemId);
        if (!medicine) {
          return res.status(404).json(`Medicine with ID ${itemId} not found`);
        }
        validMedicines.push(medicine._id);
      }
    }
    
        const discount=await Discount.create({
            code,
            description,
            discountType,
            discountValue,
            validTill,
            applicableItems:validMedicines
        })
        if (!discount) {
            return res.status(404).json("discount not created")
        }
        res.status(200).json(discount)
    } catch (error) {
        res.status(500).json({ error: "Failed to create discount", details: error.message });
    }
})
//get all discount
const getAllDiscount=asyncHandler(async(req,res)=>{
   try {
     const discount=await Discount.find()
     if (!discount) {
         return res.status(404).json("discounts not found")
     }
     res.status(200).json(discount)
   } catch (error) {
    res.status(500).json({ error: "Failed to get all discount", details: error.message });
   }
})
//get discount by orderId
const getDiscountById=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const discount=await Discount.findById(id)
        if (!discount) {
            return res.status(404).json("discount not found")
        }
        res.status(200).json(discount)
    } catch (error) {
        res.status(500).json({ error: "Failed to get discount", details: error.message });
    }
})
//update discount
const updateDiscount=asyncHandler(async(req,res)=>{
    try {
        const { code, description, discountType, discountValue, validTill, applicableItems } = req.body;
        const {id}=req.params
        const discount=await Discount.findByIdAndUpdate(
            id,
            {
              code,
              description, 
              discountType,
              discountValue,
              validTill,
              applicableItems
            },{
                new:true
            }
        )
        if (!discount) {
            return res.status(404).json("discount not updated")
        }
        res.status(200).json(discount)
    } catch (error) {
        res.status(500).json({ error: "Failed to update discount", details: error.message });
    }
})
//delete discount
const deleteDiscount=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const discount=await Discount.findByIdAndDelete(id)
        if (!discount) {
            return res.status(404).json("discount not deleted")
        }
        res.status(200).json(discount)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete discount", details: error.message });
    }
})

module.exports={createDiscount,getAllDiscount,getDiscountById,updateDiscount,deleteDiscount}