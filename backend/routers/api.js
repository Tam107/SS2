import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai"
import Document from "../models/Document.js";

dotenv.config()




const token = process.env.OPEN_API_KEY_3;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";



const router = express.Router();
//get randiom title
router.get("/title", async (req, res) => {
    try {
        const client = new OpenAI({ baseURL: endpoint, apiKey: token });
        console.log(client);


        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics." },
                { role: "user", content: "Create a random IELTS Writing Task 2 question. The question should based on topics commonly found in real IELTS exams." }
            ],
            temperature: 0.5,
            top_p: 1,
            model: model,
            n: 1,
            presence_penalty: 0.5,
            frequency_penalty: 0.5,
        });
        console.log(response, 36);


        return res.json({
            success: true,
            data: response.choices[0].message.content,
        });
    } catch (error) {

        console.log(1);

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
//get title on topic
router.post("/title", async (req, res) => {
    try {
        const client = new OpenAI({ baseURL: endpoint, apiKey: token });
        const topic = req.body.topic;
        console.log(req.body);


        if (!topic) {
            return res.status(200).json({ error: 'Topic is required', success: false });
        }

        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics." },
                { role: "user", content: `Create a random IELTS Writing Task 2 question based on the topic: ${topic}. The question should be relevant to topics commonly found in real IELTS exams.`, }
            ],
            temperature: 0.5,
            top_p: 1,
            model: model,
            n: 1,
            presence_penalty: 0.5,
            frequency_penalty: 0.5,
        });

        return res.json({
            success: true,
            data: response.choices[0].message.content,
        });
    } catch (error) {


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
        const prompt = `Create a random IELTS Writing Task 2 question based on the topic: ${req.body.topic}. The question should be relevant to topics commonly found in real IELTS exams.`


        const result = await modelGoogle.generateContent(prompt);
        // console.log(result);
        return res.status(200).json({
            success: true,
            data: result.response.candidates[0].content.parts[0].text
        });

    }
});

//get band
router.post("/title2", async (req, res) => {
    try {
        const client = new OpenAI({ baseURL: endpoint, apiKey: token });
        console.log(req.body);




        const response = await client.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an IELTS Writing Task 2 examiner. Please evaluate the essay based on the following four criteria: Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Return each score separately along with a brief evaluation for each criterion."
                },
                {
                    role: "user",
                    content: `
                        Scoring this ielts writing with the result as this format below:
first you need write the full title of this ielts writing 
second scoring this ielts writing as the ielts 4 principles 
after that give me the total score and suggestion for improvement for each principle then give me the suggested sample based on the provided writing 
                "
${req.body.title}
                    ${req.body.content}
                "
                Give me the result in the following JSON format:{
  "full_title": "",
  "total_score": "",
  "Task_Response": {
    "score": "",
    "comment": ""
  },
  "Coherence_and_Cohesion": {
    "score": "",
    "comment": ""
  },
  "Lexical_Resource": {
    "score": "",
    "comment": ""
  },
  "Grammatical_Range_and_Accuracy": {
    "score": "",
    "comment": ""
  },
  "Suggestions_Improvement": {
    "Task_Response": "",
    "Coherence_and_Cohesion": "",
    "Lexical_Resource": "",
    "Grammatical_Range_and_Accuracy": ""
  },
  "Feedback":""
  "Band_9_Sample": ""
}
                (check nếu title hoặc content không có nghĩa thì chỉ trả ra 1 object json chứa success là false và chỉ cần thế thôi không được thêm các chữ khác)

                    `
                }
            ],
            temperature: 0.5,
            top_p: 1,
            model: "openai/gpt-4.1",
            n: 1,
            presence_penalty: 0.5,
            frequency_penalty: 0.5,
        });





        //  console.log(response.choices[0].message.content);
        const path = JSON.parse(response.choices[0].message.content);

        const doc = new Document({
            title: req.body.title,
            content: req.body.content,
            path: path,
            ownerId:req.body._id
        })
        await doc.save()



        return res.json({
            success: true,
            path,
            doc
            // evaluationResult
        });
    } catch (error) {
        console.log(error);


        return res.status(200).json({
            success: false,

        });

    }
});


router.get("/test", async (req, res) => {
    try {
        const client = new OpenAI({ baseURL: endpoint, apiKey: token });

        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "" },
                { role: "user", content: "What is the capital of France?" }
            ],
            temperature: 1,
            top_p: 1,
            model: model
        });

        console.log(response.choices[0].message.content);

        return res.json({
            success: true,
            
        });
    } catch (error) {

        console.log(1);
        console.log(error);


        res.json({
            success: false
        })

    }
});
export default router;