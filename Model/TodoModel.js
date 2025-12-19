import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,   // ✅ only required on CREATE
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});



export default mongoose.model("Todo", todoSchema);
