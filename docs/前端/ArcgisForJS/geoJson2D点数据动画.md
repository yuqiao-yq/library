---
title: geoJson 2D点数据动画
order: 6
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

## geoJson 2D 点数据动画

2D 点数据动画是在【2D 点数据转化为图层】的基础上增加动画效果

### 在【2D 点数据转化为图层】的基础上修改

#### 点数据参考

```bash
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": 0,
      "geometry": {
        "type": "Point",
        "coordinates": [120.99497635083307, 30.747051616086598]
      },
      "properties": {
        "TIME": 1996,
        "TYPE": "TYPE0"
      }
    }]
}
```

#### 创建渲染方法

```bash
function createRenderer(time) {
  const opacityStops = [
    {
      opacity: 1,
      value: time,
    },
    {
      opacity: 0,
      value: time + 1,
    },
  ];
  return {
    type: 'simple',
    symbol: {
      type: 'simple-marker',
      size: 4,
      outline: null,
      color: '#1d96ff',
    },
    visualVariables: [
      {
        type: 'opacity',
        field: 'TIME', // 根据这个字段来决定动画的帧先后
        stops: opacityStops,
      },
    ],
  };
}
```

#### 新建存放地图的 DOM 节点并设置样式

```bash
const Map2D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, MapView } = await initMapFunction();
      const pointLayer = await getGeoJsonLayer(点数据);
      // 动画
      function animateStart(startTime) {
        let animating = true;
        let time = startTime;
        const frame = () => {
          time += 1;
          pointLayer.renderer = createRenderer(time);
          setTimeout(() => {
            requestAnimationFrame(frame);
          }, 200);
        };
        frame();
        return {
          remove: () => {
            animating = false;
          },
        };
      }
      const map = new Map({
        basemap: {
          baseLayers: [pointLayer],
        },
      });
      const view = new MapView({
        container: 'Map2D',
        map,
        center: [121.51965576013674, 31.014813865188569],
        constraints: {
          minScale: 500000,
        },
      });
      animateStart(1900);
    });
  }, []);
  return <div className="map-container" id="Map2D"></div>;
};

export default Map2D;
```

<code src="@/components/frontend/visualization/ArcgisForJS/animation2D/index.jsx" compact="true" desc="移动或缩放地图展示地图信息"></code>
