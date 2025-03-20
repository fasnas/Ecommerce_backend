import { getWhishlist,addToWhishlist } from "../controller/whishlistController.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from "express"
import { authenticate } from "../middleware/authMiddleware.js";

const whishlistRouter=express.Router()

whishlistRouter.post("/addtowish/:id",tryCatch(addToWhishlist))
whishlistRouter.get("/getwish/:id",tryCatch(getWhishlist))

export default whishlistRouter