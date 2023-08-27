import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderName: { type: String, required: true },
  pizzaSize: { type: String, required: true },
  pizzaFlavour: { type: String, required: true },
  qty: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdOn: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
