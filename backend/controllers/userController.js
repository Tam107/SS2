import User from "../models/User.js";
import {generateRandomNumber} from "../helpers/generateHepler.js"
import {sendMail} from "../helpers/sendMail.js"
import OtpUser from "../models/OtpUser.js"
// import {deleteImg} from "../middlewares/uploadImageToCloudinary.js"
import { sendToken,sendOtpToken } from "../helpers/JsonToken.js";
import jwt from 'jsonwebtoken'
import md5 from "md5";
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management API
 */



export const registerTeach = async (req, res, next) => {
    try {
        // Kiểm tra xem id có tồn tại hay không
        if (!req.params.id) {
            return res.status(200).json({
                success: false,
                message: "User ID is required.",
            });
        }

        // Cập nhật trạng thái isRegister
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { isRegister: true },
            { new: true} // runValidators để đảm bảo dữ liệu hợp lệ
        );

        // Nếu không tìm thấy user
        if (!updatedUser) {
            return res.status(200).json({
                success: false,
                message: `No user found with ID: ${req.params.id}`,
            });
        }

        // Trả về kết quả thành công
        return res.status(200).json({
            success: true,
            message: "Registered",
            data: updatedUser,
        });
    } catch (err) {
        console.error(err); // Log lỗi để dễ dàng gỡ lỗi
        return res.status(200).json({
            success: false,
            message: "An error occurred while registering the teacher.",
        });
    }
};

export const getUsersRegistered = async (req, res, next) => {
    try {
        const users = await User.find({isRegister:true}).select("username email role isRegister createdAt");
        // console.log(users);
        
        res.status(200).json({
            success: true,
            users,
          });
    } catch (error) {
        return res.json({
            success:false,
            message:"Error in BE"
        })
    }
}
export const register = async (req, res, next) => {
    try {
        

        const { username, email, password } = req.body;
        const userEmail = await User.findOne({ email });
        const otpEmail = await OtpUser.findOne({ email });

        if (userEmail || otpEmail) {
           
            return res.json({
                success: false,
                message: "Email already exist",
              });
        }
      
        const user = {
            username: username,
            email: email,
            password: password,
         
        };

        const otp = generateRandomNumber(6)
        const objectOtpUser = {
            otp:otp,
            expireAt:  Date.now(),
            username: username,
            email: email,
            password: md5(password),
        }
       

        try {
            const otpUser = new OtpUser(objectOtpUser)
            await otpUser.save()  

            await sendMail({
                email:email,
                subject:"[SS2 FINAL] Please verify your device",
                text: `Hello ${username},\n\nA sign-in attempt requires further verification because we did not recognize your device. To complete the sign-in, enter the verification code below:\n\nVerification code: ${objectOtpUser.otp}\n\nIf you did not attempt to sign in, your password may be compromised. Please take the necessary actions to secure your account.`
            })
            

            sendOtpToken(otpUser, 200, res)

        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: "token expired",
            })
        }
      

    } catch (error) {
        return res.json({
            success: false,
            message: "Error in BE",
          });
    }
}

export const checkOtp = async (req, res, next) => {
    try {
        

        const { otp, } = req.body;
        const {tokenOtp} = req.cookies
        if(!tokenOtp){
            return res.json({
                success: false,
                message: "OTP has expired. Please request a new one.",
                code: 401
              });
        }
        try {
            const decoded = jwt.verify(tokenOtp,process.env.JWT_SECRET);     
            const otpEntity = await OtpUser.findOne({ _id:decoded.id });
            if(!otpEntity){
                return res.json({
                    success: false,
                    message: "OTP has expired. Please request a new one.",
                    code:401
                });
            }
            if(otpEntity.otp !== otp){
                return res.json({
                    success: false,
                    message: "Incorrect OTP. Please try again.",
                });
            }
            const user = new User({
                username: otpEntity?.username,
                email: otpEntity?.email,
                password: otpEntity?.password,
                avatar: otpEntity?.avatar
            })
            await user.save()
            return res.json({
                success: true,
                message: "Your account has been successfully created!",
            });
           
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: "Token expired",
            });
        }
       
        
     
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
          });
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id
            , {$set: req.body}
            , {new: true}) // return updated document
        if (!updatedUser) {
            res.status(404).json({message: "No User found with id " + req.params.id})
            return;
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser= await User.findByIdAndDelete(req.params.id) // return updated document
        if (!deletedUser) {
            res.status(404).json({message: "No User found with id " + req.params.id})
            return;
        }
        res.status(200).json(deletedUser);
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user:req.user,
          });
    } catch (error) {
        return res.json({
            success:false,
            message:"Error in BE"
        })
    }
}
export const acceptedEssay =async (req,res)=>{
    try {

        console.log(req.params.idDocument,"hi");
        
        const data = await User.updateOne({_id:req.user._id,"EssaysId.id":req.params.idDocument},{ $set: { "EssaysId.$.isAccepted": true } } )
        res.status(200).json({
            success: true,
            data
          });
    } catch (error) {
        return res.json({
            success:false,
            message:"Error in BE"
        })
    }
}

export const getTeacher = async (req, res, next) => {
    try {
        const users = await User.find({role:"teacher"}).select("-password");
        console.log(users);
        
        res.status(200).json({
            success: true,
            users,
          });
    } catch (error) {
        return res.json({
            success:false,
            message:"Error in BE"
        })
    }
}

export const getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
}
export const login = async (req, res, next) => {
    try {

        const {email,password} = req.body
        const user = await User.findOne({email})
    

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesn't exists!"
            })
        }

        
        const isPass = await user.comparePassword(password)
       
        if(!isPass){
            return res.status(400).json({
                success:false,
                message:"Password is not correct!"
            })
        }
        sendToken(user, 201,res)

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in BE"
        })
    }
}