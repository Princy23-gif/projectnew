// src/components/ChatList.jsx
import React from "react";
import { motion } from "framer-motion";
import ChatTile from "./ChatTile";

const ChatList = ({ 
  chats, 
  selectedChatId, 
  onChatSelect, 
  searchQuery,
  className = "" 
}) => {
  // Filter chats based on search query
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.phone.includes(searchQuery) ||
    chat.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`h-full glass-surface border-r border-glass-border flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-glass-border/30">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredChats.length} chats
            </span>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-whatsapp-green rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => (
            <ChatTile
              key={chat.id}
              chat={chat}
              isSelected={selectedChatId === chat.id}
              onClick={() => onChatSelect(chat.id)}
              index={index}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full p-8 text-center"
          >
            <div className="w-16 h-16 bg-glass-secondary/50 rounded-full 
                          flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No conversations found
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery 
                ? `No results for "${searchQuery}"`
                : "Start a new conversation to get started"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-glass-border/30 flex justify-between text-sm">
        <span className="text-muted-foreground">
          {chats.filter(c => c.unread > 0).length} unread
        </span>
        <span className="text-muted-foreground">
          {chats.filter(c => c.isOnline).length} online
        </span>
      </div>
    </motion.div>
  );
};

export default ChatList;
