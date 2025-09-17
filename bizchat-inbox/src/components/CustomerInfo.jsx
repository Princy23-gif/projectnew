import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Phone, Package, Tag, Plus, X, Edit3, 
  Calendar, Star, ShoppingBag, Clock
} from 'lucide-react';

// Tag suggestions (no need for external file)
const tagSuggestions = [
  { id: 1, name: "VIP", color: "bg-red-500" },
  { id: 2, name: "Important", color: "bg-blue-500" },
  { id: 3, name: "New", color: "bg-green-500" },
  { id: 4, name: "Returning", color: "bg-yellow-500" },
  { id: 5, name: "High Value", color: "bg-purple-500" },
];

const CustomerInfo = ({ selectedChat, onUpdateTags, className = "" }) => {
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = (tagName) => {
    if (selectedChat && !selectedChat.tags.includes(tagName)) {
      onUpdateTags(selectedChat.id, [...selectedChat.tags, tagName]);
    }
  };

  const handleRemoveTag = (tag) => {
    if (selectedChat) {
      onUpdateTags(selectedChat.id, selectedChat.tags.filter(t => t !== tag));
    }
  };

  const handleAddCustomTag = () => {
    if (newTag.trim() && selectedChat && !selectedChat.tags.includes(newTag.trim())) {
      onUpdateTags(selectedChat.id, [...selectedChat.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const getTagColor = (tagName) => {
    const suggestion = tagSuggestions.find(s => s.name === tagName);
    return suggestion?.color || 'bg-gray-500';
  };

  if (!selectedChat) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`h-full flex items-center justify-center text-center ${className}`}
      >
        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Select a chat to view customer details</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className={`h-full overflow-y-auto p-6 space-y-6 ${className}`}
    >
      {/* Profile */}
      <div className="text-center">
        <div className="relative mx-auto mb-4">
          <img
            src={selectedChat.avatar}
            alt={selectedChat.name}
            className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-gray-200"
          />
          {selectedChat.isOnline && (
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{selectedChat.name}</h2>
        <p className="text-sm text-gray-500">{selectedChat.isOnline ? 'Online now' : 'Last seen recently'}</p>
      </div>

      {/* Contact Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <User className="w-4 h-4" /> Contact Information
        </h3>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Phone className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-800">{selectedChat.phone}</p>
            <p className="text-xs text-gray-500">Phone number</p>
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Package className="w-4 h-4" /> Order Information
        </h3>
        <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
          <span className="text-sm font-medium text-gray-800">{selectedChat.orderId}</span>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Active</span>
        </div>
      </div>

      {/* Customer Tags */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Tag className="w-4 h-4" /> Customer Tags
          </h3>
          <button onClick={() => setIsEditingTags(!isEditingTags)} className="p-1 rounded hover:bg-gray-100">
            <Edit3 className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Current Tags */}
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {selectedChat.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-white rounded-full ${getTagColor(tag)}`}
              >
                {tag}
                {isEditingTags && (
                  <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:bg-white/20 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Custom Tag */}
        {isEditingTags && (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add custom tag..."
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
            />
            <button onClick={handleAddCustomTag} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Suggested Tags */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Suggested Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tagSuggestions
            .filter(s => !selectedChat.tags.includes(s.name))
            .map(s => (
              <button
                key={s.id}
                onClick={() => handleAddTag(s.name)}
                className={`px-3 py-1 text-xs font-medium text-white rounded-full ${s.color} hover:opacity-80`}
              >
                + {s.name}
              </button>
            ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <ShoppingBag className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="text-lg font-semibold text-gray-800">12</p>
            <p className="text-xs text-gray-500">Total Orders</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <Star className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
            <p className="text-lg font-semibold text-gray-800">4.8</p>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
        </div>
      </div>

      {/* Customer Journey */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Customer Journey
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">First Contact</p>
              <p className="text-xs text-gray-500">3 months ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">First Purchase</p>
              <p className="text-xs text-gray-500">2 months ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">Latest Order</p>
              <p className="text-xs text-gray-500">5 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerInfo;
