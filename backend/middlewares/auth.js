import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const {token} = req.headers; // get Authorization header
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }


    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // verify token
    req.userId = token_decode.id; // attach userId to request
    next(); // move to next middleware/route handler
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  } 
};

export default authMiddleware;
