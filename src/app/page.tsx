"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Bot,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Brain,
  Clock
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 450 },
  { name: "Fri", value: 600 },
  { name: "Sat", value: 550 },
  { name: "Sun", value: 700 },
];

const stats = [
  {
    title: "Total Agents",
    value: "12",
    change: "+2",
    trend: "up",
    icon: <Bot className="h-4 w-4" />
  },
  {
    title: "Active Users",
    value: "1,234",
    change: "+15%",
    trend: "up",
    icon: <Users className="h-4 w-4" />
  },
  {
    title: "Conversations",
    value: "45.2k",
    change: "-2%",
    trend: "down",
    icon: <MessageSquare className="h-4 w-4" />
  },
  {
    title: "Avg. Response Time",
    value: "1.2s",
    change: "-0.3s",
    trend: "up",
    icon: <Clock className="h-4 w-4" />
  }
];

const topAgents = [
  {
    name: "Customer Support",
    performance: 98,
    conversations: 1234,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Sales Assistant",
    performance: 95,
    conversations: 982,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60"
  },
  {
    name: "Technical Support",
    performance: 92,
    conversations: 876,
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=60"
  }
];

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground">{t('dashboard.title')}</h1>
          <p className="mt-2 text-muted-foreground">
            {t('dashboard.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-primary/10 p-2 text-primary">
                  {stat.icon}
                </span>
                <span className="flex items-center gap-1 text-sm">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-2 rounded-xl border bg-card p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Conversation Activity</h2>
                <p className="text-sm text-muted-foreground">
                  Last 7 days conversation volume
                </p>
              </div>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--chart-1)"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl border bg-card p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Top Performing Agents</h2>
                <p className="text-sm text-muted-foreground">
                  Based on success rate
                </p>
              </div>
              <Brain className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-6">
              {topAgents.map((agent) => (
                <div key={agent.name} className="flex items-center gap-4">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{agent.name}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{agent.conversations} conversations</span>
                      <span>•</span>
                      <span className="text-emerald-500">{agent.performance}% success</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => window.location.href = '/agents'}>
            Manage Agents
          </Button>
          <Button>
            View Detailed Analytics
          </Button>
        </div>
      </div>
    </main>
  );
}
