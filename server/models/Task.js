import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: String, required: true }, // Employee Email
  status: { 
    type: String, 
    enum: ["To-Do", "In-Progress", "Completed"], 
    default: "To-Do" 
  },
  dueDate: { type: Date }, // Naya Field
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;