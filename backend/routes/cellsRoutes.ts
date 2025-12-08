import express from "express";
import * as cellsController from "../controllers/cellsController.js";

const router = express.Router();

router.post("/", cellsController.createCell);
router.get("/", cellsController.getCell);
// router.put("/:id", smultronController.updateSmultron);
// router.delete("/:id", smultronController.deleteSmultron);

export default router;
