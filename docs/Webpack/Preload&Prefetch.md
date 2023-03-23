---
title: Preload / Prefetch
order: 11
toc: content
path:
# nav:
#   title:
#   order: 1
group:
  path: /Advanced
  title: 高级优化
  order: 2
---

## 为什么

我们前面已经做了代码分割，同时会使用 `import` 动态导入语法来进行代码按需加载（我们也叫懒加载，比如路由懒加载就是这样实现的）。

但是加载速度还不够好，比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果。

我们想在浏览器空闲时间，加载后续需要使用的资源。我们就需要用上 `Preload` 或 `Prefetch`` 技术。

## 是什么

- `Preload`：告诉浏览器立即加载资源。

- `Prefetch`：告诉浏览器在空闲时才开始加载资源。

它们共同点：

- 都只会加载资源，并不执行。
- 都有缓存。

它们区别：

- `Preload`加载优先级高，`Prefetch`加载优先级低。
- `Preload`只能加载当前页面需要使用的资源，`Prefetch`可以加载当前页面资源，也可以加载下一个页面需要使用的资源。

总结：

- 当前页面优先级高的资源用 `Preload` 加载。
- 下一个页面需要使用的资源用 `Prefetch` 加载。
- 它们的问题：兼容性较差。

我们可以去 [Can I Use](https://caniuse.com/)网站查询 `API` 的兼容性问题。

`Preload` 相对于 `Prefetch` 兼容性好一点。

## 怎么用

(1) 下载包

```
npm i @vue/preload-webpack-plugin -D
```

(2) 配置 `webpack.prod.js`

```js
const os = require('os');
const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env', // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'), // 生产模式需要输出
    filename: 'static/js/[name].js', // 入口文件打包输出资源命名方式
    chunkFilename: 'static/js/[name].chunk.js', // 动态导入输出资源命名方式
    assetModuleFilename: 'static/media/[name].[hash][ext]', // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders('less-loader'),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders('sass-loader'),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders('stylus-loader'),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            // generator: {
            //   // 将图片文件输出到 static/imgs 目录中
            //   // 将图片文件命名 [hash:8][ext][query]
            //   // [hash:8]: hash值取8位
            //   // [ext]: 使用之前的文件扩展名
            //   // [query]: 添加之前的query参数
            //   filename: "static/imgs/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource',
            // generator: {
            //   filename: "static/media/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, '../src'), // 也可以用包含
            use: [
              {
                loader: 'thread-loader', // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ['@babel/plugin-transform-runtime'], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules', // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].chunk.css',
    }),
    // css压缩
    // new CssMinimizerPlugin(),
    new PreloadWebpackPlugin({
      rel: 'preload', // preload兼容性更好
      as: 'script',
      // rel: 'prefetch' // prefetch兼容性更差
    }),
  ],
  optimization: {
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: [
                    'preset-default',
                    'prefixIds',
                    {
                      name: 'sortAttrs',
                      params: {
                        xmlnsOrder: 'alphabetical',
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: 'all', // 对所有模块都进行分割
      // 其他内容用默认配置即可
    },
  },
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: 'production',
  devtool: 'source-map',
};
```
