import express from "express";
import {
  createFeedback,
  getAllFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";
const router = express.Router();

router.post("/post-feedback", createFeedback);

router.get("/get-feedbacks", getAllFeedback);

router.patch("/update-feedback/:feedbackId/:userId", updateFeedback);

router.delete("/delete-feedback/:feedbackId/:userId", deleteFeedback);

export default router;
