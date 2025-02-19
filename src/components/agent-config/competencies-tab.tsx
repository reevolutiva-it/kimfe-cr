"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus, GripVertical, Trash2, FileText } from "lucide-react";
import { useState } from "react";

interface Competency {
  id: string;
  name: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  linkedContent: string[];
}

const sampleCompetencies: Competency[] = [
  {
    id: "1",
    name: "Customer Service Excellence",
    description: "Ability to handle customer inquiries professionally and effectively",
    level: "intermediate",
    linkedContent: ["Customer Support Guide", "Communication Best Practices"],
  },
  {
    id: "2",
    name: "Product Knowledge",
    description: "Deep understanding of product features and specifications",
    level: "advanced",
    linkedContent: ["Product Manual", "Technical Documentation"],
  },
];

interface CompetenciesTabProps {
  onSave: () => void;
}

export function CompetenciesTab({ onSave }: CompetenciesTabProps) {
  const [competencies, setCompetencies] = useState<Competency[]>(sampleCompetencies);
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <div className="space-y-8 py-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Competencies</h3>
          <Button
            variant="secondary"
            size="sm"
            className="gap-2"
            onClick={() => setShowNewForm(true)}
          >
            <Plus className="h-4 w-4" />
            Add Competency
          </Button>
        </div>

        {showNewForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border bg-card p-4 space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full rounded-lg border bg-transparent px-4 py-2 text-sm"
                placeholder="e.g., Technical Troubleshooting"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="h-24 w-full rounded-lg border bg-transparent px-4 py-2 text-sm"
                placeholder="Describe the competency..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <select className="w-full rounded-lg border bg-transparent px-4 py-2 text-sm">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowNewForm(false)}
              >
                Cancel
              </Button>
              <Button size="sm">Add Competency</Button>
            </div>
          </motion.div>
        )}

        <DndContext>
          <SortableContext items={competencies} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {competencies.map((competency) => (
                <div
                  key={competency.id}
                  className="rounded-lg border bg-card p-4 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <button className="mt-1 text-muted-foreground hover:text-foreground">
                      <GripVertical className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{competency.name}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {competency.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                            {competency.level}
                          </span>
                          <Button variant="danger" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2">Linked Content</h5>
                        <div className="flex flex-wrap gap-2">
                          {competency.linkedContent.map((content, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-1 text-xs"
                            >
                              <FileText className="h-3 w-3" />
                              {content}
                            </div>
                          ))}
                          <Button variant="secondary" size="sm" className="rounded-full text-xs">
                            <Plus className="h-3 w-3 mr-1" />
                            Link Content
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
