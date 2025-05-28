import { sendMail } from "../helpers/sendMail.js";
import Document from "../models/Document.js";
import User from "../models/User.js";
export const getDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(200).json({
                success: false,
                message: "Document not found"
            });
        }
        res.status(200).json({
            success: true,
            data: document,
        });
    } catch (error) {
        console.log(error);
        
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
}
export const invitedTeacher = async (req,res)=>{
    try {
        const data = await  Document.updateOne({_id:req.params.documentId},{
            teacherGrade:req.body.idTeacher
        })
        const dataTeacher = await User.updateOne({_id:req.body.idTeacher},{
            $push:{
                EssaysId:{
                    id:req.params.documentId
                }
            }
        }
        )
        await sendMail({
            email: req.body.email, // Email của giáo viên
            subject: "New Essay Grading Request", // Tiêu đề email
            text: `Dear Teacher,

You have been invited to grade an essay by a student. Please log in to the system to review and grade the essay.

Access the system at: http://localhost:5173

Thank you for your support!

Best regards,
The Essay Grading System Team`,
        });
        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (error) {
        console.log(error);
        
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
}