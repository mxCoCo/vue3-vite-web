import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig((mode) => {
  console.log('运行环境:', mode.mode)
  const env = mode.mode
  let baseUrl = 'https://fgj-bid.ceczy.com:9102'
  if (env == 'dev') {
    baseUrl = 'https://fgj-bid-test.ceczy.com:7075'
  } else if (env == 'test') {
    baseUrl = 'https://fgj-bid.ceczy.com:9102'
  }
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    //解决“vite use `--host` to expose”
    base: './', //不加打包后白屏
    server: {
      host: '0.0.0.0',
      port: 9000,
      open: true,
      https: false,
      proxy: {
        '/fgj-promanage': {
          target: baseUrl,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/fgj-promanage/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/assets/style/global.less";',
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#4377FE', //设置antd主题色
          },
        },
      },
    },
  }
})
