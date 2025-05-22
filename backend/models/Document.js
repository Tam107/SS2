import mongoose from "mongoose";


const DocumentSchema = new mongoose.Schema({
    title:String,
    content:String,
    ownerId:String,
    path:{type:Object},
    teacherGrade:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    },
    {timestamps: true}
)





export default mongoose.model("Document", DocumentSchema);