import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  avatar: { type: String, default: "uploads/user_profile.png" },
  otpCode: { type: Number },
  otpExpire: { type: Date },
});

const userModal = mongoose.model("user", userSchema);

export default userModal;
