import express from "express";
import {deleteUser, getAllUsers, getUsersRegistered,getUser, acceptedEssay,register,checkOtp,login,registerTeach, getTeacher} from "../controllers/userController.js";
import { verifyToken, verifyUser} from "../utils/verifyToken.js";
import {registerUserValidate,loginUserValidate} from "../validate/user.js";



const router = express.Router();

router.post('/register',registerUserValidate,register)
router.post('/checkOtp',checkOtp)
router.post('/login',loginUserValidate,login)
router.get("/getuser",verifyToken,getUser)
router.get("/getusersRegistered",getUsersRegistered)
router.get("/getTeacher",getTeacher)
router.patch("/register-teacher/:id",registerTeach)
router.patch("/acceptedEssay/:idDocument",verifyToken,acceptedEssay) // ✅ Update user information

router.post("/logout", (req, res) => {
    console.log("Cookies received on logout:", req.cookies); // Xem có token không

    
    res.clearCookie("token", { path: "/",sameSite: "none",
        secure: true, }); // Xóa cookie "token"
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });




// router.post("/logout", (req, res) => {
//     res.clearCookie("access_token", { httpOnly: true, secure: true, sameSite: "none" }) // ✅ Securely clear the cookie
//         .status(200)
//         .json({ message: "Logged out successfully" });
// });



// router.get("/check/:id",verifyUser ,(req, res, next) => {
//     res.send("Hello user, you're login and can delete your account")
// })

// router.get("/admin/:id",verifyAdmin ,(req, res, next) => {
//     res.send("Hello user, you're login and can delete all accounts")
// })




export default router;