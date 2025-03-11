import mongoose from "mongoose";
import Order from "../models/ordermodel.js";
import Cart from "../models/cartModel.js";
import usermodel from "../models/usermodel.js";

export const addToOrders = async (req, res) => {
  const userId = req.params.id;
  const { email, name } = req.body;

  const user = await usermodel.findById(userId);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const cart = await Cart.findOne({ user: userId }).populate(
    "products.product"
  );

  if (!cart || cart.products.length === 0)
    return res.status(404).json({ success: false, message: "Cart is empty" });

  const totalAmount = cart.products.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0
  );

  const newOrder = new Order({
    user: userId,
    items: cart.products.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    })),
    totalAmount,
    email,
    name,
    payment_status: "pending",
  });

  await newOrder.save();

  cart.products = []; // Empty Cart
  await cart.save();

  return res
    .status(200)
    .json({ success: true, message: "Order Successful", data: newOrder });

};

///////////

export const getOrder = async (req, res) => {
    const userId = req.params.id;
   
    const order = await Order.find({ userId }).populate(
      "items.productId"
    );
  
    if (!order || order.length === 0)
      return res.status(404).json({ success: false, message: "Order not found" });
  
    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  };
  
