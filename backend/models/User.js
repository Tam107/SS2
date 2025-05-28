import mongoose from "mongoose";
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import md5 from "md5"


const UserSchema = new mongoose.Schema({
        username: {
            type: String,
          
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: false,
        },
        googleId: {type: String, required: false},

      
        role: {
            type: String,
            default: "user",
        },
        avatar: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        resetPasswordToken: String,
        resetPasswordTime: Date,

        isRegister: {
            type:Boolean,
            default:false
        },
        gradedCount:Number,
        EssaysId: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến tài liệu "Document"
                    ref: "Document",
                },
                isAccepted: {
                    type: Boolean,
                    default: false,
                },
            },
        ],


    },
    {timestamps: true}
)



// jwt token
UserSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return md5(enteredPassword) == this.password
};


export default mongoose.model("User", UserSchema);