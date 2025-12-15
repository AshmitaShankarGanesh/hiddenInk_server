import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
  userId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("Todo", todoSchema);
