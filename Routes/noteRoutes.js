import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createNote,
  getNotes,
  unlockNote,
  deleteNote,
  shareNote,
  getSharedNote,
  updateNote
} from "../Controller/noteController.js";

const router = express.Router();

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);

// ✅ FIXED PATH
router.post("/:id/unlock", authMiddleware, unlockNote);

router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);
router.post("/share/:id", authMiddleware, shareNote);
router.get("/share/:token", getSharedNote);

export default router;
