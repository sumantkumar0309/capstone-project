import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="hero-gradient rounded-lg p-1.5">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              LocateIndia API
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive location data API for all Indian states, districts, sub-districts, and villages.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/docs" className="hover:text-foreground transition-colors">API Documentation</Link></li>
              <li><Link to="/explorer" className="hover:text-foreground transition-colors">Data Explorer</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Changelog</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Status Page</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Support</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Data License</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          © 2025 LocateIndia API. Capstone Project — All India Villages Data Platform.
        </div>
      </div>
    </footer>
  );
}
