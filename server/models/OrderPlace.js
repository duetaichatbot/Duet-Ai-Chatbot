import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderName: { type: String, required: true, trim: true },
  pizzaSize: { type: String, required: true, trim: true },
  pizzaFlavour: { type: String, required: true, trim: true },
  qty: { type: Number, required: true, trim: true },
  status: { type: String, default: "pending" },
  createdOn: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
