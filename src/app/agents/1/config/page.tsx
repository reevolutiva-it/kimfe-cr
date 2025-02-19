"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ConfigTabs } from "@/components/agent-config/tabs";
import { KnowledgeTab } from "@/components/agent-config/knowledge-tab";
import { EvaluationsTab } from "@/components/agent-config/evaluations-tab";
import { CompetenciesTab } from "@/components/agent-config/competencies-tab";
import { ToolsTab } from "@/components/agent-config/tools-tab";
import { getAgents } from "@/lib/store";
import { Agent } from "@/types/agent";
import toast from "react-hot-toast";

export default function AgentConfigPage() {
  const [activeTab, setActiveTab] = useState("knowledge");
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    const agents = getAgents();
    const foundAgent = agents.find(a => a.id === "1");
    if (foundAgent) {
      setAgent(foundAgent);
    } else {
      toast.error("Agent not found");
      window.location.href = '/agents';
    }
  }, []);

  const handleSave = () => {
    toast.success("Changes saved successfully");
  };

  if (!agent) return null;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <h1 className="text-4xl font-bold text-foreground">{agent.name}</h1>
              <p className="mt-2 text-muted-foreground">{agent.description}</p>
            </div>
          </div>

          <ConfigTabs activeTab={activeTab} onChange={setActiveTab} />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mt-6"
          >
            {activeTab === "knowledge" && <KnowledgeTab onSave={handleSave} />}
            {activeTab === "evaluations" && <EvaluationsTab onSave={handleSave} />}
            {activeTab === "competencies" && <CompetenciesTab onSave={handleSave} />}
            {activeTab === "tools" && <ToolsTab onSave={handleSave} />}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
