import mongoose from "mongoose";
import Order from "../models/ordermodel.js";
import Cart from "../models/cartModel.js";
import usermodel from "../models/usermodel.js";

export const addToOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, address, paymentMethode } = req.body;

    const user = await usermodel.findById(userId);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const cart = await Cart.findOne({ user: userId }).populate("products.product");

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
      total: totalAmount,
      name,
      address,
      paymentMethode,
      payment_status: "pending",
    });

    await newOrder.save();

    cart.products = []; 
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Order Successful",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getOrder = async (req, res) => {
  const userId = req.user._id;

  const order = await Order.find({ user: userId }).populate("items.productId");

  if (!order || order.length === 0)
    return res.status(404).json({ success: false, message: "Order not found" });

  return res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    data: order,
  });
};
