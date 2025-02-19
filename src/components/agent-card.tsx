"use client";

import { Agent } from "@/types/agent";
import { Button } from "./ui/button";
import { MessageSquare, Pencil, Star, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "./language-provider";

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (agent: Agent) => void;
}

export function AgentCard({ agent, onEdit, onDelete }: AgentCardProps) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-4 md:p-6 shadow-lg border"
    >
      <div className="flex items-start gap-4">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground">{agent.name}</h3>
          <p className="text-muted-foreground mt-1">{agent.description}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => window.location.href = `/agents/${agent.id}/config/`}
          className="flex-1"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Configure
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => window.location.href = `/agents/${agent.id}/chat/`}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
        >
          <Star className="w-4 h-4 mr-2" />
          Evaluate
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(agent)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
