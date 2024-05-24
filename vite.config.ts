import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@types': path.resolve(__dirname, './src/types'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
		},
	},
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/tests/setup.ts',
	},
});
