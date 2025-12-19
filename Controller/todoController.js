import todoCollection from "../Model/todoModel.js";

// CREATE
export const addTodo = async (req, res) => {
  try {
    if (!req.body.todo) {
      return res.status(400).json({ message: "Todo is required" });
    }

    const data = new todoCollection({
      todo: req.body.todo,      // ✅ FIXED
      userId: req.user.id,
    });

    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ
export const getTodo = async (req, res) => {
  try {
    const todos = await todoCollection.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (MOST IMPORTANT)
export const updateTodo = async (req, res) => {
  try {
    const updated = await todoCollection.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: false } // ✅ FIX
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteTodo = async (req, res) => {
  try {
    await todoCollection.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
