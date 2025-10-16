import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      buffer: 'buffer',
      util: 'util',
      // Map Safe packages to local polyfill to avoid bundling issues in prod
      '@safe-global/safe-apps-provider': path.resolve(__dirname, './src/safe-polyfill.js'),
      '@safe-global/safe-apps-sdk': path.resolve(__dirname, './src/safe-polyfill.js'),
      // Backward compatibility: some builds referenced a custom specifier
      '@safe-globalThis/safe-apps-provider': path.resolve(__dirname, './src/safe-polyfill.js'),
      '@safe-globalThis/safe-apps-sdk': path.resolve(__dirname, './src/safe-polyfill.js'),
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer', 'util'],
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production',
    minify: 'terser',
    target: 'es2020',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      // Do not externalize Safe packages so alias resolution applies and code is bundled
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          wagmi: ['wagmi', 'viem', '@rainbow-me/rainbowkit'],
          ui: ['framer-motion', 'react-hot-toast'],
        },
      },
    },
  },
})