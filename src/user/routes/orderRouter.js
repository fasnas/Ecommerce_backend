 import express from "express"
 import { getOrder,addToOrders } from "../controller/orderController.js"
 import { createPayment,verifyPayment} from "../controller/paymentController.js"
 import { authenticate } from "../middleware/authMiddleware.js"

const orderRouter=express.Router()

orderRouter.post("verifypayment/:id",verifyPayment)
orderRouter.post("/createpayment/:id",createPayment)
orderRouter.post("/addtoorder",authenticate,(addToOrders))
orderRouter.get("/getorder",authenticate,(getOrder))

export default orderRouter