import mongoose from "mongoose";
import productModel from "../../user/models/productModel.js";
import Order from "../../user/models/ordermodel.js";
import usermodel from "../../user/models/usermodel.js";

//total count of orders
export const totalProductPurchased = async (req, res) => {
  const orders = await Order.find();
  if (!orders)
    return res.status(404).json({ success: false, message: "order not found" });

  const productsPurchased = orders.map((item) => item.products).flat();
  const purchasedCount = productsPurchased.length;

  if (purchasedCount == 0)
    return res.status(404).json({ success: false, message: "no order found" });

  return res
    .status(200)
    .json({ success: true, message: "data calculated", data: purchasedCount });
};

//total revenue genrated
export const totalRevenueGenerated=async(req,res)=>{
    const result= await Order.aggregate([{$group:{_id:null,totalrevenue:{$sum:"$total"}}}])
    if(result.length==0)
        return res.status(404).json({ success: false, message: "order not found" });
    return res.status(200).json({success:true,message:"data calculated",data:result})
    
}
//total products count
 export const totalProductCount=async(req,res)=>{
    const product= await productModel.find()
    if (!product)
        return res.status(404).json({ success: false, message: "order not found" });
    const totalProduct=product.map((item) => item.products).flat()
    const count=totalProduct.length

    if(count.length==0)
        return res.status(404).json({ success: false, message: "order not found" });
    
    return res.status(200).json({success:true,message:"data calculated",data:count})
 }

//total user count

export const totalUserCount=async(req,res)=>{
    const user= await usermodel.find()
    if (!user)
        return res.status(404).json({ success: false, message: "user not found" });
    const totalUser=user.map((item) => item.user).flat()
    const count=totalUser.length

    if(count.length==0)
        return res.status(404).json({ success: false, message: "order not found" });
    
    return res.status(200).json({success:true,message:"data calculated",data:count})
 }