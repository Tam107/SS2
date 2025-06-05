import express from "express";
import {getDocument, invitedTeacher,submitGrade} from "../controllers/document.js";



const router = express.Router();
router.get("/get/:id",getDocument)
router.patch("/inviteTeacher/:documentId",invitedTeacher)
router.patch("/submitGrade/:documentId",submitGrade)







export default router;