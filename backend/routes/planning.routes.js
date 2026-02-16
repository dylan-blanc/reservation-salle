// backend/routes/planning.routes.js
import express from "express";
import {
  createPlanning,
  getPlanning,
  getPlanningById,
  updatePlanning,
  deletePlanning,
} from "../controllers/planning.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Toutes les routes de planning nécessitent d'être connecté
router.use(authMiddleware);

router.post("/", createPlanning);
router.get("/", getPlanning);
router.get("/:id", getPlanningById);
router.put("/:id", updatePlanning);
router.delete("/:id", deletePlanning);

export default router;
