import React, { useState } from "react";
import styles from "./ChatbotModal.module.css";

const ChatbotModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Merhaba! Size nasıl yardımcı olabilirim?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages([...messages, { from: "user", text: userMsg }]);
    setInput("");
    // Basit senaryo
    setTimeout(() => {
      let botReply = "";
      if (/merhaba|selam/i.test(userMsg)) {
        botReply = "Merhaba! Size nasıl yardımcı olabilirim?";
      } else if (/görev.*ekle|yeni.*görev/i.test(userMsg)) {
        botReply = "Elbette! Görev adını yazar mısınız?";
      } else if (/rapor hazırla/i.test(userMsg)) {
        botReply = "Görev başarıyla eklendi. Başka bir isteğiniz var mı?";
      } else if (/hayır|teşekkür/i.test(userMsg)) {
        botReply = "Rica ederim! İyi çalışmalar dilerim.";
      } else {
        botReply = "(Demo) Cevabım: " + userMsg;
      }
      setMessages(msgs => [...msgs, { from: "bot", text: botReply }]);
    }, 600);
  };

  return (
    <>
      <button
        className={styles.chatbotButton}
        aria-label="Chatbotu Aç"
        onClick={() => setOpen(true)}
      >
        <span role="img" aria-label="Chatbot">💬</span>
      </button>
      {open && (
        <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.header}>
              <span>Chatbot</span>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>&times;</button>
            </div>
            <div className={styles.messages}>
              {messages.map((msg, i) => (
                <div key={i} className={msg.from === "bot" ? styles.botMsg : styles.userMsg}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className={styles.inputArea}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Mesajınızı yazın..."
                aria-label="Mesajınızı yazın"
              />
              <button onClick={handleSend}>Gönder</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotModal;
