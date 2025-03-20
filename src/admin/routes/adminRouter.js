import express from "express"
import { getAllUsers,viewaSpecificUser} from "../controller/adminUser.js"
import { addProduct,deleteProduct,allProducts,singleProduct,editProduct} from "../controller/adminProduct.js"
import { totalProductPurchased } from "../controller/adminDashboard.js"
import { tryCatch } from "../../utils/tryCatch.js"

import { totalRevenueGenerated ,totalProductCount,totalUserCount} from "../controller/adminDashboard.js"
import { removeSingleUser,blockAndUnblockUser} from "../controller/adminUser.js"
import { authenticate} from "../../user/middleware/authMiddleware.js"
import { authorizeAdmin } from "../middleware/authorization.js"

const adminRouter =express.Router()

//user related
adminRouter.get("/getalluser",authenticate,authorizeAdmin,tryCatch(getAllUsers))
adminRouter.get("/specificuser/:id",authenticate,authorizeAdmin,tryCatch(viewaSpecificUser))
adminRouter.delete("/remove/:id",authenticate,authorizeAdmin,tryCatch(removeSingleUser))
adminRouter.put("/block/:id",authenticate,authorizeAdmin,tryCatch(blockAndUnblockUser))

//products related
adminRouter.post("/addproduct",authenticate,authorizeAdmin,tryCatch(addProduct))
adminRouter.delete("/delete",authenticate,authorizeAdmin,tryCatch(deleteProduct))
adminRouter.patch("/edit",authenticate,authorizeAdmin,tryCatch(editProduct))
adminRouter.get("/allproducts",authenticate,authorizeAdmin,tryCatch(allProducts))
adminRouter.get("/specificproduct/:id",authenticate,authorizeAdmin,tryCatch(singleProduct))

//dashboard related 
adminRouter.get("/totalpurchase",authenticate,authorizeAdmin,tryCatch(totalProductPurchased))
adminRouter.get("/revenue",authenticate,authorizeAdmin,tryCatch(totalRevenueGenerated))
adminRouter.get("/productcount",authenticate,authorizeAdmin,totalProductCount)
adminRouter.get("/usercount",authenticate,authorizeAdmin,tryCatch(totalUserCount))


export default adminRouter