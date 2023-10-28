import express from "express";
import userModal from "../models/User.js";
import feedbackModel from "../models/Feedback.js";

const router = express.Router();

router.post("/post-feedback/:userId", async (req, res) => {
  try {
    const feedbackMessage = req.body.feedback;
    const userId = req.params.userId;
    const userExist = await userModal.findById(userId);

    if (userExist) {
      const newFeedback = new feedbackModel({
        userID: userExist._id,
        feedback: feedbackMessage,
      });

      const saveFeedback = await newFeedback.save();
      res.status(201).json({
        message: "feedback post successfully",
        feedback: saveFeedback,
      });
    } else {
      res.status(404).json("User Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internel server error");
  }
});


router.get("/get-feedbacks", async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find()
    .populate({
      path: "userID",
      model: "user",
      select: "name email avatar",
    });

    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json("Internel server error");
  }
});

export default router;
