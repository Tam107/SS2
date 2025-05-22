import express from "express";
import {getDocument, invitedTeacher} from "../controllers/document.js";



const router = express.Router();
router.get("/get/:id",getDocument)
router.patch("/inviteTeacher/:documentId",invitedTeacher)







export default router;