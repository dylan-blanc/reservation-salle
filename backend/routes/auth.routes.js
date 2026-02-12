// routes/auth.routes.js
import { Router } from "express";
import {
  register,
  login,
  getProfile,
  googleLogin,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

// Routes publiques
router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);

// Routes protégées
router.get("/me", authMiddleware, getProfile);

export default router;
