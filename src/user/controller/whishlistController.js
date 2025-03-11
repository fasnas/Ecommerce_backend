import mongoose from "mongoose";
import productModel from "../models/productModel.js";
import usermodel from "../models/usermodel.js";
import Wishlist from "../models/whishlistModel.js";

// === Add to Wishlist ===
export const addToWhishlist = async (req, res) => {
  const userId = req.params.id;
  const { productsId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ success: false, message: "Invalid User ID" });

  if (!mongoose.Types.ObjectId.isValid(productsId))
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product ID" });

  const user = await usermodel.findById(userId);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const product = await productModel.findById(productsId);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  let whishlist = await Wishlist.findOne({ userId }); 

  if (!whishlist) {
    whishlist = new Wishlist({
      userId: userId, 
      products: [{ productId: productsId }], 
    });
  } else {
    const existingProduct = whishlist.products.find(
      (p) => p.productId.toString() === productsId 
    );

    if (existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in wishlist" });
    }
    whishlist.products.push({ productId: productsId });
  }

  await whishlist.save();
  return res.status(200).json({
    success: true,
    message: "Item added to wishlist",
    data: whishlist,
  });
};

// ===Get Wishlist =====
export const getWhishlist = async (req, res) => {
    const userId = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ success: false, message: "Invalid User ID" });
  
    const whishlist = await Wishlist.findOne({ userId }).populate("products.productId");
  
    if (!whishlist)
      return res.status(404).json({ success: false, message: "Wishlist not found" });
  
    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: whishlist,
    });
  };
  