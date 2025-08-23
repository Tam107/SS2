import dotenv from "dotenv";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Document from "../models/Document.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const token = process.env.OPEN_API_KEY_3;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

async function getOpenAIClient() {
    return new OpenAI({ baseURL: endpoint, apiKey: token });
}

function getGoogleModel() {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    return genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { temperature: 0.5 },
        systemInstruction: {
            role: "system",
            parts: [
                {
                    text: "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics.",
                },
            ],
        },
    });
}

// ---------------- Controllers ----------------
export const getRandomTitle = async (req, res) => {
    try {
        const client = await getOpenAIClient();

        const response = await client.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics.",
                },
                {
                    role: "user",
                    content:
                        "Create a random IELTS Writing Task 2 question. The question should based on topics commonly found in real IELTS exams.",
                },
            ],
            temperature: 0.5,
            top_p: 1,
            model,
            n: 1,
            presence_penalty: 0.5,
            frequency_penalty: 0.5,
        });

        return res.json({
            success: true,
            data: response.choices[0].message.content,
        });
    } catch (error) {
        const modelGoogle = getGoogleModel();
        const result = await modelGoogle.generateContent(
            "Create a random IELTS Writing Task 2 question that is popular in 2025. The question should based on topics commonly found in real IELTS exams."
        );

        return res.status(200).json({
            success: true,
            data: result.response.candidates[0].content.parts[0].text,
        });
    }
};

export const getTitleOnTopic = async (req, res) => {
    try {
        const client = await getOpenAIClient();
        const topic = req.body.topic;

        if (!topic) {
            return res.status(200).json({ error: "Topic is required", success: false });
        }

        const response = await client.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful assistant who generates IELTS Writing Task 2 questions based on real-life past exam topics.",
                },
                {
                    role: "user",
                    content: `Create a random IELTS Writing Task 2 question based on the topic: ${topic}. The question should be relevant to topics commonly found in real IELTS exams.`,
                },
            ],
            temperature: 0.5,
            top_p: 1,
            model,
            n: 1,
            presence_penalty: 0.5,
            frequency_penalty: 0.5,
        });

        return res.json({
            success: true,
            data: response.choices[0].message.content,
        });
    } catch (error) {
        const modelGoogle = getGoogleModel();
        const prompt = `Create a random IELTS Writing Task 2 question based on the topic: ${req.body.topic}. The question should be relevant to topics commonly found in real IELTS exams.`;

        const result = await modelGoogle.generateContent(prompt);
        return res.status(200).json({
            success: true,
            data: result.response.candidates[0].content.parts[0].text,
        });
    }
};

export const evaluateEssay = async (req, res) => {
    try {
        const client = await getOpenAIClient();

        const response = await client.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "You are an IELTS Writing Task 2 examiner. Please evaluate the essay based on the following four criteria: Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Return each score separately along with a brief evaluation for each criterion.",
                },
                {
                    role: "user",
                    content: `
Scoring this IELTS writing with the result as this format below:
first you need write the full title of this IELTS writing 
second scoring this IELTS writing as the IELTS 4 principles 
after that give me the total score and suggestion for improvement for each principle then give me the suggested sample based on the provided writing 

Title: ${req.body.title}
Essay: ${req.body.content}

Give me the result ONLY in valid JSON format (no markdown, no explanation). Format:
{
  "full_title": "",
  "total_score": "",
  "Task_Response": { "score": "", "comment": "" },
  "Coherence_and_Cohesion": { "score": "", "comment": "" },
  "Lexical_Resource": { "score": "", "comment": "" },
  "Grammatical_Range_and_Accuracy": { "score": "", "comment": "" },
  "Suggestions_Improvement": {
    "Task_Response": "",
    "Coherence_and_Cohesion": "",
    "Lexical_Resource": "",
    "Grammatical_Range_and_Accuracy": ""
  },
  "Feedback": "",
  "Band_9_Sample": ""
}
(check nếu title hoặc content không có nghĩa thì chỉ trả ra 1 object json chứa {"success": false})
                    `,
                },
            ],
            temperature: 0.5,
            top_p: 1,
            model,
            n: 1,
            presence_penalty: 0.5,
            frequency_penalty: 0.5,
            response_format: { type: "json_object" },
        });

        let parsed;
        try {
            parsed = JSON.parse(response.choices[0].message.content);
        } catch (e) {
            return res
                .status(200)
                .json({ success: false, error: "Invalid JSON returned by model" });
        }

        const doc = new Document({
            title: req.body.title,
            content: req.body.content,
            path: parsed,
            ownerId: req.body._id,
        });
        await doc.save();

        return res.json({ success: true, path: parsed, doc });
    } catch (error) {
        if (error.code === "RateLimitReached") {
            return res.status(429).json({
                success: false,
                error: "Rate limit exceeded, please retry later.",
            });
        }
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const testAI = async (req, res) => {
    try {
        const client = await getOpenAIClient();
        await client.chat.completions.create({
            messages: [
                { role: "system", content: "" },
                { role: "user", content: "What is the capital of France?" },
            ],
            temperature: 1,
            top_p: 1,
            model,
        });

        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false });
    }
};

export const saveLearningData = async (req, res) => {
    try {
        const dataFolderPath = path.resolve(__dirname, "../data");
        const filePath = path.join(dataFolderPath, "data.json");

        if (!fs.existsSync(dataFolderPath)) fs.mkdirSync(dataFolderPath);

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([req.body], null, 2));
        } else {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const parsedData = JSON.parse(fileContent);
            parsedData.push(req.body);
            fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));
        }

        await Document.updateOne({ _id: req.params.id }, { isAIAcess: true });

        return res.status(200).json({
            success: true,
            message: "Data has been added successfully",
        });
    } catch (error) {
        return res.status(200).json({ success: false });
    }
};
