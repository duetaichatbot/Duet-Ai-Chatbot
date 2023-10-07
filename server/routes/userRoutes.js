import express from "express";
import {
  userRegistration,
  userLogin,
  sendEmailResetPassword,
  userPasswordReset,
  verifyOtp,
  resendOtp,
} from "../controllers/userController.js";
const router = express.Router();


// Public Routes
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/forgot-password", sendEmailResetPassword);
router.post("/verify-otp", verifyOtp);
router.patch("/reset-password", userPasswordReset);
router.post("/resend-otp", resendOtp);



export default router;
