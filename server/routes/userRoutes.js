import express from "express";
import { getTeamMembers } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Check karein aapki file ka naam authMiddleware.js hai ya sirf auth.js

const router = express.Router();

// Admin jab team fetch karega
router.get("/team", authMiddleware, getTeamMembers);

export default router;