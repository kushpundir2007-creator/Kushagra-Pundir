
import { GoogleGenAI } from "@google/genai";
import { LanguageOption } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are an expert in robotics and programming. Your task is to generate clean, well-documented, and functional code for a 5-degree-of-freedom (5-DOF) robotic arm. 
The user will specify a task in natural language, and you will translate it into the requested programming language.
Assume the robotic arm has 5 servo motors controlling its joints: base, shoulder, elbow, wrist, and gripper. 
The code should be complete and ready to run, including necessary imports or setup functions.
When generating Arduino code, use the Servo.h library.
For Python, you might use a library like 'pyserial' or a custom robotics library stub.
For JavaScript, you might use a library like 'johnny-five'.
Focus on clarity and correctness. Add comments to explain complex parts of the code.`;

export const generateRoboticArmCode = async (
  task: string,
  language: LanguageOption
): Promise<string> => {
  try {
    const userPrompt = `Language: ${language}\nTask: ${task}`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: userPrompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating code with Gemini API:", error);
    throw new Error("Failed to generate code. Please check your API key and try again.");
  }
};
