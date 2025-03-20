import mongoose from "mongoose";
import productModel from "../models/productModel.js";


// Get Single Product
export const viewSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};

//get products by catagory
export const productByCategory = async (req, res) => {
  const { catagory } = req.params;

  try {
    const product = await productModel.find({ category: catagory });

    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching category found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Products
export const allProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};
