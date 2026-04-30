
import { GoogleGenAI } from "@google/genai";

export async function getDocumentSummary(docTitle: string, language: 'ar' | 'en'): Promise<string> {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return language === 'ar' ? 'خدمة الملخص الذكي غير متاحة حالياً.' : 'AI summary service is not currently available.';
  }
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Provide a plain-language summary in ${language === 'ar' ? 'Arabic' : 'English'} for a seed regulatory document titled: "${docTitle}". Explain its general purpose and who it affects in 3 bullet points.`,
      config: {
        systemInstruction: "You are an expert in Egyptian agricultural and seed regulations. You simplify complex legal texts for farmers and businesses."
      }
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return language === 'ar' ? 'تعذّر توليد الملخص.' : 'Error generating summary.';
  }
}
