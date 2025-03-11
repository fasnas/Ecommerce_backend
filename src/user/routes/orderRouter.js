import { addToOrders,getOrder } from "../controller/orderController.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from "express"
// import { isAuthenticate } from "../middleware/authMiddleware.js";

const orderRouter=express.Router()

orderRouter.post("/addtoorder/:id",tryCatch(addToOrders))
orderRouter.post("/get/:id",tryCatch(getOrder))

export default orderRouter