import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', 'VITE_');
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const githubPagesBase =
    process.env.GITHUB_ACTIONS === 'true' &&
    repositoryName &&
    !repositoryName.endsWith('.github.io')
      ? `/${repositoryName}/`
      : '/';

  return {
    base: process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || githubPagesBase,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
