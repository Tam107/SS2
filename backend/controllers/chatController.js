import Chat from "../models/Chat.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config()




const token = process.env.OPEN_API_KEY_3;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";
export const getChatsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Chat.find({ userId: id }).populate("userId", "name email _id")

        res.json({
            success: true,
            data
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
}
export const addChat = async (req, res) => {
    try {

        const newChat = new Chat(req.body);
        await newChat.save();

        const client = new OpenAI({ baseURL: endpoint, apiKey: token });

        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a chatbot designed to guide users on web interactions and answer their questions." },
                {
                    role: "user", content: `
                    User message: ${req.body.message}

                If the user's question is related to using a website where:
                - Users can register as teachers (pending admin approval) and then grade writing submissions from students (only when invited by students).
                - Teachers can view student requests by clicking the "Request" button, which shows a list of students who invited them to grade, and they can accept or decline.
                - Users can generate essay topics by clicking the "Generate Topic" button and choosing either "Generate Random Topic" or "Generate by Your Topic" to create topics based on a specific theme.
                - Users can view all their submitted IELTS essays by clicking the "History" button, which displays a list of submissions for selection.

                Then, provide a clear and concise answer based on these instructions, guiding the user on how to perform the relevant action on the website. If the question is unrelated to these website features, answer it naturally and accurately as a general-purpose chatbot
                Make sure that response must be in English language
                    ` }
            ],
            temperature: 1,
            top_p: 1,
            model: model
        });
        

        const dataAItmp = {
            AI:true,
            userId: req.body.userId,
            message: response.choices[0].message.content
        }
        const dataAI = new Chat(dataAItmp);
        await dataAI.save();


        res.json({
            success: true,
            dataAI

        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
}