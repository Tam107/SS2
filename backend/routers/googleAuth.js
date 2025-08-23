import express from "express";
import { loginWithGoogle, googleOAuth } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", loginWithGoogle);
router.get("/oauth", googleOAuth);

export default router;
