import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be first

import express from "express";
import cors from "cors";
import connectDb from "./Db/Db.js";

import authRoutes from "./Routes/authRoutes.js";
import todoRoutes from "./Routes/todoRoutes.js";
import noteRoutes from "./Routes/noteRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";

// Debug check (temporary)
console.log("MONGO_URI:", process.env.MONGO_URI);

connectDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
