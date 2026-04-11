import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Explorer", path: "/explorer" },
  { label: "API Docs", path: "/docs" },
  { label: "Dashboard", path: "/dashboard" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="hero-gradient rounded-lg p-1.5">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-foreground">LocateIndia</span>
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">API</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm" className="hero-gradient border-0 text-primary-foreground">Get API Key</Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">Sign In</Button>
            <Button size="sm" className="flex-1 hero-gradient border-0 text-primary-foreground">Get API Key</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
