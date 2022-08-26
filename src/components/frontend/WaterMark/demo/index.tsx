import React, { useEffect } from 'react';
// import './index.less';
import watermark from './waterMark';

export default function WaterMark() {
  useEffect(() => {
    watermark.set('水印', '2022-08-26');
    return () => {
      watermark.remove();
    };
  }, []);

  return <div>展示水印</div>;
}
