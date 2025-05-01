import express from "express";
import {getDocument} from "../controllers/document.js";



const router = express.Router();
router.get("/get/:id",getDocument)







export default router;