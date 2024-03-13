import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const decode = JWT.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ error: "User not logged in" });
  }
};

// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user || user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
