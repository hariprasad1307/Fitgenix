import { Router } from "express";
import { saveDiet, getDiets } from "../controller/dietController";

const router = Router();

router.post("/save", saveDiet);
router.get("/", getDiets);

export default router;
