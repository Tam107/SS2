import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import md5 from "md5"
const AdminSchema = new mongoose.Schema({
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
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
    // resetPasswordToken: String,
    // resetPasswordTime: Date,


},
    { timestamps: true }
)



// jwt token
AdminSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare password
// UserSchema.methods.comparePassword = async function (enteredPassword) {
//     return md5(enteredPassword) == this.password
// };


export default mongoose.model("Admin", AdminSchema);