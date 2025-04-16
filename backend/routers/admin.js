import express from "express";
import { login,getAdmin,updateUserRole } from "../controllers/adminController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
// router.post("/create",create );
router.post("/login",login);
router.get("/getAdmin",verifyAdmin,getAdmin)
router.patch("/updateUserRole/:idUser",updateUserRole)
export default router;