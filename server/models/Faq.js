import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  
});

const faqModal = mongoose.model("faq", faqSchema);

export default faqModal;
