import { defineConfig } from 'dumi';
const { resolve } = require('path');

export default defineConfig({
  title: 'Library',
  // favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  favicon: 'https://img1.imgtp.com/2022/08/26/GNR9ILFr.jpeg',
  // logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://img1.imgtp.com/2022/08/26/GNR9ILFr.jpeg',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  history: { type: 'hash' },
  base: '/statics',
  publicPath: './',
  locales: [['zh-CN', '中文']],
  proxy: {
    // '/api418_2': {
    //   target: 'https://huamu2.metrodata.cn:10443/cehuiyuan',
    //   changeOrigin: true,
    // },
    // '/cehuiyuan': {
    //   target: 'https://huamu2.metrodata.cn:10443',
    //   changeOrigin: true,
    // },
  },
  // more config: https://d.umijs.org/config
  // resolve: {
  alias: {
    '@': resolve(__dirname, './src'),
  },
  // },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
    {
      title: '我有二级导航',
      path: '链接是可选的',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: '第一项', path: 'https://d.umijs.org' },
        { title: '第二项', path: '/guide' },
      ],
    },
  ],
});
