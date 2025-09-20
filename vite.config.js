// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ⚡ IMPORTANT for GitHub Pages + HashRouter
// https://username.github.io/your-repo-name
//Replace `your-repo-name` with your repo's name
//If you deploy to a custom domain, set base: "/".
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: '#root', // your client mount point
      prerenderScript: path.resolve(__dirname, 'prerender/prerender.jsx'),
      additionalPrerenderRoutes: ['/printable', '/print-all'],
      // Avoid Vite trying to bundle fs/path/browser-incompatible imports
      ssr: true,
    })
  ],
  build: {
    outDir: "dist",
  },
});
