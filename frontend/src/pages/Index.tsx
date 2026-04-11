import { Link } from "react-router-dom";
import { ArrowRight, Database, Globe, Key, BarChart3, Search, Zap, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { dashboardStats } from "@/data/mockData";

const features = [
  {
    icon: Database,
    title: "Normalized Database",
    description: "PostgreSQL database with fully normalized schema covering 640K+ villages across India.",
  },
  {
    icon: Key,
    title: "Secure B2B API Keys",
    description: "API key & secret based authentication for secure, production-grade integrations.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Full-text search across villages, districts, and states with filters and pagination.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Real-time dashboard with request monitoring, latency tracking, and usage insights.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Average response time under 100ms with optimized queries and connection pooling.",
  },
  {
    icon: Shield,
    title: "Rate Limiting",
    description: "Built-in rate limiting and throttling to protect your API and ensure fair usage.",
  },
];

const useCases = [
  "Address Forms & Autocomplete",
  "KYC & Verification Systems",
  "Logistics & Delivery Platforms",
  "E-commerce Shipping",
  "Government Portals",
  "Analytics & Research",
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container relative py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full animate-fade-in-up">
              <MapPin className="h-4 w-4" />
              All India Location Data API
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight animate-fade-in-up animate-delay-100">
              One API for{" "}
              <span className="text-gradient">Every Village</span>
              <br />in India
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
              Access structured data for {dashboardStats.totalStates} states, {dashboardStats.totalDistricts} districts,
              and {dashboardStats.totalVillages} villages through a fast, secure, and developer-friendly REST API.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up animate-delay-300">
              <Link to="/explorer">
                <Button size="lg" className="hero-gradient border-0 text-primary-foreground gap-2 text-base px-8">
                  Explore Data <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                  View API Docs
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto animate-fade-in-up animate-delay-400">
            {[
              { label: "States & UTs", value: dashboardStats.totalStates },
              { label: "Districts", value: dashboardStats.totalDistricts },
              { label: "Villages", value: dashboardStats.totalVillages },
              { label: "Data Points", value: dashboardStats.dataPoints },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="container py-16">
        <div className="glass-card rounded-2xl overflow-hidden max-w-3xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">GET /api/v1/states</span>
          </div>
          <pre className="p-6 text-sm font-mono overflow-x-auto text-foreground/80">
{`curl -X GET "https://api.locateindia.com/v1/states" \\
  -H "Authorization: Bearer lk_prod_a1b2c3d4e5f6" \\
  -H "Content-Type: application/json"

// Response 200 OK
{
  "data": [
    { "id": 1, "name": "Andhra Pradesh", "code": "AP", "districts": 13 },
    { "id": 2, "name": "Bihar", "code": "BR", "districts": 38 },
    ...
  ],
  "meta": { "total": 35, "page": 1, "limit": 25 }
}`}
          </pre>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Built for Production</h2>
          <p className="text-muted-foreground mt-2">Everything you need to integrate Indian location data into your apps.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card rounded-xl p-6 transition-all hover:-translate-y-1">
              <div className="hero-gradient w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Use Cases</h2>
            <p className="text-muted-foreground mt-2">Power your applications with accurate Indian location data.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {useCases.map((uc) => (
              <span key={uc} className="bg-card border px-5 py-2.5 rounded-full text-sm font-medium text-foreground shadow-sm">
                {uc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="hero-gradient rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to get started?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Get your API key and start integrating Indian location data into your application in minutes.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                Get Free API Key <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
