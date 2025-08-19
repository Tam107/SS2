import mongoose from "mongoose";


const DocumentSchema = new mongoose.Schema({
    title:String,
    content:String,
    ownerId:String,
    path:{type:Object},
    teacherGrade:{
        idTeacher:{
            type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        },
        Task_Response:{score:Number, comment:String},
        Lexical_Resource:{score:Number, comment:String},
        Grammatical_Range_and_Accuracy:{score:Number, comment:String},
        Coherence_and_Cohesion:{score:Number, comment:String},
        Overal:{score:Number, comment:String},
    },
    isGraded:Boolean,
    isAIAcess:Boolean
    },
    {timestamps: true}
)





export default mongoose.model("Document", DocumentSchema);