import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatBot.module.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [messages, setMessages] = useState([
        { text: "System Online... I am your Physical AI Assistant. How can I help you?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        
        const currentInput = input;
        setInput(""); 
        setLoading(true);

        try {
            const response = await fetch("https://ahmed125200-my-robot-bot.hf.space/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: currentInput }),
            });

            if (!response.ok) throw new Error("Server error");
            const data = await response.json();

            if (data.answer) {
                setMessages(prev => [...prev, { text: data.answer, isBot: true }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { text: "Error: AI Core Connection Failed.", isBot: true }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.chatbotWrapper}>
            {!isOpen && (
                <button className={styles.launcher} onClick={() => setIsOpen(true)}>
                    <div className={styles.pulse}></div>
                    🤖
                </button>
            )}

            {isOpen && (
                <div className={`${styles.chatWindow} ${isMaximized ? styles.maximized : ''}`}>
                    <div className={styles.header}>
                        <div className={styles.headerLeft}>
                            <div className={styles.statusDot}></div>
                            <span className={styles.title}>HUMANOID AI CORE</span>
                        </div>
                        
                        <div className={styles.headerButtons}>
                            <button 
                                className={styles.actionBtn} 
                                onClick={() => setIsMaximized(!isMaximized)}
                            >
                                {isMaximized ? '❐' : '⛶'}
                            </button>
                            <button 
                                className={styles.actionBtn} 
                                onClick={() => {setIsOpen(false); setIsMaximized(false);}}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    
                    <div className={styles.messagesContainer}>
                        {messages.map((msg, i) => (
                            <div key={i} className={msg.isBot ? styles.botMsg : styles.userMsg}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className={styles.loadingContainer}>
                                <div className={styles.typingDot}></div>
                                <div className={styles.typingDot}></div>
                                <div className={styles.typingDot}></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.inputArea}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Awaiting command..."
                        />
                        <button onClick={handleSend} className={styles.sendBtn}>send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;