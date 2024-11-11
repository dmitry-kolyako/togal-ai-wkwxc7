import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr({
        // svgr options: https://react-svgr.com/docs/options/
        svgrOptions: {exportType: "default", ref: true, svgo: false, titleProp: true},
        include: "**/*.svg",
    })],

    test: {
        environment: 'jsdom', // Use jsdom for simulating the DOM in the browser
        globals: true,         // Enable Jest-style global variables like `describe`, `it`, etc.
        setupFiles: ['./test/setupTests.ts'],  // Add a setup file for additional setup if needed
    },
})
