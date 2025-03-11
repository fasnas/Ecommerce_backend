import { getWhishlist,addToWhishlist } from "../controller/whishlistController.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from "express"
import { isAuthenticate } from "../middleware/authMiddleware.js";

const whishlistRouter=express.Router()

whishlistRouter.post("/addtowish/:id",isAuthenticate,tryCatch(addToWhishlist))
whishlistRouter.get("/getwish/:id",isAuthenticate,tryCatch(getWhishlist))

export default whishlistRouter