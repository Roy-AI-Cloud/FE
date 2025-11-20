import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // /api로 시작하는 모든 요청을 백엔드로 프록시
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("프록시 에러:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("프록시 요청:", req.method, req.url, "->", proxyReq.path);
          });
        },
      },
    },
  },
});
