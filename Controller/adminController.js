import User from "../Model/UserModel.js";

export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const userId = req.params.id;

  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  if (role === "user") {
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      return res.status(400).json({
        message: "At least one admin is required",
      });
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  );

  res.json(user);
};
