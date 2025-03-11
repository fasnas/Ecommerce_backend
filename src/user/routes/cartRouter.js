import { getCart,addToCart,decrementQuantity,incrementQuantity,removeFromCart} from "../controller/cartController.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from "express"
import { isAuthenticate } from "../middleware/authMiddleware.js";

const cartRouter=express.Router()

cartRouter.post("/addtocart/:id",isAuthenticate,tryCatch(addToCart))
cartRouter.get("/getcart/:id",isAuthenticate,tryCatch(getCart))
cartRouter.post("/increase/:id",isAuthenticate,tryCatch(incrementQuantity))
cartRouter.post("/decrease/:id",isAuthenticate,tryCatch(decrementQuantity))
cartRouter.post("/remove/:id",isAuthenticate,tryCatch(removeFromCart))

export default cartRouter