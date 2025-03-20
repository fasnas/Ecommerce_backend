import Joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator();

export const signupValidation = Joi.object({
    name: Joi.string().required().min(3).max(25),
    username: Joi.string().required().min(3).max(25),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    role: Joi.string().valid("user", "admin").optional()
});


export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});


export { validator };
