import React from "react";
import { motion } from "framer-motion";
import { Search, Sun, Moon, Menu } from "lucide-react";

export default function Header({
  searchQuery,
  setSearchQuery,
  isDarkMode,
  toggleDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 
                 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b 
                 border-gray-200 dark:border-gray-700 shadow-sm"
    >
      {/* Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Business Inbox
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg 
                       bg-gray-50 dark:bg-gray-800 
                       border border-gray-200 dark:border-gray-700
                       placeholder-gray-400 dark:placeholder-gray-500
                       text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition-all duration-200"
          />
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </motion.div>
      </button>
    </motion.header>
  );
}
