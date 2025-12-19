import express from "express";
import {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo
} from "../Controller/todoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addTodo);
router.get("/", authMiddleware, getTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
