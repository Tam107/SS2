import jwt from 'jsonwebtoken';
// import {createError} from "./error.js";
import User from "../models/User.js";
// import Admin from "../models/Admin.js";
import dotenv from "dotenv";
import Admin from '../models/Admin.js';
dotenv.config();    

export const verifyToken = async(req, res, next) => {
    
    
    const {token} = req.cookies    
    
    if(!token){
        return res.status(200).json({
            success:false,
            message:"Please login to continue"
        })
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user  = await User.findOne({_id:decode.id}).select("-password").populate("EssaysId.id")
        req.user = user
        next()

    } catch (error) {
        return res.status(200).json({
            success:false,
            message:"Please login to continue"
        })
    }
}


export const verifyUser =  (req, res, next) => {
    //  verifyToken(req, res, ()=>{
    //     if(req.user.id === req.params.id || req.user.isAdmin) {
    //         next();
    // }else{
    //         return next(createError(403, "You are not authenticated"));
    //     }
    // });

}

export const verifyAdmin =  async(req, res, next) => {
      const {tokenAdmin} = req.cookies
   
        
    if(!tokenAdmin){
        return res.status(200).json({
            success:false,
            message:"Please login to continue"
        })
    }
    try {
        const decode = jwt.verify(tokenAdmin,process.env.JWT_SECRET);

        const admin  = await Admin.findOne({_id:decode.id}).select("-password")
        req.admin = admin
     
        
        next()

    } catch (error) {
        return res.status(200).json({
            success:false,
            message:"Please login to continue"
        })
    }
};