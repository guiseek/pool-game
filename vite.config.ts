import { defineConfig } from 'vite'

export default defineConfig({
	base: 'pool-game',
	build: {
		outDir: 'docs',
		chunkSizeWarningLimit: 1024
	}
})