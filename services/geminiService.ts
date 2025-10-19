
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = 'gemini-2.5-flash';

const systemInstruction = `You are "Sehatin", a friendly and helpful AI Medical Assistant from Indonesia. Your primary goal is to provide preliminary health information and suggestions based on user-provided symptoms, sleep patterns, or nutrition questions.
Your responses should be:
1.  **Natural and Educative:** Explain concepts in an easy-to-understand manner.
2.  **Safe and Cautious:** Always remind the user that you are not a real doctor and that your advice is not a substitute for professional medical consultation. Strongly recommend consulting a doctor for any serious symptoms or health concerns.
3.  **In Indonesian:** Respond exclusively in Bahasa Indonesia.
4.  **Well-formatted:** Use markdown (bolding, lists) to improve readability.
Do not provide definitive diagnoses or prescribe medication.`;


export const generateChatResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "Maaf, fitur AI sedang tidak tersedia karena kunci API belum dikonfigurasi. Silakan hubungi administrator.";
  }
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "Maaf, terjadi kesalahan saat berkomunikasi dengan AI. Coba lagi nanti.";
  }
};
