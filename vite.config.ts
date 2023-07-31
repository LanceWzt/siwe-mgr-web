import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { vitePluginForArco } from '@arco-plugins/vite-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), vitePluginForArco({ style: 'css' })],
    server: {
        port: 9090,
        open: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '*': path.resolve('')
        }
    }
});
