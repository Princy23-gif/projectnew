import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Smile, Paperclip, Reply } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = ({ selectedChat, onSendMessage, onBack, className = "" }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

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

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    const text = replyingTo ? `↪️ ${replyingTo.text}\n${message}` : message;
    onSendMessage(selectedChat.id, text);
    setMessage("");
    setReplyingTo(null);
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
    <motion.div className={`h-full glass-surface flex flex-col ${className}`}>
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
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {selectedChat.messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`group relative ${
              msg.sender === "me" ? "text-right" : "text-left"
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`inline-block px-3 py-2 rounded-xl shadow-sm ${
                msg.sender === "me"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-black"
              }`}
              title={`Sent at ${msg.time}`}
            >
              {msg.text}
            </motion.div>

            {/* Reply button on hover */}
            <button
              onClick={() => setReplyingTo(msg)}
              className="absolute top-1/2 -translate-y-1/2 -right-8 opacity-0 group-hover:opacity-100 transition"
            >
              <Reply className="w-4 h-4 text-gray-500" />
            </button>

            {/* Seen Indicator */}
            {idx === selectedChat.messages.length - 1 &&
              msg.sender === "me" &&
              msg.status === "read" && (
                <div className="text-xs text-gray-400 mt-1">Seen ✔✔</div>
              )}
          </div>
        ))}

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 italic"
            >
              {selectedChat.name} is typing...
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

      {/* Input */}
      <div className="p-4 border-t border-glass-border/30 flex items-end gap-2 relative">
        {/* Emoji Toggle */}
        <button onClick={() => setShowEmoji(!showEmoji)}>
          <Smile className="w-5 h-5 text-gray-500" />
        </button>

        {showEmoji && (
          <div className="absolute bottom-16 left-4 z-50">
            <EmojiPicker
              onEmojiClick={(emoji) =>
                setMessage((prev) => prev + emoji.emoji)
              }
            />
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 p-2 rounded border text-black placeholder-gray-500 resize-none focus:outline-none"
        />

        {/* Send Button */}
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
