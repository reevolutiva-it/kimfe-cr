"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Bot, 
  Settings, 
  Users, 
  MessageSquare, 
  BarChart, 
  HelpCircle 
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    name: "Agents",
    href: "/agents",
    icon: <Bot className="h-5 w-5" />,
    description: "Manage and configure AI agents"
  },
  {
    name: "Conversations",
    href: "/conversations",
    icon: <MessageSquare className="h-5 w-5" />,
    description: "View and manage chat interactions"
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: <BarChart className="h-5 w-5" />,
    description: "Monitor agent performance"
  },
  {
    name: "Team",
    href: "/team",
    icon: <Users className="h-5 w-5" />,
    description: "Manage team access and roles"
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    description: "Configure system preferences"
  },
  {
    name: "Help",
    href: "/help",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Documentation and support"
  }
];

export function MainMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List className="flex items-center gap-1 px-4">
        {menuItems.map((item) => (
          <NavigationMenu.Item key={item.name}>
            <NavigationMenu.Trigger
              className={cn(
                "group flex items-center gap-2 rounded-lg px-4 py-2",
                "text-muted-foreground hover:text-foreground",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                pathname === item.href && "text-foreground bg-accent"
              )}
              onClick={() => router.push(item.href)}
            >
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                {item.icon}
                <span className="text-sm font-medium">{t(`common.${item.name.toLowerCase()}`)}</span>
              </motion.span>
            </NavigationMenu.Trigger>

            <NavigationMenu.Content
              className={cn(
                "absolute top-full w-[200px] rounded-lg bg-popover p-2 shadow-lg",
                "data-[motion=from-start]:animate-enterFromLeft",
                "data-[motion=from-end]:animate-enterFromRight",
                "data-[motion=to-start]:animate-exitToLeft",
                "data-[motion=to-end]:animate-exitToRight"
              )}
            >
              <button
                onClick={() => router.push(item.href)}
                className={cn(
                  "block w-full text-left rounded-lg p-3 text-sm",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <span className="font-medium">{t(`common.${item.name.toLowerCase()}`)}</span>
                <p className="mt-1 text-muted-foreground">
                  {item.description}
                </p>
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Viewport className="relative" />
    </NavigationMenu.Root>
  );
}
