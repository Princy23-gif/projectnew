import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import CustomerInfo from "./components/CustomerInfo";
import Header from "./components/Header";

const initialChats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey there!",
    timestamp: "10:30 AM",
    unread: 2,
    avatar: "https://i.pravatar.cc/150?img=3",
    phone: "+91 9876543210",
    orderId: "ORD123",
    isOnline: true,
    messages: [
      { id: 1, sender: "John", text: "Hey there!", time: "10:30 AM", status: "read" },
      { id: 2, sender: "me", text: "Hi John!", time: "10:31 AM", status: "sent" },
    ],
    tags: ["VIP"]
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Good morning!",
    timestamp: "9:15 AM",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=5",
    phone: "+91 9123456780",
    orderId: "ORD456",
    isOnline: false,
    messages: [
      { id: 1, sender: "Jane", text: "Good morning!", time: "9:15 AM", status: "sent" },
      { id: 2, sender: "me", text: "Morning Jane! How are you?", time: "9:16 AM", status: "sent" },
    ],
    tags: []
  },
  {
    id: 3,
    name: "Michael Lee",
    lastMessage: "Can you send the invoice?",
    timestamp: "Yesterday",
    unread: 1,
    avatar: "https://i.pravatar.cc/150?img=11",
    phone: "+91 9988776655",
    orderId: "ORD789",
    isOnline: true,
    messages: [
      { id: 1, sender: "Michael", text: "Hi, I need the invoice for my last order.", time: "Yesterday", status: "sent" },
      { id: 2, sender: "me", text: "Sure, I’ll send it shortly.", time: "Yesterday", status: "delivered" },
      { id: 3, sender: "Michael", text: "Can you send the invoice?", time: "Yesterday", status: "sent" },
    ],
    tags: ["Important"]
  },
  {
    id: 4,
    name: "Emily Johnson",
    lastMessage: "Thanks for the quick response 🙏",
    timestamp: "Yesterday",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=14",
    phone: "+91 9876123450",
    orderId: "ORD102",
    isOnline: false,
    messages: [
      { id: 1, sender: "Emily", text: "Do you have discounts for bulk orders?", time: "Yesterday", status: "sent" },
      { id: 2, sender: "me", text: "Yes! I’ll share the details.", time: "Yesterday", status: "delivered" },
      { id: 3, sender: "Emily", text: "Thanks for the quick response 🙏", time: "Yesterday", status: "read" },
    ],
    tags: ["Returning"]
  },
  {
    id: 5,
    name: "David Kim",
    lastMessage: "Order confirmed ✅",
    timestamp: "2 days ago",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=18",
    phone: "+91 9012345678",
    orderId: "ORD202",
    isOnline: false,
    messages: [
      { id: 1, sender: "me", text: "Hello David, your order is ready.", time: "2 days ago", status: "delivered" },
      { id: 2, sender: "David", text: "Order confirmed ✅", time: "2 days ago", status: "read" },
    ],
    tags: ["High Value"]
  },
  {
    id: 6,
    name: "Sophia Brown",
    lastMessage: "When is delivery scheduled?",
    timestamp: "2 days ago",
    unread: 3,
    avatar: "https://i.pravatar.cc/150?img=22",
    phone: "+91 9023456712",
    orderId: "ORD303",
    isOnline: true,
    messages: [
      { id: 1, sender: "Sophia", text: "Hi, just checking on my delivery.", time: "2 days ago", status: "sent" },
      { id: 2, sender: "me", text: "It’s scheduled for tomorrow.", time: "2 days ago", status: "delivered" },
      { id: 3, sender: "Sophia", text: "When is delivery scheduled?", time: "2 days ago", status: "sent" },
    ],
    tags: ["New"]
  },
  
 
  

 
    
];


export default function App() {
  const [chats, setChats] = useState(initialChats);
  const [selectedId, setSelectedId] = useState(initialChats[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('inbox');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState('list');
  const [forceMobile, setForceMobile] = useState(false); // manual toggle

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  const selectedChat = chats.find((c) => c.id === selectedId);

  const sendMessage = (chatId, text) => {
    if (!text?.trim() || !chatId) return;
    const msg = {
      id: Date.now(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: 'sent'
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              messages: [...c.messages, msg],
              lastMessage: text,
              timestamp: "now",
            }
          : c
      )
    );
  };

  const selectChat = (id) => {
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
    setSelectedId(id);
    if (isMobile || forceMobile) setMobileView('chat');
  };

  const handleUpdateTags = (chatId, newTags) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, tags: newTags } : chat
      )
    );
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileView = () => setForceMobile(!forceMobile); // manual switch
  const handleBackToList = () => {
    setMobileView('list');
    setSelectedId(null);
  };

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col">
        
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          toggleMobileView={toggleMobileView} // 🔹 added mobile toggle button
        />

        <div className="flex-1 flex overflow-hidden">
          {(!isMobile && !forceMobile) ? (
            <>
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              <ChatList
                chats={chats}
                selectedChatId={selectedId}
                onChatSelect={selectChat}
                searchQuery={searchQuery}
                className="w-80 flex-shrink-0"
              />
              <ChatWindow
                selectedChat={selectedChat}
                onSendMessage={(chatId, text) => sendMessage(chatId, text)}
                className="flex-1"
              />
              <CustomerInfo
                selectedChat={selectedChat}
                onUpdateTags={handleUpdateTags}
                className="w-80 flex-shrink-0"
              />
            </>
          ) : (
            <div className="flex-1 flex">
              {mobileView === 'list' ? (
                <ChatList
                  chats={chats}
                  selectedChatId={selectedId}
                  onChatSelect={selectChat}
                  searchQuery={searchQuery}
                  className="flex-1"
                />
              ) : (
                <ChatWindow
                  selectedChat={selectedChat}
                  onSendMessage={(chatId, text) => sendMessage(chatId, text)}
                  onBack={handleBackToList}
                  className="flex-1"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
