import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      assignedTo: assignedTo.toLowerCase().trim(),
      dueDate,
      createdBy: req.user._id,
      status: "To-Do"
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "Admin") {
      tasks = await Task.find().sort({ createdAt: -1 });
    } else {
      const userEmail = req.user.email.toLowerCase().trim();
      tasks = await Task.find({ assignedTo: userEmail }).sort({ createdAt: -1 });
    }
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};