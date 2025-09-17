import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';

const ChatTile = ({ chat, isSelected, onClick, index }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-whatsapp-green" />;
      default:
        return null;
    }
  };

  const getLastMessageStatus = () => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    if (lastMessage && lastMessage.sender === 'me') {
      return getStatusIcon(lastMessage.status);
    }
    return null;
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`
        relative p-4 cursor-pointer transition-all duration-200
        border-b border-glass-border/30 backdrop-blur-sm
        ${isSelected 
          ? 'bg-primary/10 border-l-4 border-l-primary' 
          : 'hover:bg-glass-secondary/30'
        }
      `}
    >
      {/* Online Indicator */}
      {chat.isOnline && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-whatsapp-green rounded-full"></div>
      )}

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-glass-border/30"
          />
          {chat.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-whatsapp-green 
                          rounded-full border-2 border-background"></div>
          )}
        </div>

        {/* Chat Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-foreground truncate">
              {chat.name}
            </h3>
            <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
              {chat.timestamp}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {getLastMessageStatus()}
            <p className="text-sm text-muted-foreground truncate flex-1">
              {chat.lastMessage}
            </p>
            
            {/* Unread Badge */}
            {chat.unread > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 bg-whatsapp-green text-white text-xs
                         rounded-full flex items-center justify-center font-medium flex-shrink-0"
              >
                {chat.unread}
              </motion.div>
            )}
          </div>

          {/* Tags */}
          {chat.tags && chat.tags.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {chat.tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2 py-0.5 bg-primary/20 text-primary 
                           rounded-full border border-primary/30"
                >
                  {tag}
                </span>
              ))}
              {chat.tags.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{chat.tags.length - 2}
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