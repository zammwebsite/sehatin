import React, { useState, useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType } from "../types";
import ChatMessage from "../components/ChatMessage";
import { PaperAirplaneIcon } from "../components/icons/HeroIcons";
import { generateChatResponse } from "../services/geminiService";

const AIChatPage: React.FC = () => {
const [messages, setMessages] = useState<ChatMessageType[]>([
{
id: "initial",
text:
"Halo! Saya **Sehatin**, asisten medis AI Anda. 😊\n\n" +
"Anda bisa bertanya tentang gejala, pola makan, tidur, atau kesehatan umum.\n" +
"Ingat, saya **bukan dokter**, jadi untuk kondisi serius silakan hubungi tenaga medis profesional.",
sender: "ai",
},
]);

const [input, setInput] = useState("");
const [isLoading, setIsLoading] = useState(false);
const messagesEndRef = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(scrollToBottom, [messages]);

const handleSendMessage = async (e: React.FormEvent) => {
e.preventDefault();
if (input.trim() === "" || isLoading) return;

```
const userMessage: ChatMessageType = {
  id: Date.now().toString(),
  text: input,
  sender: "user",
};

setMessages((prev) => [...prev, userMessage]);
setInput("");
setIsLoading(true);

try {
  const aiResponseText = await generateChatResponse(input);
  const aiMessage: ChatMessageType = {
    id: (Date.now() + 1).toString(),
    text: aiResponseText,
    sender: "ai",
  };
  setMessages((prev) => [...prev, aiMessage]);
} catch (error) {
  console.error("Error getting AI response:", error);
  const errorMessage: ChatMessageType = {
    id: (Date.now() + 1).toString(),
    text:
      "Maaf, terjadi kesalahan saat menghubungi AI. Coba lagi nanti ya 🙏",
    sender: "ai",
  };
  setMessages((prev) => [...prev, errorMessage]);
} finally {
  setIsLoading(false);
}
```

};

return ( <div className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden">
{/* Area Chat */} <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
{messages.map((msg) => ( <ChatMessage key={msg.id} message={msg} />
))}

```
    {/* Indikator Loading */}
    {isLoading && (
      <div className="flex items-start gap-3 my-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150 mx-1"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
        </div>
        <div className="max-w-xl p-4 rounded-xl shadow-md bg-white text-slate-700 rounded-bl-none">
          <p className="text-sm italic text-gray-500">
            AI sedang mengetik...
          </p>
        </div>
      </div>
    )}
    <div ref={messagesEndRef} />
  </div>

  {/* Input Bar */}
  <div className="p-2 sm:p-4 border-t border-gray-200 bg-gray-50">
    <form
      onSubmit={handleSendMessage}
      className="flex items-center space-x-2 sm:space-x-4"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ketik pertanyaan Anda..."
        className="flex-1 w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-base"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || input.trim() === ""}
        className="flex-shrink-0 p-3 text-white transition-colors duration-200 rounded-full shadow-md bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <PaperAirplaneIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </form>
  </div>
</div>
```

);
};

export default AIChatPage;
