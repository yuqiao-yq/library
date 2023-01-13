---
title: ArcGIS JS API简介
order: 1
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /ArcGIS
  title: ArcGIS
  order: 8
---

## 什么是 ArcGIS JS API ?

**ArcGIS JS API** 全称为”ArcGIS API for JavaScript”，它目前为止有两个大版本：一个是 3.X 版本，另外一个是 4.X 版本，其中 3.X 版本是原来最早发布的版本，里面对二维地图的操控这些比较详细，4.X 版本是后来发布的版本，主要是增加了三维地图场景这一块的内容，目前这两个版本同时更新。

ArcGIS JS API 其实是 ArcGIS 这个软件对外提供的 API(其实就是一些函数方法，你只管按它的规则传参、调用即可，类似于 jQuery.js、moment.js 这些库)

- 官方网站： [ArcGIS JS API 官网](https://developers.arcgis.com/javascript/latest/)
- 官方 GitHub 主页：[GitHub arcgis-js-api](https://github.com/Esri/arcgis-js-api)

## 特性

- 🗺️ **空间数据展示:** 加载地图服务，影像服务,WMS 等。支持 2D/3D 地图
- 🛠️ **地理处理:** 调用 ArcGIS for Server 发布的地理处理服务（GP 服务），执行空间分析、地理处理或其他需要服务器端执行的工具、模型、运算等。
- 🚀 **高性能:** 可平滑渲染数以万计的几何图形
- ✨ **网络分析:** 计算最优路径、临近设施和服务区域。
- 📦 **客户端 Mashup:** 将来自不同服务器、不同类型的服务在客户端聚合后统一呈现给客户

## 竞品

<Alert type="info">目前主要竞品有 [leafletjs](https://leafletjs.com/) 、 [openlayers](https://openlayers.org/)、[maptalks](https://maptalks.org/)、[cesium](https://cesium.com/)等 </Alert>

## 快速上手

<!-- ### 在项目中使用 -->

- 先安装 esri-loader 去加载 arcgis 官方依赖

```bash
yarn add esri-loader
```

- 用模块的方式引入, 加载 ArcGIS JS API 的 js 开发包和 css 样式包，详见 2D 地图加载

```bash
import { loadModules } from 'esri-loader';
```
