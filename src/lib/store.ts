import { Agent } from "@/types/agent";

// Sample data
export const sampleAgents: Agent[] = [
  {
    id: "1",
    name: "Support Assistant",
    description: "Handles customer support queries with expertise",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60",
    prompt: "You are a helpful customer support assistant",
    welcomeMessage: "Hello! How can I assist you today?",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sales Agent",
    description: "Specializes in product recommendations and sales",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    prompt: "You are an experienced sales representative",
    welcomeMessage: "Welcome! Let me help you find the perfect product.",
    createdAt: new Date().toISOString(),
  },
];

// LocalStorage key
const STORAGE_KEY = "agents";

// Get agents from localStorage
export const getAgents = (): Agent[] => {
  if (typeof window === "undefined") return sampleAgents;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : sampleAgents;
};

// Save agents to localStorage
export const saveAgents = (agents: Agent[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
};
