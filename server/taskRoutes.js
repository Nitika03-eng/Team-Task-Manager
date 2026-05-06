import express from "express";
import { createTask, getTasks, updateTask } from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createTask);
router.get("/:projectId", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);

export default router;