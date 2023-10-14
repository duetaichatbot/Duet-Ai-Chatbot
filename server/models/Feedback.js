import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },

  feedback: { type: String, require: true },
});

const feedbackModel = mongoose.model("feedback", feedbackSchema);

export default feedbackModel;
