import { userRegister,loginHandler} from "../controller/userController.js";
import express from 'express'
import { signupValidation,loginValidation } from "../middleware/validation.js";
import { validator } from "../middleware/validation.js";


const userRouter=express.Router()

userRouter.post("/register",validator.body(signupValidation),userRegister)
userRouter.post("/login",validator.body(loginValidation),loginHandler)


export default userRouter   