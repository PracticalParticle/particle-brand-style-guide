import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: path.resolve(__dirname, 'src'),
      outDir: 'dist',
      include: ['src/index.ts', 'src/vite-env.d.ts', 'src/components/**/*', 'src/utils/**/*'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/node_modules'],
      pathsToAliases: true,
      aliasesExclude: [],
      staticImport: true,
      insertTypesEntry: false,
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ParticleStyleGuide',
      fileName: 'index',
      formats: ['es'],
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-context-menu',
        'clsx',
        'react-markdown',
        'react-to-print',
        'remark-directive',
        'remark-gfm',
        'tailwind-merge',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@radix-ui/react-context-menu': 'RadixContextMenu',
          clsx: 'clsx',
          'react-markdown': 'ReactMarkdown',
          'react-to-print': 'ReactToPrint',
          'remark-directive': 'remarkDirective',
          'remark-gfm': 'remarkGfm',
          'tailwind-merge': 'tailwindMerge',
        },
      },
    },
  },
})
