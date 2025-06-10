import express from "express";
import { getChatsByUserId,addChat } from "../controllers/chatController.js";



const router = express.Router();
router.get("/getByUserId/:id",getChatsByUserId)
router.post("/addChat",addChat)






export default router;