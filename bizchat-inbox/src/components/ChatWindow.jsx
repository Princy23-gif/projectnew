// src/components/ChatWindow.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Smile, Reply } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = ({ selectedChat, onSendMessage, onBack, className = "" }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat?.messages]);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    const text = replyingTo ? `↪️ ${replyingTo.text}\n${message}` : message;
    onSendMessage(selectedChat.id, text);
    setMessage("");
    setReplyingTo(null);
    setShowEmoji(false);
    setIsTyping(false);
  };

  // Handle emoji selection
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    textareaRef.current.focus();
  };

  // Handle Enter key to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Typing indicator logic
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(true);

    // Clear previous timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Disable typing indicator after 1 second of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  if (!selectedChat) {
    return (
      <motion.div
        className={`h-full flex items-center justify-center text-gray-500 ${className}`}
      >
        No chat selected
      </motion.div>
    );
  }

  return (
    <motion.div className={`h-full flex flex-col glass-surface ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-glass-border/30 flex justify-between items-center">
        {onBack && (
          <button
            onClick={onBack}
            className="mr-2 px-2 py-1 bg-gray-200 rounded text-sm"
          >
            ⬅ Back
          </button>
        )}
        <h3 className="font-semibold">{selectedChat.name}</h3>
        {selectedChat.isOnline && (
          <span className="text-xs text-whatsapp-green">● Online</span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar relative">
        {selectedChat.messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`group relative ${msg.sender === "me" ? "text-right" : "text-left"}`}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`inline-block px-3 py-2 rounded-2xl shadow-sm max-w-xs break-words ${
                msg.sender === "me"
                  ? "ml-auto bg-gradient-to-br from-primary to-primary-glow text-white rounded-br-none"
                  : "mr-auto bg-gradient-to-br from-glass-tertiary/80 to-glass-secondary/60 text-foreground rounded-bl-none"
              }`}
              title={`Sent at ${msg.time || ""}`}
            >
              {msg.text}
            </motion.div>

            {/* Reply button */}
            <button
              onClick={() => setReplyingTo(msg)}
              className="absolute top-1/2 -translate-y-1/2 -right-8 opacity-0 group-hover:opacity-100 transition"
            >
              <Reply className="w-4 h-4 text-gray-500" />
            </button>

            {/* Seen indicator */}
            {idx === selectedChat.messages.length - 1 &&
              msg.sender === "me" &&
              msg.status === "read" && (
                <div className="text-xs text-gray-400 mt-1">Seen ✔✔</div>
              )}
          </div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mr-auto px-3 py-2 rounded-2xl bg-glass-secondary/50 flex gap-1"
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 bg-foreground rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview */}
      <AnimatePresence>
        {replyingTo && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="px-4 py-2 bg-gray-100 text-sm flex justify-between items-center"
          >
            Replying to: <em>{replyingTo.text}</em>
            <button onClick={() => setReplyingTo(null)}>✖</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar */}
      <div className="p-4 border-t border-glass-border/30 flex items-end gap-2 relative">
        {/* Emoji Toggle */}
        <button onClick={() => setShowEmoji(!showEmoji)}>
          <Smile className="w-5 h-5 text-gray-500" />
        </button>

        {/* Emoji Picker */}
        <AnimatePresence>
          {showEmoji && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 left-4 z-50"
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 p-2 rounded border text-black placeholder-gray-500 resize-none focus:outline-none"
        />

        {/* Voice / Mic */}
        <div className="relative p-2 hover:scale-110 transition">
          <Mic className="w-5 h-5 text-gray-500" />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
          />
        </div>

        {/* Send */}
        <motion.button
          whileTap={{ scale: 0.8, rotate: -10 }}
          onClick={handleSendMessage}
          className="bg-primary text-white px-3 py-2 rounded"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
