import { sendAdminToken } from "../helpers/JsonToken.js"
import Admin from "../models/Admin.js"
import User from "../models/User.js";
// export const create = async(req,res)=>{
//     try {
//         const {username,email,password,phoneNumber} = req.body

//         const admin = new Admin({
//             username,
//             email,
//             password,
//             phoneNumber
//         })
//         await admin.save()
//         return res.json({
//             success: true,
//             message: "Admin created successfully",
//         })

//     } catch (error) {
//         console.log(error)
//         return res.json({
//             success: false,
//             message: "Error in BE",
//         })
//     }
// }

export const updateUserRole = async (req, res) => {
    try {
        if (!req.params.idUser) {
            return res.status(200).json({
                success: false,
                message: "User ID is required.",
            });
        }

        // Cập nhật trạng thái isRegister
        const updatedUser = await User.findByIdAndUpdate(
            req.params.idUser,
            { role: req.body.role },
            { new: true } 
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
            message: "Update successfully!",
            data: updatedUser,
        });

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email: email })
        if (!admin) {
            return res.json({
                success: false,
                message: "Admin not found",
            })
        }

        sendAdminToken(admin, 201, res)



    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}
export const getAdmin = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.admin,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
}