"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, Filter, Bot, User, Calendar, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAgents } from "@/lib/store";
import { Agent } from "@/types/agent";

interface Conversation {
  id: string;
  agentId: string;
  title: string;
  lastMessage: string;
  date: string;
  time: string;
  messageCount: number;
}

const sampleConversations: Conversation[] = [
  {
    id: "1",
    agentId: "1",
    title: "Product Support Inquiry",
    lastMessage: "Thank you for your help with troubleshooting the issue.",
    date: "2024-02-18",
    time: "14:30",
    messageCount: 12
  },
  {
    id: "2",
    agentId: "2",
    title: "Sales Consultation",
    lastMessage: "I'll send you the product specifications right away.",
    date: "2024-02-18",
    time: "11:45",
    messageCount: 8
  }
];

export default function ConversationsPage() {
  const { t } = useTranslation();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    setAgents(getAgents());
  }, []);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgent = !selectedAgent || conv.agentId === selectedAgent;
    return matchesSearch && matchesAgent;
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground">{t('conversations.title')}</h1>
          <p className="mt-2 text-muted-foreground">
            {t('conversations.subtitle')}
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('conversations.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="agent-select" className="sr-only">Select Agent</label>
            <select
              id="agent-select"
              value={selectedAgent || ""}
              onChange={(e) => setSelectedAgent(e.target.value || null)}
              className="rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">{t('conversations.allAgents')}</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
            <Button variant="secondary" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              {t('conversations.filters')}
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {filteredConversations.map((conversation) => {
            const agent = agents.find(a => a.id === conversation.agentId);
            return (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="group rounded-xl border bg-card p-6 transition-colors hover:bg-accent/5"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={agent?.avatar}
                      alt={agent?.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      <Bot className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {conversation.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(conversation.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{conversation.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{conversation.messageCount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Bot className="h-4 w-4" />
                          {agent?.name}
                        </span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => window.location.href = `/agents/${conversation.agentId}/chat`}
                      >
                        {t('conversations.continueChat')}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}
