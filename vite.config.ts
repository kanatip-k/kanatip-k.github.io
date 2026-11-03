import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
export default defineConfig({ plugins: [react(), tailwind()], base: '/', build: { sourcemap: false, rollupOptions: {output: {manualChunks(id) {if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'animation'; if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react-vendor';}}} } });
