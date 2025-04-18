
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// optimizeDeps: {
//   include: ["react-map-gl"];
// }
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
