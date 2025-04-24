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
        const client = new OpenAI({ baseURL: endpoint, apiKey: token });

        const response = await client.chat.completions.create({
            messages: [
                { 
                    role: "system", 
                    content: "You are an IELTS Writing Task 2 examiner. Please evaluate the essay based on the following four criteria: Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Return each score separately along with a brief evaluation for each criterion." 
                },
                { 
                    role: "user", 
                    content: `
                        The essay question is: 
                        "Some people believe that the price of a car is the most important factor to consider when buying a vehicle. Others think that safety features, fuel efficiency, and other aspects are more significant.
Discuss both views and give your own opinion"
                        The essay is: 
                        "When it comes to purchasing a car, people often have varying opinions on what factors should be prioritized. While some argue that the price of the car is the most crucial consideration, others believe that elements such as safety features, fuel efficiency, and other practical aspects are more important. This essay will explore both viewpoints before offering my own perspective.

On one hand, those who emphasize the price of a car argue that affordability is key when making a purchase. For many individuals, a car is one of the most expensive investments they will make, and as such, the cost is a critical factor in their decision-making process. In this context, people may opt for cars that fit within their budget, even if it means sacrificing some advanced features or brand preferences. For instance, a person on a tight budget might choose a less expensive model with fewer safety features, focusing primarily on the upfront cost of the vehicle. Additionally, in regions with economic challenges or where public transportation is limited, the affordability of a car becomes even more pressing.

On the other hand, many people believe that the safety features and fuel efficiency of a car should take precedence over its price. Safety is an undeniable concern for most car buyers, especially considering the rising number of traffic accidents worldwide. Advanced safety technologies, such as airbags, anti-lock brakes, and collision warning systems, can significantly reduce the risk of injury in the event of an accident. As such, some buyers may be willing to spend extra money on a car that offers superior safety measures. Moreover, fuel efficiency has become increasingly important as people seek ways to save money on fuel and reduce their carbon footprint. Cars that are more fuel-efficient help drivers save money in the long run, which makes them a more appealing option for many buyers.

In my opinion, while price is undoubtedly a significant factor in purchasing a car, I believe that safety features and fuel efficiency should be given more weight. A car is not just a mode of transport; it is an essential tool for ensuring personal safety and managing daily expenses. Opting for a vehicle with the latest safety technology and good fuel efficiency is not only an investment in long-term financial savings but also in peace of mind. In the long run, the higher upfront cost of a car with better features is likely to be outweighed by the savings on repairs, fuel, and insurance.

In conclusion, both the price of a car and its safety and fuel efficiency are important factors to consider when making a purchase. However, I believe that prioritizing safety and fuel efficiency over price is a more sensible approach, as these aspects ultimately contribute to both personal well-being and financial savings in the long term."
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
        

        const content = response.choices[0].message.content;

const evaluationResult = {
    taskResponse: {
        score: 8,
        evaluation: content.match(/Task Response: (.*?)(?=\n)/)[1]
    },
    coherenceAndCohesion: {
        score: 8,
        evaluation: content.match(/Coherence and Cohesion: (.*?)(?=\n)/)[1]
    },
    lexicalResource: {
        score: 7,
        evaluation: content.match(/Lexical Resource: (.*?)(?=\n)/)[1]
    },
    grammaticalRange: {
        score: 8,
        evaluation: content.match(/Grammatical Range and Accuracy: (.*?)(?=\n)/)[1]
    },
    overallBandScore: 7.5 // Band score được tính từ các tiêu chí
};
        return res.json({
            success: true,
            evaluationResult
            // evaluationResult
        });
    } catch (error) {
        console.log(error);
        
        
        return res.status(200).json({
            success: false,
            
        });
       
    }
});

export default router;