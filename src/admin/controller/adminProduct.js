import mongoose from "mongoose";
import productModel from "../../user/models/productModel.js";

// Add Product
export const addProduct = async (req, res) => {
  const { name, price, stock, category, description } = req.body;

  if (!name || !price || !stock || !category || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = new productModel({
      name,
      price,
      stock,
      category,
      description,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  const { productId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ success: false, message: "invalid oroduct" });
  }
  const deletedProduct = await productModel.findByIdAndDelete(productId);
  if (!deletedProduct) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Product deleted", data: deletedProduct });
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

// Get Single Product
export const singleProduct = async (req, res) => {
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

//edit product
export const editProduct = async (req, res) => {
  const { productId, name, price, stock, category, description } = req.body;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.description = description || product.description;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: `Server Error: ${err.message}` });
  }
};
