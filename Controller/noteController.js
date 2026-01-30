import Note from "../Model/NoteModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

/* ---------------- CREATE NOTE ---------------- */
export const createNote = async (req, res) => {
  try {
    const { title, content, isLocked, password } = req.body;

    let hashedPassword = null;
    if (isLocked) {
      if (!password) {
        return res.status(400).json({ message: "Password required for locked note" });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const note = await Note.create({
      title,
      content,
      isLocked,
      password: hashedPassword,
      userId: req.user.id,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to create note" });
  }
};

/* ---------------- GET ALL NOTES ---------------- */
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id })
      .select("title isLocked sharedToken createdAt");

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

/* ---------------- UNLOCK NOTE ---------------- */
export const unlockNote = async (req, res) => {
  try {
    const { password } = req.body;

    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).select("+password +content");

    if (!note || !note.isLocked) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (!note.password) {
      return res.status(400).json({ message: "This note has no password set" });
    }

    const valid = await bcrypt.compare(password, note.password);
    if (!valid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.json({
      _id: note._id,
      title: note.title,
      content: note.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unlock failed" });
  }
};

/* ---------------- UPDATE NOTE ---------------- */
export const updateNote = async (req, res) => {
  try {
    const { title, content, isLocked, newPassword } = req.body;

    const updateData = { title, isLocked };

    if (content !== undefined) {
      updateData.content = content;
    }

    if (isLocked && newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    if (!isLocked) {
      updateData.password = null;
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { new: true }
    );

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* ---------------- DELETE NOTE ---------------- */
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

/* ---------------- SHARE NOTE ---------------- */
export const shareNote = async (req, res) => {
  try {
    const token = crypto.randomBytes(20).toString("hex");

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { sharedToken: token },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({
      shareUrl: `http://localhost:5173/share/${token}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Share failed" });
  }
};

/* ---------------- GET SHARED NOTE ---------------- */
export const getSharedNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      sharedToken: req.params.token,
    });

    if (!note) {
      return res.status(404).json({ message: "Invalid or expired link" });
    }

    if (note.isLocked) {
      return res.json({
        title: note.title,
        isLocked: true,
        message: "This note is locked",
      });
    }

    res.json({
      title: note.title,
      content: note.content,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load shared note" });
  }
};
