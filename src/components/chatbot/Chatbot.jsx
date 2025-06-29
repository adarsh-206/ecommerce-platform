"use client";
import { useState } from "react";
import {
  Send,
  X,
  Package,
  Clock,
  CreditCard,
  Headphones,
  MapPin,
  RefreshCw,
} from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to Chaka-Chak! I'm here to help you with your shopping experience.",
    },
  ]);
  const [input, setInput] = useState("");

  const quickOptions = [
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Shipping & Delivery Time",
      response:
        "📦 Our standard delivery takes 3-5 business days. Express delivery is available in 1-2 days for major cities. Free shipping on orders above ₹499!",
    },
    {
      icon: <Package className="w-4 h-4" />,
      text: "Track My Order",
      response:
        "🔍 You can track your order anytime! Just go to 'My Orders' section or share your order ID with me and I'll help you track it.",
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      text: "Return & Exchange",
      response:
        "🔄 Easy returns within 7 days! Items should be unused with original packaging. We offer hassle-free exchanges for size/color changes.",
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      text: "Payment Methods",
      response:
        "💳 We accept all major cards, UPI, Net Banking, Wallets, and Cash on Delivery. Your payments are 100% secure with us!",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      text: "Delivery Areas",
      response:
        "🌍 We deliver pan-India! Same-day delivery available in Delhi, Mumbai, Bangalore, and Hyderabad. Check pincode availability at checkout.",
    },
    {
      icon: <Headphones className="w-4 h-4" />,
      text: "Contact Support",
      response:
        "📞 Need more help? Call us at 1800-XXX-XXXX (Mon-Sat, 9AM-9PM) or email support@chaka-chak.com. We're always here for you!",
    },
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setShowOptions(false);

    // Simple bot response simulation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thank you for your message! Our team will get back to you shortly. Is there anything else I can help you with?",
        },
      ]);
      setTimeout(() => setShowOptions(true), 1000);
    }, 1000);
  };

  const handleOptionClick = (option) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: option.text },
      { sender: "bot", text: option.response },
    ]);
    setShowOptions(false);
    setTimeout(() => setShowOptions(true), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-orange-200">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">Chaka-Chak Support</h2>
              <p className="text-xs opacity-90">We're here to help! 🛍️</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message area */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96 bg-gradient-to-b from-orange-50/30 to-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 max-w-xs text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-orange-100 to-amber-100 text-gray-800 border border-orange-200"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick Options */}
            {showOptions && (
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-gray-600 px-2">
                  How can we help you?
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {quickOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="flex items-center gap-3 p-3 text-left text-sm bg-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 border border-gray-200 hover:border-orange-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="text-orange-500 flex-shrink-0">
                        {option.icon}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Chaka-Chak Customer Care
            </p>
          </div>
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
          onClick={() => setIsOpen(true)}
        >
          <Headphones className="w-5 h-5" />
          <span className="font-medium">Need Help?</span>
        </button>
      )}
    </div>
  );
}
