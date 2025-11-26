// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// // import { defineConfig } from "vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],

//   // This is for manual changing of server's port number to 8000 instead of the default 5173
//   server: {
//     port: parseInt(process.env.VITE_PORT),
//     host: true,
//   },
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
      host: true,
    },
  };
});