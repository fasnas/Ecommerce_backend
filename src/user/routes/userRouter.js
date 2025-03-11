import { userRegister,loginHandler} from "../controller/userController.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from 'express'

const userRouter=express.Router()

userRouter.post("/register",tryCatch(userRegister))
userRouter.post("/login",tryCatch(loginHandler))


export default userRouter