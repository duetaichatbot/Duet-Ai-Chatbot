import userModal from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";
import dotenv from "dotenv";
dotenv.config();

// register new user...
const userRegistration = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  const user = await userModal.findOne({ email: email });
  if (user) {
    res.status(400).json({ status: "failed", message: "Email already exists" });
  } else {
    if (name && email && password && cpassword) {
      if (password === cpassword) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const createUser = new userModal({
            name: name,
            email: email,
            password: hashPassword,
          });

          const newUser = await createUser.save();
          // Now generate JWT
          const token = jwt.sign(
            { userID: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res.status(201).json({ user: newUser, token, status: "successful" });
        } catch (error) {
          res.status(500).json({ message: "Internal server error! try later" });
        }
      } else {
        res
          .status(400)
          .json({ message: "password and confirm password not matched" });
      }
    } else {
      res.status(400).json({ message: "All Fields are required" });
    }
  }
};

//  user login..
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await userModal.findOne({ email: email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          // Now generate JWT
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res.status(200).json({ user, token, status: "successful" });
        } else {
          res.status(400).json({ message: "invalid email or password" });
        }
      } else {
        res.status(404).json({ message: "You are not registered" });
      }
    } else {
      res.status(400).json({ message: "All Fields are required" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error! try later" });
  }
};

// change user password after login through settings etc..
const changeUserPassword = async (req, res) => {
  const { password, cpassword } = req.body;
  if (password && cpassword) {
    if (password === cpassword) {
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);
      await userModal.findByIdAndUpdate(req.user._id, {
        $set: { password: newHashPassword },
      });
      res.send({ status: "200", message: "change password successfully" });
    } else {
      res.send({
        status: "failed",
        message: "password and confirm password not matched",
      });
    }
  } else {
    res.send({ status: "failed", message: "All Fields are required" });
  }
};

// forget password to send email...
const sendEmailResetPassword = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await userModal.findOne({ email: email });
    if (user) {
      // const secret = user._id + process.env.JWT_SECRET_KEY;
      // const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "1d" });
      // const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;

      // create otp
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      user.otpCode = otpCode;
      user.otpExpire = Date.now() + 600000;
      console.log(otpCode, "code here otp.....");
      // send email...
      // let info = await transporter.sendMail({
      //   from: "duetaichatbot@gmail.com",
      //   to: user.email,
      //   subject: "DUET AI CHATBOT Password Reset Link",
      //   html: `<p>Confirm Your OTP ${otpCode}</p>`,
      // });

      // save otp in user schema...
      await user.save();

      res.status(200).json({
        status: "success",
        message: "Email Sent.. Check Your Email",
        // info: info,
      });
    } else {
      res
        .status(404)
        .json({ status: "failed", message: "Email does not exist" });
    }
  } else {
    res.status(500).json({ status: "failed", message: "Email is required" });
  }
};

// After email send allow password reset..
const userPasswordReset = async (req, res) => {
  const { password, cpassword } = req.body;
  const { id, token } = req.params;
  const user = await userModal.findById(id);
  const new_secret = user._id + process.env.JWT_SECRET_KEY;
  try {
    console.log(token, "xxxxx", new_secret);
    jwt.verify(token, new_secret);
    if (password && cpassword) {
      if (password === cpassword) {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await userModal.findByIdAndUpdate(id, {
          $set: { password: newHashPassword },
        });
        res.send({ status: "200", message: "Password reset successfully" });
      } else {
        res.send({ status: "failed", message: "Passwords do not match" });
      }
    }
  } catch (error) {
    res.send({ status: "failed", message: "Token does not match" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp; 
    const email = req.headers.email;

    const findUser = await userModal.findOne({ email: email });

    if (!findUser) {
      return res.status(404).json({ status: "failed", message: "User not found!" }); // Use 404 for "Not Found"
    }

    if (findUser.otpExpire < Date.now()) {
      return res.status(400).json({
        status: "failed",
        message: "Your OTP code is expired, resend otp",
      });
    }

    if (findUser.otpCode.toString() === otp.toString()) {
      return res.status(200).json({ status: "successful", message: "OTP verified!" }); // Correct the typo 'successfull' to 'successful'
    }

    res.status(400).json({ status: "failed", message: "Invalid code" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ status: "failed", message: "Internal server error" }); // Add a meaningful response for internal server error
  }
};


export {
  userRegistration,
  userLogin,
  changeUserPassword,
  sendEmailResetPassword,
  userPasswordReset,
  verifyOtp,
};
