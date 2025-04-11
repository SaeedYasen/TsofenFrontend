import React, { useState } from "react";
import axios from "axios";
import "./Chat.css"; // تأكد من وجود هذا الملف لتنسيق المحادثة

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "أنت", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/chat", {
        message: input,
      });

      const botReply = response.data.response;
      const nextStep = response.data.next_step;

      setMessages((prev) => [
        ...prev,
        { sender: "المساعد", text: botReply },
        nextStep ? { sender: "المساعد", text: nextStep } : null,
      ].filter(Boolean));
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "المساعد", text: "⚠️ حدث خطأ أثناء الاتصال بالخادم. تأكد أن السيرفر يعمل." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-container">
      <h2>💬 مساعد طبي ذكي</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender === "أنت" ? "user" : "bot"}`}>
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">جاري التحميل...</div>}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="اكتب رسالتك..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>إرسال</button>
      </div>
    </div>
  );
}

export default Chat;
