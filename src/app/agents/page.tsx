"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgentCard from "@/components/agent-card";
import { CreateAgentModal } from "@/components/create-agent-modal";
import { Agent } from "@/types/agent";
import { getAgents, saveAgents } from "@/lib/store";
import toast from "react-hot-toast";

export default function AgentsPage() {
  const { t } = useTranslation();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | undefined>();

  useEffect(() => {
    setAgents(getAgents());
  }, []);

  const handleDelete = (agent: Agent) => {
    if (confirm("Are you sure you want to delete this agent?")) {
      const newAgents = agents.filter((a) => a.id !== agent.id);
      setAgents(newAgents);
      saveAgents(newAgents);
      toast.success("Agent deleted successfully");
    }
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setIsCreateModalOpen(true);
  };

  const handleCreateOrUpdate = (data: Omit<Agent, "id" | "createdAt">) => {
    const newAgents = [...agents];

    if (editingAgent) {
      const index = newAgents.findIndex((a) => a.id === editingAgent.id);
      if (index !== -1) {
        newAgents[index] = {
          ...editingAgent,
          ...data,
        };
        toast.success("Agent updated successfully");
      }
    } else {
      newAgents.push({
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
      toast.success("Agent created successfully");
    }

    setAgents(newAgents);
    saveAgents(newAgents);
    setEditingAgent(undefined);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground">
            {t('agents.title')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t('agents.subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-end mb-4 md:mb-8">
          <Button size="lg" className="gap-2" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-5 h-5" />
            {t('agents.createNew')}
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </motion.div>

        <CreateAgentModal
          open={isCreateModalOpen}
          onOpenChange={(open) => {
            setIsCreateModalOpen(open);
            if (!open) setEditingAgent(undefined);
          }}
          onSubmit={handleCreateOrUpdate}
          initialData={editingAgent}
        />
      </div>
    </main>
  );
}
