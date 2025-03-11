import mongoose from "mongoose";
import Cart from "../models/cartModel.js";
import usermodel from "../models/usermodel.js";
import productModel from "../models/productModel.js";

// =Add to Cart=

export const addToCart = async (req, res) => {
  const userId = req.params.id;
  const { productsId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ success: false, message: "Invalid user ID" });

  if (!mongoose.Types.ObjectId.isValid(productsId))
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });

  const user = await usermodel.findById(userId);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const product = await productModel.findById(productsId);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      products: [{ product: productsId, quantity }],
    });
  } else {
    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productsId
    );

    if (existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in cart" });
    } else {
      cart.products.push({ product: productsId, quantity });
    }
  }

  await cart.save();
  return res
    .status(200)
    .json({ success: true, message: "Item added to cart", data: cart });
};

// =Get Cart=

export const getCart = async (req, res) => {
    const userId = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ success: false, message: "Invalid user ID" });
  
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
  
    if (!cart)
      return res.status(404).json({ success: false, message: "Cart not found" });
  
    return res
      .status(200)
      .json({ success: true, message: "Cart fetched successfully", data: cart });
  };
  

// =Remove from Cart=

export const removeFromCart = async (req, res) => {
  const userId = req.params.id;
  const { productsId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productsId)
  )
    return res.status(400).json({ success: false, message: "Invalid ID" });

  const cart = await Cart.findOne({ user: userId });
  if (!cart)
    return res.status(404).json({ success: false, message: "Cart not found" });

  cart.products = cart.products.filter(
    (item) => item.product.toString() !== productsId
  );
  await cart.save();

  return res
    .status(200)
    .json({ success: true, message: "Product removed from cart", data: cart });
};

// =Increment Quantity=

export const incrementQuantity = async (req, res) => {
  const userId = req.params.id;
  const { productsId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productsId)
  )
    return res.status(400).json({ success: false, message: "Invalid ID" });

  const cart = await Cart.findOne({ user: userId });
  if (!cart)
    return res.status(404).json({ success: false, message: "Cart not found" });

  const product = cart.products.find(
    (p) => p.product.toString() === productsId
  );
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  product.quantity += 1;
  await cart.save();

  return res
    .status(200)
    .json({ success: true, message: "Quantity incremented", data: cart });
};

// =Decrement Quantity=

export const decrementQuantity = async (req, res) => {
  const userId = req.params.id;
  const { productsId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productsId)
  )
    return res.status(400).json({ success: false, message: "Invalid ID" });

  const cart = await Cart.findOne({ user: userId });
  if (!cart)
    return res.status(404).json({ success: false, message: "Cart not found" });

  const product = cart.products.find(
    (p) => p.product.toString() === productsId
  );
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  if (product.quantity > 1) {
    product.quantity -= 1;
    await cart.save();
  }

  return res
    .status(200)
    .json({ success: true, message: "Quantity decremented", data: cart });
};

//// Cart Total Price

// export const getCartTotalPrice = async (req, res) => {
//   const userId = req.params.id;

//   if (!mongoose.Types.ObjectId.isValid(userId))
//     return res.status(400).json({ success: false, message: "Invalid user ID" });

//   const cart = await Cart.findOne({ user: userId }).populate(
//     "products.product"
//   );
//   if (!cart)
//     return res.status(404).json({ success: false, message: "Cart not found" });

//   let totalPrice = 0;
//   cart.products.forEach((item) => {
//     totalPrice += item.product.price * item.quantity;
//   });

//   return res
//     .status(200)
//     .json({ success: true, message: "Total price calculated", totalPrice });
// };
