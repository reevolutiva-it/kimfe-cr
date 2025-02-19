"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Agent } from "@/types/agent";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const agentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  prompt: z.string().min(1, "Prompt is required"),
  welcomeMessage: z.string().min(1, "Welcome message is required"),
  avatar: z.string().url("Must be a valid URL")
});
type AgentFormData = z.infer<typeof agentSchema>;
interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AgentFormData) => void;
  initialData?: Agent;
}
export function CreateAgentModal({
  open,
  onOpenChange,
  onSubmit,
  initialData
}: CreateAgentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: initialData
  });
  const onSubmitForm = async (data: AgentFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content asChild onOpenAutoFocus={e => e.preventDefault()}>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: 20
        }} className="fixed left-1/2 top-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-2xl font-semibold">
                {initialData ? "Edit Agent" : "Create New Agent"}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-muted-foreground hover:text-foreground" title="Close">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input {...register("name")} className="w-full rounded-lg border bg-transparent px-4 py-2" placeholder="Support Assistant" />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <input {...register("description")} className="w-full rounded-lg border bg-transparent px-4 py-2" placeholder="Handles customer support queries with expertise" />
                {errors.description && <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Avatar URL</label>
                <input {...register("avatar")} className="w-full rounded-lg border bg-transparent px-4 py-2" placeholder="https://picsum.photos/200" />
                {errors.avatar && <p className="text-sm text-destructive">
                    {errors.avatar.message}
                  </p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Agent Prompt</label>
                <textarea {...register("prompt")} className="h-24 w-full rounded-lg border bg-transparent px-4 py-2" placeholder="You are a helpful customer support assistant..." />
                {errors.prompt && <p className="text-sm text-destructive">
                    {errors.prompt.message}
                  </p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Welcome Message</label>
                <input {...register("welcomeMessage")} className="w-full rounded-lg border bg-transparent px-4 py-2" placeholder="Hello! How can I assist you today?" />
                {errors.welcomeMessage && <p className="text-sm text-destructive">
                    {errors.welcomeMessage.message}
                  </p>}
              </div>

              <div className="flex justify-end gap-4">
                <Dialog.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </Dialog.Close>
                <Button disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Create Agent"}
                </Button>
              </div>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>;
}