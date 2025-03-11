import jwt from "jsonwebtoken";

export const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
