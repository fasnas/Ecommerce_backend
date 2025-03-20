import { getCart,addToCart,decrementQuantity,incrementQuantity,removeFromCart} from "../controller/cartController.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from "express"
import { authenticate } from "../middleware/authMiddleware.js";

const cartRouter=express.Router()

cartRouter.post("/addtocart",authenticate,tryCatch(addToCart))
cartRouter.get("/getcart",authenticate,tryCatch(getCart))
cartRouter.post("/increase",authenticate,tryCatch(incrementQuantity))
cartRouter.post("/decrease",authenticate,tryCatch(decrementQuantity))
cartRouter.post("/remove",authenticate,tryCatch(removeFromCart))


export default cartRouter