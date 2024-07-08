import express, { Router } from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// POST req to /api/my/user
router.post("/", jwtCheck, MyUserController.createCurrentUser);

export default router;
