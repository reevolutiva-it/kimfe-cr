"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, ChevronDown, ChevronRight, Settings } from "lucide-react";
import { useState } from "react";
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  configFields?: {
    name: string;
    type: "text" | "password";
    placeholder: string;
    required: boolean;
  }[];
}
const sampleTools: Tool[] = [{
  id: "slack",
  name: "Slack",
  description: "Connect with your Slack workspace",
  icon: <img src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" className="w-6 h-6" alt="Slack" />,
  enabled: false,
  configFields: [{
    name: "Bot Token",
    type: "password",
    placeholder: "xoxb-your-token",
    required: true
  }, {
    name: "Channel ID",
    type: "text",
    placeholder: "C0123456789",
    required: true
  }]
}, {
  id: "teams",
  name: "Microsoft Teams",
  description: "Integrate with Microsoft Teams",
  icon: <img src="https://picsum.photos/200" className="w-6 h-6" alt="Teams" />,
  enabled: false,
  configFields: [{
    name: "Client ID",
    type: "text",
    placeholder: "your-client-id",
    required: true
  }, {
    name: "Client Secret",
    type: "password",
    placeholder: "your-client-secret",
    required: true
  }]
}, {
  id: "wordpress",
  name: "WordPress",
  description: "Publish content to WordPress",
  icon: <img src="https://cdn.worldvectorlogo.com/logos/wordpress-icon-1.svg" className="w-6 h-6" alt="WordPress" />,
  enabled: false,
  configFields: [{
    name: "Site URL",
    type: "text",
    placeholder: "https://your-site.com",
    required: true
  }, {
    name: "API Key",
    type: "password",
    placeholder: "your-api-key",
    required: true
  }]
}];
interface ToolsTabProps {
  onSave: () => void;
}
export function ToolsTab({
  onSave
}: ToolsTabProps) {
  const [tools, setTools] = useState<Tool[]>(sampleTools);
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const toggleTool = (toolId: string) => {
    setTools(tools.map(tool => tool.id === toolId ? {
      ...tool,
      enabled: !tool.enabled
    } : tool));
  };
  return <div className="space-y-8 py-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Available Tools</h3>
          <Button variant="secondary" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Manage Tools
          </Button>
        </div>

        <div className="space-y-4">
          {tools.map(tool => <div key={tool.id} className="rounded-lg border bg-card">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  {tool.icon}
                  <div>
                    <h4 className="font-medium">{tool.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant={tool.enabled ? "primary" : "secondary"} size="sm" onClick={() => toggleTool(tool.id)}>
                    {tool.enabled ? "Enabled" : "Disabled"}
                  </Button>
                  {tool.configFields && <button onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)} className="text-muted-foreground hover:text-foreground">
                      {expandedTool === tool.id ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    </button>}
                </div>
              </div>
              {expandedTool === tool.id && tool.configFields && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: "auto",
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} className="border-t px-4 py-4">
                  <div className="grid gap-4">
                    {tool.configFields.map(field => <div key={field.name} className="space-y-2">
                        <label className="text-sm font-medium">
                          {field.name}
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </label>
                        <input type={field.type} placeholder={field.placeholder} className="w-full rounded-lg border bg-transparent px-4 py-2 text-sm" />
                      </div>)}
                  </div>
                </motion.div>}
            </div>)}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Tool Configuration</p>
            <p className="text-sm text-muted-foreground">
              Enable and configure external tools to extend your agent's capabilities
            </p>
          </div>
        </div>
      </section>

      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed bottom-6 right-6 flex items-center gap-2 rounded-lg bg-background/80 p-4 shadow-lg backdrop-blur">
        <p className="text-sm text-muted-foreground">You have unsaved changes</p>
        <Button onClick={onSave}>Save Changes</Button>
      </motion.div>
    </div>;
}