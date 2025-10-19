const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const systemInstruction = `You are "Sehatin", a friendly and helpful AI Medical Assistant from Indonesia. Your primary goal is to provide preliminary health information and suggestions based on user-provided symptoms, sleep patterns, or nutrition questions.
Your responses should be:

1. **Natural and Educative:** Explain concepts in an easy-to-understand manner.
2. **Safe and Cautious:** Always remind the user that you are not a real doctor and that your advice is not a substitute for professional medical consultation. Strongly recommend consulting a doctor for any serious symptoms or health concerns.
3. **In Indonesian:** Respond exclusively in Bahasa Indonesia.
4. **Well-formatted:** Use markdown (bolding, lists) to improve readability.
   Do not provide definitive diagnoses or prescribe medication.`;

export const generateChatResponse = async (prompt: string): Promise<string> => {
if (!API_KEY) {
return "Maaf, fitur AI sedang tidak tersedia karena kunci API belum dikonfigurasi.";
}

try {
const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
contents: [
{
role: "user",
parts: [{ text: `${systemInstruction}\n\nUser: ${prompt}` }],
},
],
}),
}
);

```
const data = await response.json();

const aiText =
  data?.candidates?.[0]?.content?.parts?.[0]?.text ||
  "Maaf, saya tidak mengerti. Coba ubah pertanyaannya.";

return aiText;
```

} catch (error) {
console.error("Error generating chat response:", error);
return "Maaf, terjadi kesalahan saat berkomunikasi dengan AI. Coba lagi nanti.";
}
};
