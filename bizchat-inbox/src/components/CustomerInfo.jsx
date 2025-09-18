// src/components/CustomerInfo.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Phone, Package, Tag, Plus, X, Edit3,
  ShoppingBag, Star, Clock
} from "lucide-react";

const tagSuggestions = [
  { id: 1, name: "VIP", color: "from-red-500 to-pink-500" },
  { id: 2, name: "Important", color: "from-blue-500 to-cyan-400" },
  { id: 3, name: "New", color: "from-green-500 to-emerald-400" },
  { id: 4, name: "Returning", color: "from-yellow-500 to-orange-400" },
  { id: 5, name: "High Value", color: "from-purple-500 to-indigo-500" },
];

const CustomerInfo = ({ selectedChat, onUpdateTags, className = "" }) => {
  const [isEditingTags, setIsEditingTags] = useState(false);

  if (!selectedChat) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className={`h-full flex items-center justify-center text-center glass-surface ${className}`}
      >
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Select a chat to view customer details</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className={`h-full overflow-y-auto p-6 custom-scrollbar ${className}`}
    >
      {/* Profile Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-card rounded-2xl p-6 text-center relative"
      >
        <div className="relative inline-block">
          <img
            src={selectedChat.avatar}
            alt={selectedChat.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-glass-border"
          />
          {selectedChat.isOnline && (
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute bottom-2 right-2 w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-background shadow-md"
            />
          )}
        </div>
        <h2 className="text-xl font-semibold mt-3">{selectedChat.name}</h2>
        <p className="text-sm text-muted-foreground">
          {selectedChat.isOnline ? "Online now" : "Last seen recently"}
        </p>
      </motion.div>

      {/* Contact Info */}
      <section className="mt-6 space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Phone className="w-4 h-4" /> Contact
        </h3>
        <div className="glass-card p-3 rounded-lg">
          <p className="text-sm font-medium">{selectedChat.phone}</p>
          <p className="text-xs text-muted-foreground">Phone number</p>
        </div>
      </section>

      {/* Order Info */}
      <section className="mt-6 space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Package className="w-4 h-4" /> Order
        </h3>
        <div className="glass-card p-3 rounded-lg flex justify-between items-center">
          <span className="text-sm font-medium">{selectedChat.orderId}</span>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
            Active
          </span>
        </div>
      </section>

      {/* Tags */}
      <section className="mt-6 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Tag className="w-4 h-4" /> Tags
          </h3>
          <button onClick={() => setIsEditingTags(!isEditingTags)}>
            <Edit3 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Tag Chips */}
        <div className="flex flex-wrap gap-2">
          {selectedChat.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.1 }}
              className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r ${
                tagSuggestions.find((s) => s.name === tag)?.color || "from-gray-500 to-gray-700"
              } shadow-md`}
            >
              {tag}
              {isEditingTags && (
                <button
                  onClick={() =>
                    onUpdateTags(selectedChat.id, selectedChat.tags.filter((t) => t !== tag))
                  }
                  className="ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </motion.span>
          ))}
        </div>

        {/* Suggested Tags */}
        {isEditingTags && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tagSuggestions
              .filter((s) => !selectedChat.tags.includes(s.name))
              .map((s) => (
                <button
                  key={s.id}
                  onClick={() => onUpdateTags(selectedChat.id, [...selectedChat.tags, s.name])}
                  className={`px-3 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r ${s.color} hover:opacity-80`}
                >
                  + {s.name}
                </button>
              ))}
          </div>
        )}
      </section>

      {/* Stats Rings */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4 mt-3">
          {/* Orders */}
          <div className="relative flex flex-col items-center">
            <svg className="w-16 h-16">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-muted-foreground/20"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#gradOrders)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.75 }}
                transition={{ duration: 1.2 }}
              />
              <defs>
                <linearGradient id="gradOrders" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
            <p className="absolute text-sm font-semibold">12</p>
            <span className="text-xs mt-1 text-muted-foreground">Orders</span>
          </div>

          {/* Rating */}
          <div className="relative flex flex-col items-center">
            <svg className="w-16 h-16">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-muted-foreground/20"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#gradRating)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.9 }}
                transition={{ duration: 1.2 }}
              />
              <defs>
                <linearGradient id="gradRating" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="gold" />
                  <stop offset="100%" stopColor="orange" />
                </linearGradient>
              </defs>
            </svg>
            <p className="absolute text-sm font-semibold">4.8</p>
            <span className="text-xs mt-1 text-muted-foreground">Rating</span>
          </div>
        </div>
      </section>

      {/* Customer Journey */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4" /> Journey
        </h3>
        <div className="relative mt-3 pl-6 border-l-2 border-glass-border/40 space-y-4">
          {[
            { label: "First Contact", time: "3 months ago", color: "bg-green-500" },
            { label: "First Purchase", time: "2 months ago", color: "bg-blue-500" },
            { label: "Latest Order", time: "5 days ago", color: "bg-yellow-500" },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              <span
                className={`absolute -left-3 top-1.5 w-3 h-3 rounded-full ${step.color} border-2 border-background`}
              />
              <p className="text-sm font-medium">{step.label}</p>
              <p className="text-xs text-muted-foreground">{step.time}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default CustomerInfo;
