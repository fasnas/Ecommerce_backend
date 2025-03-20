import { verifyToken } from "../../utils/jwt.js";
import usermodel from "../models/usermodel.js";

//authenticate any user (Admin or Normal User)
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Access token missing or invalid format" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Access token is invalid or expired" });
    }

    console.log("Decoded Token:", decoded);

    const user = await usermodel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next(); 

  } catch (err) {
    console.error("Authentication Error:", err);
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

