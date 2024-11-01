const asyncHandler = require("express-async-handler");
const Medicine = require("../Models/medicine.Model");
const SalesTransaction = require("../Models/salesTransaction.Model");
//create sales transaction
const createSalesTransaction = asyncHandler(async (req, res) => {
  try {
    const {
      items,
    
      paymentMethod,
      discountCode,
      customer,
      taxAmount,
      
    } = req.body;
    // Ensure required fields are present
    if (
      !items ||
      !paymentMethod ||
      !taxAmount
    ) {
      return res.status(400).json({ error: "Required fields are missing" });
    }
    //   const medicineId=await Medicine.findById(items.item)
   let transactionTotal=0;
    const formattedItems = await Promise.all(
      items.map(async (item) => {
        const medicine = await Medicine.findById(item.item);
        if (!medicine) {
          throw new Error(`Medicine with ID ${item.item} not found`);
        }
        const itemTotalPrice = item.price * item.quantity;
        const itemDiscountedPrice = itemTotalPrice - (item.discount || 0);
        
        transactionTotal += itemDiscountedPrice;

        return {
          item: item.item,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount || 0,
          totalPrice: itemDiscountedPrice,
        };
      })
    );
    const finalAmount = transactionTotal + taxAmount;

    const salesTransaction = await SalesTransaction.create({
      items: formattedItems,
      transactionTotal,
      paymentMethod,
      discountCode,
      customer,
      taxAmount,
      finalAmount,
    });
    if (!salesTransaction) {
      return res.status(404).json("sales transaction not created");
    }
    res.status(200).json(salesTransaction);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error creating sales transaction",
        details: error.message,
      });
  }
});
//get all sales transaction
const getAllSalesTransaction = asyncHandler(async (req, res) => {
  try {
    const salesTransaction = await SalesTransaction.find().populate(
      "items.item"
    );
    if (!salesTransaction) {
      return res.status(404).json("sales transactions not found");
    }
    res.status(200).json(salesTransaction);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error fetching all sales transaction",
        details: error.message,
      });
  }
});
//get sales transaction by id
const getSalesTransactionById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const salesTransaction = await SalesTransaction.findById(id).populate(
      "items.item"
    );
    if (!salesTransaction) {
      return res.status(404).json("sales transaction not found");
    }
    res.status(200).json(salesTransaction);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error fetching sales transaction by id",
        details: error.message,
      });
  }
});
//update sales transaction
const updateSalesTransaction = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const salesTransaction = await SalesTransaction.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!salesTransaction) {
      return res.status(404).json("sales transaction not updated");
    }
    res.status(200).json(salesTransaction);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error updating sales transaction by id",
        details: error.message,
      });
  }
});
//delete sales transaction
const deleteSalesTransaction = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const salesTransaction = await SalesTransaction.findByIdAndDelete(id);
    if (!salesTransaction) {
      return res.status(404).json("sales transaction not deleted");
    }
    res.status(200).json(salesTransaction);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error deleting sales transaction by id",
        details: error.message,
      });
  }
});

module.exports = {
  createSalesTransaction,
  getAllSalesTransaction,
  getSalesTransactionById,
  updateSalesTransaction,
  deleteSalesTransaction,
};
