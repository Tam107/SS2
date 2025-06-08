import { sendMail } from "../helpers/sendMail.js";
import Document from "../models/Document.js";
import User from "../models/User.js";
export const getDocumentByUser = async (req, res) => {
    try {
        const document = await Document.find({
            ownerId: req.params.idUser 
        })

        console.log(document);

       
        

        if (!document) {
            return res.status(200).json({
                success: false,
                message: "Document not found"
            });
        }
        const data = await Promise.all(
            document.map(async (doc) => {
                const infoTeacher = await User.findById(
                    doc.teacherGrade?.idTeacher,
                    "email username"
                );
                return {
                    ...doc.toObject(),
                    teacherInfo: infoTeacher
                        ? { email: infoTeacher.email, name: infoTeacher.username }
                        : null,
                };
            })
        );

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.log(error);
        
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
}
export const submitGrade = async (req,res)=>{
    try {
        const id = req.params.documentId;
        const body = req.body
        const idTeacher = body.idTeacher
       

        const data = await Document.updateOne({_id:id},{$set:{teacherGrade:body, isGraded:true}})

        const user = await User.updateOne({_id:idTeacher},  { $inc: { gradedCount: 1 } } // Tăng giá trị gradedCount lên 1
        )
        
        res.json({
            success:true,
            message:"Submit grade successfully",
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: "Error in BE"
        })
    }
}
export const getDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id)// Chỉ lấy các trường cần thiết (email, name)

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
            teacherGrade:{idTeacher:req.body.idTeacher}
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