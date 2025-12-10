import express from "express";
import * as cellsController from "../controllers/cellsController.js";

const router = express.Router();

router.post("/", cellsController.createCell);
router.get("/", cellsController.getCell);
// router.put("/:id", cellsController.updateCell);
// router.delete("/:id", cellsController.deleteCell);

export default router;
