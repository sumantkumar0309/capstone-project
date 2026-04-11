import { useState } from "react";
import { BookOpen, Copy, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { apiEndpoints } from "@/data/mockData";

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-accent/15 text-accent border-accent/30",
    POST: "bg-primary/15 text-primary border-primary/30",
    PUT: "bg-warning/15 text-warning border-warning/30",
    DELETE: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${colors[method] || ""}`}>
      {method}
    </span>
  );
}

function EndpointCard({ endpoint }: { endpoint: typeof apiEndpoints[0] }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(endpoint.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <MethodBadge method={endpoint.method} />
        <span className="font-mono text-sm font-medium flex-1">{endpoint.path}</span>
        <span className="text-sm text-muted-foreground hidden sm:block">{endpoint.description}</span>
      </button>

      {expanded && (
        <div className="border-t p-5 space-y-4">
          <p className="text-sm text-muted-foreground">{endpoint.description}</p>

          {endpoint.params.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Parameters</h4>
              <div className="space-y-2">
                {endpoint.params.map((p) => (
                  <div key={p.name} className="flex items-start gap-3 text-sm">
                    <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">{p.name}</code>
                    <Badge variant="outline" className="text-xs">{p.type}</Badge>
                    {p.required && <Badge className="text-xs bg-destructive/10 text-destructive border-destructive/30">required</Badge>}
                    <span className="text-muted-foreground">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Response</h4>
              <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <pre className="bg-muted/50 rounded-lg p-4 text-xs font-mono overflow-x-auto text-foreground/80">
              {endpoint.response}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApiDocs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-10 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="hero-gradient p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              API Documentation
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete reference for the LocateIndia REST API. All endpoints require an API key.
            </p>
          </div>

          {/* Auth section */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <h2 className="font-semibold text-lg mb-3">Authentication</h2>
            <p className="text-sm text-muted-foreground mb-4">
              All API requests must include your API key in the Authorization header:
            </p>
            <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono overflow-x-auto text-foreground/80">
              {`Authorization: Bearer YOUR_API_KEY`}
            </pre>
          </div>

          {/* Base URL */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <h2 className="font-semibold text-lg mb-3">Base URL</h2>
            <code className="bg-muted px-3 py-1.5 rounded text-sm font-mono">
              https://api.locateindia.com/v1
            </code>
          </div>

          {/* Endpoints */}
          <h2 className="font-semibold text-xl mb-4">Endpoints</h2>
          <div className="space-y-3">
            {apiEndpoints.map((ep) => (
              <EndpointCard key={ep.path} endpoint={ep} />
            ))}
          </div>

          {/* Rate Limits */}
          <div className="glass-card rounded-xl p-6 mt-8">
            <h2 className="font-semibold text-lg mb-3">Rate Limits</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="font-semibold">Free Tier</div>
                <div className="text-muted-foreground">1,000 requests/day</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="font-semibold">Pro Tier</div>
                <div className="text-muted-foreground">50,000 requests/day</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="font-semibold">Enterprise</div>
                <div className="text-muted-foreground">Unlimited</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
