import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDb from "./Db/Db.js";

import authRoutes from "./Routes/authRoutes.js";
import todoRoutes from "./Routes/todoRoutes.js";
import noteRoutes from "./Routes/noteRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";

connectDb();

const app = express();

// ✅ CORS (NO app.options needed)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://hiddenink.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
