import express from "express"
import { allProducts} from "../controller/productController.js"
import { productByCategory,viewSingleProduct } from "../controller/productController.js"
import { tryCatch } from "../../utils/tryCatch.js"
import { authenticate } from "../middleware/authMiddleware.js"


const productRouter=express.Router()

productRouter.get('/products',tryCatch(allProducts))
productRouter.get('/catagory/:catagory',tryCatch(productByCategory))
productRouter.get('/products/:id',tryCatch(viewSingleProduct))

export default productRouter