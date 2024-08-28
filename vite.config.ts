import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vue3-search-select',
      formats: ['es', 'umd'],
      fileName: 'vue3-search-select'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.name || ''
          if (assetName === 'style.css') return 'Vue-Search-Select.css'
          return assetName
        }
      }
    }
  }
})
