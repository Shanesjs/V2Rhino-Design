import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // Using relative paths for better portability on GitHub Pages
  build: {
    outDir: 'docs', // Deploy from docs folder
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        book: resolve(__dirname, 'book.html'),
        contact: resolve(__dirname, 'contact.html'),
        donate: resolve(__dirname, 'donate.html'),
        experience: resolve(__dirname, 'experience.html'),
        gallery: resolve(__dirname, 'gallery.html'),
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
});
