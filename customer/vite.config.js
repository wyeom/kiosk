import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  server : {
    port : 11114,
    proxy: {
      // '/socket.io': {
      //   target: 'http://localhost:3333',
      //   changeOrigin: true,
      //   ws: true,
      //   secure : false,
      //   rewrite: path => path.replace(/^\/socket.io/, '')
      // },
    }
  }
})
