"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const tabItems = [
  { value: "knowledge", label: "Knowledge & Prompts" },
  { value: "evaluations", label: "Evaluations" },
  { value: "competencies", label: "Competencies" },
  { value: "tools", label: "Tools" },
];

interface ConfigTabsProps {
  activeTab: string;
  onChange: (value: string) => void;
}

export function ConfigTabs({ activeTab, onChange }: ConfigTabsProps) {
  return (
    <Tabs.Root value={activeTab} onValueChange={onChange}>
      <Tabs.List className="flex space-x-1 border-b">
        {tabItems.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "group relative px-4 py-2 text-sm font-medium transition-colors",
              "hover:text-foreground/80",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              activeTab === tab.value
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.value && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
