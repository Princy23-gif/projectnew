// src/components/Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Settings, User, Bell, BarChart3 } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, className = "" }) => {
  const navItems = [
    { id: "inbox", icon: MessageCircle, label: "Inbox", count: 5 },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "notifications", icon: Bell, label: "Notifications", count: 3 },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className={`w-20 h-full glass-effect border-r border-glass-border flex flex-col items-center py-6 ${className}`}
    >
      {/* Logo Orb */}
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold shadow-xl animate-pulse-glow mb-6"
      >
        B
      </motion.div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-4 flex-1 w-full">
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="relative group w-full flex justify-center"
          >
            <button
              onClick={() => setActiveTab(item.id)}
              className={`
                relative w-12 h-12 rounded-2xl flex items-center justify-center
                transition-all duration-300
                ${activeTab === item.id
                  ? "bg-gradient-to-br from-primary to-primary-glow text-white shadow-lg"
                  : "bg-glass-secondary/30 hover:bg-glass-tertiary/50 text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                <item.icon className="w-6 h-6" />
              </motion.div>

              {/* Count Badge */}
              {item.count && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs
                             rounded-full flex items-center justify-center font-medium animate-pulse"
                >
                  {item.count}
                </motion.span>
              )}

              {/* Active Indicator */}
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-gradient-to-b from-primary to-primary-glow"
                />
              )}
            </button>

            {/* Tooltip */}
            <div
              className="absolute left-16 top-1/2 transform -translate-y-1/2 ml-2
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         pointer-events-none z-50"
            >
              <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded-md whitespace-nowrap shadow-md">
                {item.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* User Avatar Orb */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-auto"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium shadow-xl"
        >
          A
        </motion.div>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
