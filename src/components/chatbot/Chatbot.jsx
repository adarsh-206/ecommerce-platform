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
  Bot,
  User,
  LifeBuoy,
} from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to Chaka-Chak! I'm here to help you with your shopping experience. What can I assist you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickOptions = [
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Shipping & Delivery Time",
      response:
        "📦 Our delivery takes 7-10 business days. We appreciate your patience while we ensure quality service.",
    },
    {
      icon: <Package className="w-4 h-4" />,
      text: "Track My Order",
      response:
        "🔍 You can track your order anytime! Just go to 'My Orders' section in your account.",
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      text: "Return & Exchange",
      response:
        "⚠️ We only accept returns if the product received is defective. If the same item is not available for replacement, a refund will be initiated.",
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
        "🌍 We deliver across India! Please check your pincode at checkout to confirm availability.",
    },
    {
      icon: <Headphones className="w-4 h-4" />,
      text: "Contact Support",
      response:
        "📞 Need more help? DM us on instagram @chakachakteam or email chakachakteam@gmail.com. We're always here for you!",
    },
  ];

  const getConversationalResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();

    if (
      message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)
    ) {
      return "Hello! 😊 Thanks for reaching out to Chaka-Chak! How can I make your shopping experience better today?";
    }

    if (
      message.includes("track") ||
      message.includes("order status") ||
      message.includes("where is my order")
    ) {
      return "🔍 I'd be happy to help you track your order! You can check your order status in the 'My Orders' section of your account. If you need your order ID or have trouble finding it, please share your registered email or phone number.";
    }

    if (
      message.includes("delivery") ||
      message.includes("shipping") ||
      message.includes("when will") ||
      message.includes("how long")
    ) {
      return "📦 Great question! Our standard delivery time is 7-10 business days across India. We'll send you tracking details once your order is dispatched. Is there a specific delivery concern I can help with?";
    }

    if (
      message.includes("payment") ||
      message.includes("pay") ||
      message.includes("card") ||
      message.includes("upi") ||
      message.includes("cod")
    ) {
      return "💳 We accept multiple payment options: Credit/Debit Cards, UPI, Net Banking, Digital Wallets, and Cash on Delivery. All transactions are 100% secure. Which payment method would you like to know more about?";
    }

    if (
      message.includes("return") ||
      message.includes("refund") ||
      message.includes("exchange") ||
      message.includes("defective") ||
      message.includes("damaged")
    ) {
      return "⚠️ I understand your concern! We accept returns only for defective products. If you received a damaged item, please share a photo and your order details. We'll arrange a replacement or refund if the same item isn't available.";
    }

    if (
      message.includes("product") ||
      message.includes("item") ||
      message.includes("available") ||
      message.includes("stock")
    ) {
      return "🛍️ I'd love to help you find what you're looking for! Could you tell me the specific product name or category you're interested in? I can check availability for you.";
    }

    if (
      message.includes("size") ||
      message.includes("fit") ||
      message.includes("measurement")
    ) {
      return "📏 Size questions are important! Each product page has a detailed size chart. If you're unsure, I recommend checking the measurements. What specific item are you looking to size?";
    }

    if (
      message.includes("discount") ||
      message.includes("offer") ||
      message.includes("coupon") ||
      message.includes("sale")
    ) {
      return "🎉 We love giving our customers great deals! Check our homepage for current offers and use code 'CHAKACHAK10' for 10% off on orders above ₹999. Any specific category you're shopping for?";
    }

    if (
      message.includes("contact") ||
      message.includes("support") ||
      message.includes("help") ||
      message.includes("issue")
    ) {
      return "📞 I'm here to help! For urgent matters, DM us on Instagram @chakachakteam or email chakachakteam@gmail.com. What specific issue can I assist you with right now?";
    }

    if (
      message.includes("pincode") ||
      message.includes("area") ||
      message.includes("location") ||
      message.includes("deliver to")
    ) {
      return "🌍 We deliver across India! Please share your pincode and I can confirm if we deliver in your area. You can also check this at checkout.";
    }

    if (
      message.includes("thank") ||
      message.includes("thanks") ||
      message.includes("great") ||
      message.includes("good")
    ) {
      return "😊 You're so welcome! I'm glad I could help. Is there anything else you'd like to know about your Chaka-Chak shopping experience?";
    }

    if (
      message.includes("bad") ||
      message.includes("worst") ||
      message.includes("terrible") ||
      message.includes("disappointed")
    ) {
      return "😔 I'm really sorry to hear about your experience. Your feedback is valuable to us. Could you please share more details so I can help resolve this issue? You can also reach our support team directly.";
    }

    return `I understand you're asking about "${userMessage}". While I try my best to help with common queries, I might need to connect you with our support team for detailed assistance. You can reach us at chakachakteam@gmail.com or Instagram @chakachakteam. Is there a specific topic from the quick options that might help?`;
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setShowOptions(false);
    setIsTyping(true);

    setTimeout(() => {
      const response = getConversationalResponse(userMessage);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
      setTimeout(() => setShowOptions(true), 1500);
    }, 1000 + Math.random() * 1000);
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
        <div
          className="w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-orange-200"
          style={{ height: "500px" }}
        >
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">Chaka-Chak Support</h2>
              <p className="text-xs opacity-90">
                <LifeBuoy className="w-4 h-4 inline mr-1 text-white" />
                We're here to help!
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gradient-to-b from-orange-50/30 to-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-end gap-2 max-w-xs ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-orange-400 to-rose-400"
                        : "bg-gradient-to-r from-blue-400 to-purple-400"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-orange-100 to-amber-100 text-gray-800 border border-orange-200"
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2 max-w-xs">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-400 to-purple-400">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-white text-gray-700 border border-gray-200 rounded-2xl px-4 py-3 text-sm shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showOptions && !isTyping && (
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-gray-600 px-2">
                  Quick help options:
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

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ask me anything about your order..."
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Try asking: "Track my order" or "What are your payment options?"
            </p>
          </div>
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
          onClick={() => setIsOpen(true)}
          aria-label="Open Support Chat"
        >
          <Headphones className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
