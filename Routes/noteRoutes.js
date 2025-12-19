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
router.post("/unlock/:id", authMiddleware, unlockNote);
router.delete("/:id", authMiddleware, deleteNote);
router.post("/share/:id", authMiddleware, shareNote);
router.get("/share/:token", getSharedNote);
router.put("/:id", authMiddleware, updateNote);

export default router;
