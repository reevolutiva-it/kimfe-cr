"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAgents } from "@/lib/store";
import { Agent } from "@/types/agent";
import toast from "react-hot-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

export default function ChatPage() {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const agents = getAgents();
    const foundAgent = agents.find(a => a.id === "1");
    if (foundAgent) {
      setAgent(foundAgent);
      // Add welcome message
      setMessages([{
        id: "welcome",
        content: foundAgent.welcomeMessage,
        role: "assistant",
        timestamp: new Date().toISOString()
      }]);
    } else {
      toast.error("Agent not found");
      window.location.href = '/agents';
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateTyping = async (message: string) => {
    setIsTyping(true);
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      content: message,
      role: "assistant",
      timestamp: new Date().toISOString()
    }]);
    setIsTyping(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: crypto.randomUUID(),
      content: input.trim(),
      role: "user" as const,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate agent response
    await simulateTyping("I understand your question about " + input.trim().substring(0, 20) + "... Let me help you with that.");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!agent) return null;

  return (
    <main className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto px-2 md:px-4">
        <div className="py-6 flex items-center justify-between border-b">
          <div className="flex items-center gap-4">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <h1 className="text-xl font-semibold">{agent.name}</h1>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => window.location.href = `/agents/${agent.id}/config`}>
            Configure Agent
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={`flex flex-col gap-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : ''}`}>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-center gap-1 bg-secondary rounded-full px-4 py-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Typing...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="py-6 border-t">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full rounded-xl border bg-background px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[52px] max-h-32 resize-none"
                style={{ height: '52px' }}
              />
              <div className="absolute right-3 top-3 text-xs text-muted-foreground">
                Press Enter to send
              </div>
            </div>
            <Button type="submit" size="lg" className="h-[52px] px-6">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
