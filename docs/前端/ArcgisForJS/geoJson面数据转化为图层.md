---
title: geoJson 面数据转化为图层
order: 5
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

## geoJson 面数据转化为图层

### 面数据转化为图层 与 点数据转换为图层区别不大，主要体现在以下：

#### 引入面数据

```bash
import 面数据 from './面数据.json';
```

#### 将 geoJson 转成图层中 symbol.type 不再是 `simple-marker`，而是 `simple-fill`

```bash
const getGeoJsonLayer = async function (data) {
  const { GeoJSONLayer } = await initMapFunction();
  const geojsonlayer = new GeoJSONLayer({
    url: geoJSONToUrl(data),
    renderer: {
      type: 'simple',
      symbol: {
        type: 'simple-fill', // 面数据样式
        color: 'rgba(19, 0, 188, 0.3)',
        outline: { width: 0.4, color: 'rgba(19, 221, 188, 1)' },
      },
    },
  });
  return geojsonlayer;
};
```

<code src="@/components/frontend/visualization/ArcgisForJS/geojsonToPolygon/index.jsx" compact="true" desc="移动或缩放地图展示地图信息"></code>
