import productModel from "../models/productModel.js";


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

export const productByCategory = async (req, res) => {
    const { catagory } = req.params; 
  
    try {
      const product = await productModel.find({ category:catagory });
  
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
  