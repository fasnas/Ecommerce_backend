import express from "express"
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from "./src/user/routes/userRouter.js";
import productRouter from "./src/user/routes/productRouter.js";
import cartRouter from "./src/user/routes/cartRouter.js";
import whishlistRouter from "./src/user/routes/whishlistRouter.js";
import orderRouter from "./src/user/routes/orderRouter.js";
import dbconnect from "./src/config/dbConfig.js";
import adminRouter from "./src/admin/routes/adminRouter.js";



dotenv.config()
const app=express()
const port=3006

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


dbconnect()//database connection

app.get("/",(req,res)=>{
  res.json({message:"welcome to the api"})
})

app.use("/api/user", userRouter)
app.use("/api/prod", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/wishlist", whishlistRouter)
app.use("/api/order", orderRouter)

app.use("/api/admin",adminRouter)

app.listen(port,()=>{
console.log("OK")
})
