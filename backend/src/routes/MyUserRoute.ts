import express, { Router } from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

// POST req to /api/my/user
router.post("/", MyUserController.createCurrentUser);

export default router;
