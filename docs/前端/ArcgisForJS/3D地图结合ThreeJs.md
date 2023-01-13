---
title: 3D地图结合Three.js
order: 102
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

## 3D 地图结合 Three.js

3D 地图结合 three.js 需要 **esri/views/3d/externalRenderers** 模块

### Three.js 简介

**Three.js**是一款开源的主流 3D 绘图 JS 引擎（名字 Three 就是 3D 的含义），我们知道 WebGL 是一种网页 3D 绘图标准，和 jQuery 简化了 HTML DOM 操作一样，Three.js 可以简化 WebGL 编程。

- 官方网站： [Three.js 官网](https://threejs.org)
- 官方 GitHub 主页：[GitHub Three.js](https://github.com/mrdoob/three.js)

### 初始化 map 方法，加载所需模块

```bash
let initMapFunction = function () {
  return loadModules(
    [
      ...
      'esri/views/3d/externalRenderers',
    ],
    ...
  ).then(
    async ([
      ...
      externalRenderers,
    ]) => {
      const MapFunction = {
        ...
        externalRenderers,
      };
      ...
    },
  );
};
```

### 新建存放地图的 DOM 节点并添加 threejsRenderer 方法绘制一个立方体

```bash
const Map3D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, SceneView, externalRenderers } = await initMapFunction();
      ...
      const threejsRenderer = {
        ...
        setup: function (context) {
          ...
        },
        render: function (context) {
          ...
        },
      };
      externalRenderers.add(view, threejsRenderer);
    });
  }, []);
  return <div className="map-container" id="Map3D"></div>;
};

export default Map3D;
```

<code src="@/components/frontend/visualization/ArcgisForJS/addThreeJS/index.jsx" compact="true" desc="移动或缩放地图展示地图信息"></code>
