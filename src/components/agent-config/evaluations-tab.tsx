"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, Plus, Settings, Trash2 } from "lucide-react";

interface EvaluationsTabProps {
  onSave: () => void;
}

export function EvaluationsTab({ onSave }: EvaluationsTabProps) {
  return (
    <div className="space-y-8 py-6">
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Evaluation Settings</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Questions</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="50"
                className="w-24 rounded-lg border bg-transparent px-4 py-2 text-sm"
                placeholder="10"
              />
              <span className="text-sm text-muted-foreground">questions per evaluation</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty Level</label>
            <select className="w-full rounded-lg border bg-transparent px-4 py-2 text-sm">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Question Templates</h3>
          <Button variant="secondary" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Template
          </Button>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">Customer Support Scenarios</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tests agent's ability to handle common support situations
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="danger" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">Technical Knowledge Assessment</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Evaluates understanding of product features and specifications
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="danger" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Response Checking</h3>
        <div className="rounded-lg border bg-secondary/50 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Automatic Response Validation</p>
              <p className="text-sm text-muted-foreground">
                Configure how the system should evaluate agent responses
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Validation Rules</label>
              <textarea
                className="h-24 w-full rounded-lg border bg-transparent px-4 py-2 text-sm"
                placeholder="Define rules for checking response accuracy..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Scoring Criteria</label>
              <textarea
                className="h-24 w-full rounded-lg border bg-transparent px-4 py-2 text-sm"
                placeholder="Specify how responses should be scored..."
              />
            </div>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-lg bg-background/80 p-4 shadow-lg backdrop-blur"
      >
        <p className="text-sm text-muted-foreground">You have unsaved changes</p>
        <Button onClick={onSave}>Save Changes</Button>
      </motion.div>
    </div>
  );
}
