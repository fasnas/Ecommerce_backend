import express from "express"
import { allProducts,addProduct} from "../controller/productController.js"
import { productByCategory,viewSingleProduct } from "../controller/productController.js"
import { tryCatch } from "../../utils/tryCatch.js"
import { isAuthenticate } from "../middleware/authMiddleware.js"

const productRouter=express.Router()

productRouter.get('/products',tryCatch(allProducts))
productRouter.post('/addProduct',isAuthenticate,tryCatch(addProduct))
productRouter.get('/catagory/:catagory',tryCatch(productByCategory))
productRouter.get('/products/:id',tryCatch(viewSingleProduct))

export default productRouter