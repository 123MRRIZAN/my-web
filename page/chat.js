import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "@/entities/ChatMessage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Users, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function Chat() {
  const [username, setUsername] = useState(localStorage.getItem("chatUsername") || "");
  const [isUsernameSet, setIsUsernameSet] = useState(!!localStorage.getItem("chatUsername"));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (isUsernameSet) {
      loadMessages();
      const interval = setInterval(loadMessages, 2000); // Poll every 2 seconds
      return () => clearInterval(interval);
    }
  }, [isUsernameSet]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const fetchedMessages = await ChatMessage.list("-created_date", 100);
      setMessages(fetchedMessages.reverse());
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSetUsername = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("chatUsername", username.trim());
      setIsUsernameSet(true);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      await ChatMessage.create({
        sender_name: username,
        message: newMessage.trim(),
        timestamp: new Date().toISOString()
      });
      setNewMessage("");
      loadMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setIsSending(false);
  };

  const getAvatarColor = (name) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-green-500 to-emerald-500",
      "from-blue-500 to-cyan-500",
      "from-yellow-500 to-orange-500",
      "from-indigo-500 to-purple-500"
    ];
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  if (!isUsernameSet) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="bg-[#13131A] border-[#1F1F28] p-8">
            <div className="text-center mb-8">
              <div className="inline-flex p-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Join Live Chat
              </h1>
              <p className="text-gray-400">
                Enter your name to start chatting with others
              </p>
            </div>

            <form onSubmit={handleSetUsername} className="space-y-4">
              <Input
                placeholder="Enter your name..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#1F1F28] border-gray-700 text-white text-lg py-6"
                autoFocus
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-6 text-lg"
                disabled={!username.trim()}
              >
                Start Chatting
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0A0A0F] text-white flex flex-col">
      {/* Header */}
      <div className="bg-[#13131A] border-b border-[#1F1F28] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Live Chat Room</h1>
              <p className="text-sm text-gray-400">Chatting as {username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6"
      >
        <div className="max-w-5xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
              const isOwnMessage = msg.sender_name === username;
              return (
                <motion.div
                  key={msg.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-2xl ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${getAvatarColor(msg.sender_name)} flex items-center justify-center font-bold text-sm`}>
                      {msg.sender_name[0].toUpperCase()}
                    </div>
                    <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{msg.sender_name}</span>
                        <span className="text-xs text-gray-500">
                          {msg.timestamp ? format(new Date(msg.timestamp), "HH:mm") : ""}
                        </span>
                      </div>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          isOwnMessage
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-[#1F1F28] text-white"
                        }`}
                      >
                        <p className="break-words">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#13131A] border-t border-[#1F1F28] px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-[#1F1F28] border-gray-700 text-white flex-1 py-6"
              disabled={isSending}
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8"
              disabled={isSending || !newMessage.trim()}
            >
              {isSending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
