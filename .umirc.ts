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
  // base: '/statics',
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
  alias: {
    '@': resolve(__dirname, './src'),
  },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    // {
    //   title: '前端',
    //   path: '/前端/java-script/变量&常量',
    // },
    {
      title: 'Gitee',
      path: 'https://gitee.com/joe1207427994',
    },
    {
      title: '更多',
      path: '链接是可选的',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: 'dumi', path: 'https://d.umijs.org' },
        { title: '待定', path: '/guide' },
      ],
    },
  ],
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/前端1': [
      {
        title: '前端1',
        path: '/前端1',
        children: [
          // 菜单子项（可选）
          // 'guide/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
        ],
      },
    ],
    // 如果该路径有其他语言，需在前面加上语言前缀，需与 locales 配置中的路径一致
    '/zh-CN/前端': [
      // 省略，配置同上
    ],
  },
});
