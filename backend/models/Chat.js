import mongoose from "mongoose";


const ChatSchema = new mongoose.Schema({
    AI:Boolean,
    message:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},
    {timestamps: true}
)





export default mongoose.model("Chat", ChatSchema);