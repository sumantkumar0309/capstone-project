import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Optional: make sure 'Project-tagger' is installed if using componentTagger
// import { componentTagger } from "Project-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    // Only include componentTagger in development if available
    mode === "development" && typeof componentTagger !== "undefined" ? componentTagger() : null,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));