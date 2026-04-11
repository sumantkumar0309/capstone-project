import { Activity, BarChart3, Clock, Key, Shield, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiUsageData, endpointUsage, apiKeys, dashboardStats } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const statCards = [
  { label: "Total Requests", value: dashboardStats.totalRequests, icon: TrendingUp, color: "text-primary" },
  { label: "Active API Keys", value: dashboardStats.activeKeys, icon: Key, color: "text-accent" },
  { label: "Avg Latency", value: dashboardStats.avgLatency, icon: Clock, color: "text-warning" },
  { label: "Uptime", value: dashboardStats.uptime, icon: Activity, color: "text-success" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-10 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="hero-gradient p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Monitor API usage, manage keys, and view analytics.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold mb-4">API Requests Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={apiUsageData}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(220, 72%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(220, 72%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="hsl(220, 72%, 50%)" fill="url(#colorReq)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold mb-4">Endpoint Usage</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={endpointUsage} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="endpoint" type="category" tick={{ fontSize: 10 }} width={140} />
                <Tooltip />
                <Bar dataKey="calls" fill="hsl(220, 72%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API Keys */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              API Keys
            </h3>
            <Button size="sm" className="hero-gradient border-0 text-primary-foreground">Create New Key</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Key</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Requests</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Last Used</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((k) => (
                  <tr key={k.id} className="border-b last:border-0">
                    <td className="py-3 px-2 font-medium">{k.name}</td>
                    <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{k.key}</td>
                    <td className="py-3 px-2">
                      <Badge variant={k.status === "active" ? "default" : "secondary"}>
                        {k.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">{k.requests.toLocaleString()}</td>
                    <td className="py-3 px-2 text-muted-foreground">{k.lastUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
