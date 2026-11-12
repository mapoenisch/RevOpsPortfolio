import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    host: '127.0.0.1', port: 4317, strictPort: true,
    // Browser checks write screenshots and reports here, never app source.
    watch: { ignored: ['**/evidence/**'] },
  },
  preview: { host: '127.0.0.1', port: 4317, strictPort: true },
  build: {
    sourcemap: false,
    // Cloudflare builds have a tighter file-descriptor budget than local builds.
    rollupOptions: { maxParallelFileOps: 64 },
  },
});
