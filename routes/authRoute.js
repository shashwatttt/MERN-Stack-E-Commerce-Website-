//for making routes

import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing

//register by method: POST
router.post("/register", registerController);

//login by method: POST
router.post("/login", loginController);

//forgot pswd
router.post("/forgot", forgotController);

//test route by get method
router.get("/test", requireSignIn, isAdmin, testController);

//protected route for user
router.get("/auth-user", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route for admin
router.get("/auth-admin", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
