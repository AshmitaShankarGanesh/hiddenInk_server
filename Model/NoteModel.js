import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
      select: false 
    },

    password: {
      type: String, 
      select: false
    },

    isLocked: {
      type: Boolean,
      default: false
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    sharedToken: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model("Note", noteSchema);

