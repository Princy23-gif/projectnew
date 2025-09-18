// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Sun, Moon, Menu } from "lucide-react";

const Header = ({ 
  searchQuery, 
  setSearchQuery, 
  isDarkMode, 
  toggleDarkMode, 
  toggleMobileView 
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="glass-effect border-b border-glass-border flex items-center justify-between px-6 py-3"
    >
      {/* Branding / Logo */}
      <div className="flex items-center gap-3">
        <motion.div 
          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow 
                     flex items-center justify-center text-white font-bold shadow-lg animate-pulse-glow"
        >
          B
        </motion.div>
        <h1 className="font-semibold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          BizChat Inbox
        </h1>
      </div>

      {/* Search bar */}
      <motion.div 
        whileFocus={{ scale: 1.02 }}
        className="flex items-center bg-glass-secondary/50 px-3 py-2 rounded-lg 
                   focus-within:ring-2 focus-within:ring-primary transition-all duration-300 w-72"
      >
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none flex-1 text-sm text-foreground placeholder:text-muted-foreground"
        />
      </motion.div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Live clock */}
        <div className="text-sm text-muted-foreground hidden md:block">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>

        {/* Dark mode toggle */}
        <button 
          onClick={toggleDarkMode}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-glass-secondary/50 hover:bg-glass-tertiary transition"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-500" />
          )}
        </button>

        {/* Mobile view toggle */}
        <button 
          onClick={toggleMobileView}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-glass-secondary/50 hover:bg-glass-tertiary transition"
        >
          <Menu className="w-5 h-5 text-primary" />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
