import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { transformAssetUrls } from 'vue3-pixi';
import { isCustomElement } from '@vue-pixi/renderer/dist/compiler.js';

export default defineConfig({
    base: '/',
    server: {
        port: 5000,
    },
    build: {
        target: 'esnext',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json', '.vue', '.jsx', '.d.ts'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        vue({
            template: {
                transformAssetUrls,
                compilerOptions: {
                    isCustomElement,
                },
            },
        }),
    ],
});
