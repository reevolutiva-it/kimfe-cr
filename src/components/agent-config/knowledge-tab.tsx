"use client";

import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { motion } from "framer-motion";

interface KnowledgeTabProps {
  onSave: () => void;
}

export function KnowledgeTab({ onSave }: KnowledgeTabProps) {
  return (
    <div className="space-y-8 py-6">
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Agent Behavior</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium">Primary Prompt</label>
          <textarea
            className="h-32 w-full rounded-lg border bg-transparent px-4 py-2 text-sm"
            placeholder="Define the agent's overall behavior, style, and tone..."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Message Templates</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">System Messages</label>
            <textarea
              className="h-24 w-full rounded-lg border bg-transparent px-4 py-2 text-sm"
              placeholder="Define system-level instructions..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Assistant Messages</label>
            <textarea
              className="h-24 w-full rounded-lg border bg-transparent px-4 py-2 text-sm"
              placeholder="Configure assistant response templates..."
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Knowledge Base</h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-dashed p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">
                Drag & drop files here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOCX, and TXT files up to 10MB
              </p>
              <Button variant="secondary" size="sm" className="mt-4">
                Upload Files
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">External URLs</label>
            <div className="flex gap-2">
              <input
                type="url"
                className="flex-1 rounded-lg border bg-transparent px-4 py-2 text-sm"
                placeholder="https://example.com"
              />
              <Button variant="secondary" size="sm">
                Add URL
              </Button>
            </div>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-lg bg-background/80 p-4 shadow-lg backdrop-blur"
      >
        <p className="text-sm text-muted-foreground">
          You have unsaved changes
        </p>
        <Button onClick={onSave}>Save Changes</Button>
      </motion.div>
    </div>
  );
}
