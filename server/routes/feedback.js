import express from "express";
import userModal from "../models/User.js";
import feedbackModel from "../models/Feedback.js";
const router = express.Router();

router.post("/post-feedback", async (req, res) => {
  try {
    const feedbackMessage = req.body.feedback;
    const email = req.body.email;
    const userExist = await userModal.findOne({ email: email });

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
    const feedbacks = await feedbackModel.find().populate({
      path: "userID",
      model: "user",
      select: "name email avatar",
    });

    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json("Internel server error");
  }
});

router.patch("/update-feedback/:feedbackId/:userId", async (req, res) => {
  try {
    const feedback = req.body.feedback;
    const userId = req.params.userId;
    const feedbackId = req.params.feedbackId;

    const userExist = await userModal.findById(userId);
    const feedbackExists = await feedbackModel.findById(feedbackId);

    if (!userExist) {
      res.status(404).json("User Not Found");
    }

    if (!feedbackExists) {
      res.status(404).json("Feedback Not Found");
    }

    if (feedbackExists.userID.toString() === userId) {
      feedbackExists.feedback = feedback || feedbackExists.feedback;

      const updateFeedback = await feedbackExists.save();
      res
        .status(200)
        .json({ message: "Update Feedback Successfully", updateFeedback });
    } else {
      res.status(401).json("Unauthorized Access");
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.delete("/delete-feedback/:feedbackId/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const feedbackId = req.params.feedbackId;

    const userExist = await userModal.findById(userId);
    const feedbackExists = await feedbackModel.findById(feedbackId);

    if (!userExist) {
      res.status(404).json("User Not Found");
    }

    if (!feedbackExists) {
      res.status(404).json("Feedback Not Found");
    }

    if (feedbackExists.userID.toString() === userId) {
      const deletedFeedback = await feedbackModel.findByIdAndDelete(
        feedbackExists._id
      );

      res
        .status(200)
        .json({ message: "Delete Feedback Successfully", deletedFeedback });
    } else {
      res.status(401).json("Unauthorized Access");
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

export default router;
