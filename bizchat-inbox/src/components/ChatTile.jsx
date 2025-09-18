// src/components/ChatTile.jsx
import React from "react";
import { motion } from "framer-motion";
import { Check, CheckCheck, Package, Phone, Star } from "lucide-react";

const ChatTile = ({ chat, isSelected, onClick, index }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-muted-foreground" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-muted-foreground" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-whatsapp-green" />;
      default:
        return null;
    }
  };

  const getSentimentEmoji = (text) => {
    if (!text) return "💬";
    const lower = text.toLowerCase();
    if (lower.includes("thanks") || lower.includes("great") || lower.includes("love")) return "😊";
    if (lower.includes("bad") || lower.includes("angry") || lower.includes("hate")) return "😡";
    return "😐";
  };

  const getTagIcon = (tag) => {
    if (tag.toLowerCase().includes("order")) return <Package className="w-3 h-3" />;
    if (tag.toLowerCase().includes("call")) return <Phone className="w-3 h-3" />;
    if (tag.toLowerCase().includes("vip")) return <Star className="w-3 h-3" />;
    return null;
  };

  const lastMessage = chat.messages[chat.messages.length - 1];
  const lastStatus = lastMessage?.sender === "me" ? getStatusIcon(lastMessage.status) : null;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, rotate: 0.5 }}
      onClick={onClick}
      className={`
        relative p-4 cursor-pointer transition-all duration-200 rounded-xl
        border border-glass-border/30 backdrop-blur-sm
        ${isSelected 
          ? "bg-gradient-to-r from-primary/20 to-primary-glow/20 shadow-lg" 
          : "hover:bg-glass-secondary/30"}
      `}
    >
      {/* Online Indicator */}
      {chat.isOnline && (
        <motion.div 
          animate={{ scale: [1, 1.3, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-4 right-4 w-2.5 h-2.5 bg-whatsapp-green rounded-full"
        />
      )}

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-glass-border/30"
          />
        </div>

        {/* Chat Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-foreground truncate">{chat.name}</h3>
            <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
              {chat.timestamp}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {lastStatus}
            <p className="text-sm text-muted-foreground truncate flex-1">
              {chat.lastMessage}
            </p>
            <span className="text-lg">{getSentimentEmoji(chat.lastMessage)}</span>

            {/* Unread Badge */}
            {chat.unread > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-5 h-5 bg-whatsapp-green text-white text-xs
                         rounded-full flex items-center justify-center font-medium flex-shrink-0"
              >
                {chat.unread}
              </motion.div>
            )}
          </div>

          {/* Tags */}
          {chat.tags && chat.tags.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {chat.tags.slice(0, 3).map((tag, tagIndex) => (
                <div
                  key={tagIndex}
                  className="flex items-center gap-1 text-xs px-2 py-0.5 bg-primary/10 text-primary 
                           rounded-full border border-primary/20"
                >
                  {getTagIcon(tag)}
                  <span>{tag}</span>
                </div>
              ))}
              {chat.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{chat.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatTile;
