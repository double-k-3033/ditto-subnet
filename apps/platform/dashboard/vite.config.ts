import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "DITTO_");
  const proxy = {
    "/api": {
      target: env.DITTO_DASHBOARD_PROXY_TARGET || "https://platform-api.heyditto.ai",
      changeOrigin: true,
    },
  };
  return {
    plugins: [solidPlugin()],
    server: {
      port: 8080,
      proxy,
    },
    preview: { proxy },
    build: {
      target: "es2022",
      outDir: "dist",
    },
  };
});
