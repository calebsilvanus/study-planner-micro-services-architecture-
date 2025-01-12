import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Frontend will run on port 3000
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // Backend API URL
        changeOrigin: true,  // Ensures the origin of the request is changed to match the target
        rewrite: (path) => path.replace(/^\/api/, ''),  // Removes '/api' prefix before sending to backend
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['hoist-non-react-statics'], // Exclude this package from the bundle
      plugins: [
        resolve(),
        commonjs({
          include: /node_modules/,
          namedExports: {
            'hoist-non-react-statics': ['default'], // Ensure hoist-non-react-statics is handled properly
          },
        }),
      ],
    },
  },
});
