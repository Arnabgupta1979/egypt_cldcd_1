
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getDocumentSummary(docTitle: string, language: 'ar' | 'en'): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a plain-language summary in ${language === 'ar' ? 'Arabic' : 'English'} for a seed regulatory document titled: "${docTitle}". Explain its general purpose and who it affects in 3 bullet points.`,
      config: {
        systemInstruction: "You are an expert in Egyptian agricultural and seed regulations. You simplify complex legal texts for farmers and businesses."
      }
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating summary.";
  }
}
