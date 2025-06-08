import express from "express";
import {getDocument, invitedTeacher,submitGrade,getDocumentByUser} from "../controllers/document.js";



const router = express.Router();
router.get("/get/:id",getDocument)
router.get("/getByUser/:idUser",getDocumentByUser)
router.patch("/inviteTeacher/:documentId",invitedTeacher)
router.patch("/submitGrade/:documentId",submitGrade)







export default router;