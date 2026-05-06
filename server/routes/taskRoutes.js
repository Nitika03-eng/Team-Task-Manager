import express from "express";
import { createTask, getTasks, updateTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Base path is /api/tasks (defined in server.js)

// 1. POST /api/tasks -> Create Task (Admin only)
router.post("/", authMiddleware, isAdmin, createTask);

// 2. GET /api/tasks -> Get All Tasks for Admin OR My Tasks for Member
router.get("/", authMiddleware, getTasks);

// 3. PATCH /api/tasks/:id -> Update Task status
router.patch("/:id", authMiddleware, updateTask);

export default router;