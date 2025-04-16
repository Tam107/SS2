import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const OtpUserSchema = new mongoose.Schema({
    otp:String,
    email:String,
    expireAt: {
        type: Date,
        expires: 180,
    },
    username: {
      type: String,
      required: true,
      unique: true,
  },
  email: {
      type: String,
      required: true,
      unique: true,
  },
  password: {
      type: String,
      required: true,
  },
    avatar: String
},{
    timestamps:true
});
OtpUserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIREOTP,
  });
};
export default mongoose.model("OtpUser", OtpUserSchema);