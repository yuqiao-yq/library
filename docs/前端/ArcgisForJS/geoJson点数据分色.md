---
title: geoJson点数据分色
order: 7
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

## geoJson 点数据分色

点数据分色是在【2D 点数据转化为图层】的基础上修改图层上点的颜色实现的

### 将 geoJson 转成图层

```bash
const getGeoJsonLayer = async function (data) {
  const { GeoJSONLayer } = await initMapFunction();
  // 定义需要的颜色
  const color_List = [
    'rgba(29,148,255,1)',
    'rgba(59,235,199,1)',
    'rgba(255,175,94,1)',
    'rgba(196,139,253,1)',
    'rgba(253,66,111,1)',
  ];
  const geojsonlayer = new GeoJSONLayer({
    url: geoJSONToUrl(data),
    renderer: {
      type: 'unique-value',
      field: 'VALUE',
      outFields: ['VALUE'],
      defaultSymbol: {
        type: 'simple-marker',
        color: color_List[0],
        size: 4,
        outline: null,
      },
      uniqueValueInfos: [
        {
          value: 'VALUE0',
          symbol: {
            type: 'simple-marker',
            color: color_List[1],
            size: 4,
            outline: null,
          },
        },
        {
          value: 'VALUE1',
          symbol: {
            type: 'simple-marker',
            color: color_List[2],
            size: 4,
            outline: null,
          },
        },
        {
          value: 'VALUE2',
          symbol: {
            type: 'simple-marker',
            color: color_List[3],
            size: 4,
            outline: null,
          },
        },
        {
          value: 'VALUE3',
          symbol: {
            type: 'simple-marker',
            color: color_List[4],
            size: 4,
            outline: null,
          },
        },
        {
          value: 'VALUE4',
          symbol: {
            type: 'simple-marker',
            color: color_List[5],
            size: 4,
            outline: null,
          },
        },
      ],
    },
  });
  return geojsonlayer;
};
```

<code src="@/components/frontend/visualization/ArcgisForJS/colorSeparationPoint/index.jsx" compact="true" desc="移动或缩放地图展示地图信息"></code>
