import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [reactRouter()],
  optimizeDeps: { include: ["lucide-react"] },
  server: { host: "127.0.0.1", port: 3000 },
  preview: { host: "127.0.0.1", port: 3000 },
});
