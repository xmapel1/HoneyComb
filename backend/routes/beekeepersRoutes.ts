import express from "express";
import * as beekeepersController from "../controllers/beekeepersController.js";

const router = express.Router();

router.post("/", beekeepersController.createBeekeeper);
router.get("/", beekeepersController.getBeekeepers);
router.get("/:id", beekeepersController.getBeekeepersById);
router.put("/:id", beekeepersController.updateBeekeepers);
router.delete("/:id", beekeepersController.deleteBeekeepers);

export default router;
