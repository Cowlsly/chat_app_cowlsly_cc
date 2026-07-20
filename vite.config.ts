/// <reference types="vitest/config" />
import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

type VitestConfig = {
  test: {
    globals: boolean
    environment: 'jsdom'
    setupFiles: string
    css: boolean
  }
}

const config: UserConfig & VitestConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
}

export default defineConfig(config)
