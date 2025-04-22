import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai"
dotenv.config()




const token = process.env.OPEN_API_KEY_3;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";



const router = express.Router();

router.get("/title", async (req, res) => {
    try {
        const client = new OpenAI({ baseURL: endpoint, apiKey: token });

        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics." },
                { role: "user", content: "Create a random IELTS Writing Task 2 question. The question should based on topics commonly found in real IELTS exams." }
            ],
            temperature: 0.5,
            top_p: 1,
            model: "openai/gpt-4.1",
            n: 1,
            presence_penalty: 0.5,
            frequency_penalty: 0.5,
        });

        return res.json({
            success: true,
            data: response.choices[0].message.content,
        });
    } catch (error) {
        console.log(123);
        
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const modelGoogle = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.5,

            },
            systemInstruction: {
                role: "system",
                parts: [
                    { text: "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics." }
                ]
            }
        });
        const prompt = "Create a random IELTS Writing Task 2 question that is popular in 2025. The question should based on topics commonly found in real IELTS exams.";


        const result = await modelGoogle.generateContent(prompt);
        // console.log(result);
        return res.status(200).json({
            success: true,
            data: result.response.candidates[0].content.parts[0].text
        });
       
    }
});
router.post("/title", async (req, res) => {
    try {
        const client = new OpenAI({ baseURL: endpoint, apiKey: token });
        const topic = req.body.topic;

        if (!topic) {
            return res.status(200).json({ error: 'Topic is required',success:false });
        }

        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics." },
                { role: "user", content: `Create a random IELTS Writing Task 2 question based on the topic: ${topic}. The question should be relevant to topics commonly found in real IELTS exams.`, }
            ],
            temperature: 0.5,
            top_p: 1,
            model: "openai/gpt-4.1",
            n: 1,
            presence_penalty: 0.5,
            frequency_penalty: 0.5,
        });

        return res.json({
            success: true,
            data: response.choices[0].message.content,
        });
    } catch (error) {
        console.log(123);
        
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const modelGoogle = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.5,

            },
            systemInstruction: {
                role: "system",
                parts: [
                    { text: "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics." }
                ]
            }
        });
        const prompt = `Create a random IELTS Writing Task 2 question based on the topic: ${topic}. The question should be relevant to topics commonly found in real IELTS exams.`


        const result = await modelGoogle.generateContent(prompt);
        // console.log(result);
        return res.status(200).json({
            success: true,
            data: result.response.candidates[0].content.parts[0].text
        });
       
    }
});

router.get("/title2", async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const modelGoogle = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.5,

            },
            systemInstruction: {
                role: "system",
                parts: [
                    { text: "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics." }
                ]
            }
        });
        const prompt = "Create a random IELTS Writing Task 2 question that is popular in 2025. The question should based on topics commonly found in real IELTS exams.";


        const result = await modelGoogle.generateContent(prompt);
        // console.log(result);
        return res.status(200).json({
            success: true,
            data: result.response.candidates[0].content.parts[0].text
        });

    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(200).json({
            success: false,
            message: "Please try again",
        });
    }
});

export default router;