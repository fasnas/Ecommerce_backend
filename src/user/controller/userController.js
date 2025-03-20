import usermodel from "../models/usermodel.js";
import { hashPassword, comparepassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";

export const userRegister = async (req, res) => {
  const { name, email, password, username,role } = req.body;

  const existUser = await usermodel.findOne({ email });
  if (existUser) {
    return res
      .status(400)
      .json({ success: false, message: `Email already exists` });
  }

  const hashedpassword = await hashPassword(password);
  const newUser = new usermodel({
    name,
    email,
    username,
    password: hashedpassword,
    role
  });
  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "Registered successfully",
  });
};

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const existUser = await usermodel.findOne({ email });

  if (!existUser) {
    return res
      .status(404)
      .json({ success: false, message: `User not exist. Please register` });
  }

  const passwordValidation = await comparepassword(password, existUser.password);

  if (!passwordValidation) {
    return res
      .status(401)
      .json({ success: false, message: `Password does not match` });
  }

  const token = generateToken(existUser);
  console.log(token);

  if (existUser.role === "admin") {
    return res.status(200).json({
      success: true,
      message: `admin logined successfully`,
      data: existUser,
      token,
    });
  }

  if (existUser.isBlocked === true) {
    return res
      .status(400)
      .json({ success: false, message: `user is blocked , contact admin` });
  }

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
  });
};
