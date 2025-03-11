import jwt from "jsonwebtoken";

// =JWT Authentication Middleware=
export const isAuthenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token not provided or invalid format.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token is missing.",
    });
  }

  try {
    const validateToken = jwt.verify(token,process.env.JWT_SECRET);

    if (!validateToken) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = validateToken;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Token verification failed: ${err.message}`,
    });
  }
};
