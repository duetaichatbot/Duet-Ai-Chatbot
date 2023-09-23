import express from 'express';
import faqModal from '../models/Faq.js';

const router = express.Router();

router.post("/post-faq", async (req, res) => {
    try {
        const { question, answer } = req.body; 

        const newFaq = new faqModal({
            question: question,
            answer: answer
        });

        const faq = await newFaq.save();

        res.status(201).json(faq);
    } catch (error) {
        console.log(error); 
        res.status(500).json("Internal server error");
    }
});

router.get("/get-faqs", async (req, res) => {
    try {
        const faqs  = await faqModal.find();
        res.status(200).json(faqs);
    } catch (error) {
        console.log(error); 
        res.status(500).json("Internal server error");
    }
});

export default router;