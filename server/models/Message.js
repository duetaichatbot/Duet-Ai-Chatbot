import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    query: { type: String, required: true },
    from: String,
    createdOn: { type: Date, default: Date.now }
});
const messageModel = mongoose.model('messages', messageSchema);

export default messageModel;