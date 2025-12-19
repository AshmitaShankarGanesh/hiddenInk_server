import express from "express";
import authMiddleware, { isAdmin } from "../middleware/authMiddleware.js";
import User from "../Model/UserModel.js";
import Note from "../Model/NoteModel.js";
import { updateUserRole } from "../Controller/adminController.js";


const router = express.Router();

// 👥 Get all users
router.get("/users", authMiddleware, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 📝 Get all notes
router.get("/notes", authMiddleware, isAdmin, async (req, res) => {
  const notes = await Note.find().populate("user", "name email");
  res.json(notes);
});

// 📊 App stats
router.get("/stats", authMiddleware, isAdmin, async (req, res) => {
  const users = await User.countDocuments();
  const notes = await Note.countDocuments();
  const lockedNotes = await Note.countDocuments({ isLocked: true });

  res.json({ users, notes, lockedNotes });
});

// DELETE USER (admin only)
router.delete("/users/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

router.put("/users/:id/role", authMiddleware, isAdmin, updateUserRole);


export default router;
