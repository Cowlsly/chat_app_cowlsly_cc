import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/chat_app_cowlsly_cc/' : '/'
}));
