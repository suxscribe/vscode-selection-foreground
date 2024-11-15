"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    build: {
        lib: {
            entry: './src/extension.ts',
            formats: ['cjs'],
            fileName: 'extension',
        },
        rollupOptions: {
            external: ['vscode'],
        },
        sourcemap: true,
        outDir: 'out',
    },
    plugins: [],
});
//# sourceMappingURL=vite.config.js.map