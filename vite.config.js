// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// ⚡ IMPORTANT for GitHub Pages + HashRouter
// https://username.github.io/your-repo-name
//Replace `your-repo-name` with your repo's name
//If you deploy to a custom domain, set base: "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
