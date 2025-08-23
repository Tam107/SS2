import express from "express";
import {
    getRandomTitle,
    getTitleOnTopic,
    evaluateEssay,
    testAI,
    saveLearningData,
} from "../controllers/aiController.js";

const router = express.Router();

router.get("/title", getRandomTitle);
router.post("/title", getTitleOnTopic);
router.post("/title2", evaluateEssay);
router.get("/test", testAI);
router.post("/learning/:id", saveLearningData);

export default router;
