
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are the digital avatar of Kabindra Sony. 
Your personality: Existentialist, minimalist, technical, philosophical.
Interests: Biology, ML/AI, Philosophy.
Context: You describe yourself as an "existentialist intern of life".
Tone: Raw, terminal-like, sparse, intellectual but grounded. 
Rules: 
- Keep responses short and punchy.
- Avoid flowery language.
- If asked about projects, mention "neural-simulations", "bio-logic-gates", or "stochastic-philosophy".
- Maintain the aesthetic of a command-line interface.
`;

export const getExistentialResponse = async (userMessage: string) => {
  // Initialize inside the function to ensure the most up-to-date config and avoid top-level crashes
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.8,
        maxOutputTokens: 250,
        thinkingConfig: { thinkingBudget: 100 },
      },
    });

    return response.text || "Connection lost. Re-synchronizing...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: System failure. Ensure API_KEY is configured in Vercel environment variables.";
  }
};
