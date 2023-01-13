---
title: geoJson 点数据转化为图层
order: 4
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

## geoJson 点数据转化为图层

### 点数据转化为图层需要点数据

```bash
import { loadModules } from 'esri-loader';
import 点数据 from './点数据.json';
```

### 点数据格式参考

```bash
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": 0,
      "geometry": {
        "type": "Point",
        "coordinates": [121.29940458555966, 30.975517212417824]
      },
      "properties": {
        "VALUE": "VALUE3"
      }
    },
    {
      "type": "Feature",
      "id": 1,
      "geometry": {
        "type": "Point",
        "coordinates": [121.72957674515517, 30.956802927769598]
      },
      "properties": {
        "VALUE": "VALUE0"
      }
    }]
}
```

### 加载需要的 arcgis 模块

```bash
[
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/GeoJSONLayer',
  'esri/config',
],
```

### 将 geoJson 转成图层

```bash
const getGeoJsonLayer = async function (data) {
  const { GeoJSONLayer } = await initMapFunction();
  const geojsonlayer = new GeoJSONLayer({
    url: geoJSONToUrl(data),
    renderer: {
      type: 'simple',
      symbol: {
        type: 'simple-marker', // 点数据的样式
        color: '#1d96ff',
        size: 4,
        outline: null,
      },
    },
  });
  return geojsonlayer;
};
```

### geoJSON 转 Url 方法

```bash
const geoJSONToUrl = function (data) {
  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  return url;
};
```

### 将图层渲染到容器内

```bash
const Map2D = () => {
  useEffect(() => {
    setTimeout(async () => {
      ...
      const pointLayer = await getGeoJsonLayer(点数据);
      const map = new Map({
        basemap: {
          baseLayers: [pointLayer],
        },
      });
      ...
    });
  }, []);
  ...
};

export default Map2D;
```

<code src="@/components/frontend/visualization/ArcgisForJS/geojsonToPoint/index.jsx" compact="true" desc="移动或缩放地图展示地图信息"></code>
